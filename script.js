import {
  song,
  progress,
  ctrlIcon,
  prev,
  next,
  playlistBtn,
  playlists,
} from './js/globalVar.js'
import { loadPlaylists, setDefaultPlaylist } from './js/playlists.js'
import { preparePlayerSong } from './js/preparePlayerSong.js'
import { setVisualizer } from './js/visualizer.js'
import { interval, setCoverShake } from './js/setCoverShake.js'
import { setSongTime, updateCurrentSongTime } from './js/setSongTime.js'

let visualizerWasSet = false

setDefaultPlaylist()
loadPlaylists()
preparePlayerSong()

song.addEventListener('loadedmetadata', function () {
  progress.max = song.duration
  progress.value = song.currentTime
  setSongTime(song.currentTime, song.duration)
})

song.ontimeupdate = () => {
  progress.value = song.currentTime
  updateCurrentSongTime(song.currentTime)
}

song.onended = () => {
  launchNextSong()
}

/*
  Вешаю слушатель onplay и onpause, чтобы карректно менялась кнопка проигрывания
  и останавливалась тряска обложки при нажатии кнопки play/stop в наушниках
*/

song.onplay = () => {
  if (interval) {
    clearInterval(interval)
  }
  ctrlIcon.classList.add('fa-pause')
  ctrlIcon.classList.remove('fa-play')
  setCoverShake()
}

song.onpause = () => {
  if (interval) {
    clearInterval(interval)
  }
  ctrlIcon.classList.remove('fa-pause')
  ctrlIcon.classList.add('fa-play')
}

progress.onchange = () => {
  song.currentTime = progress.value
}

ctrlIcon.onclick = () => {
  toggleLaunch()
}

prev.onclick = () => {
  launchNextSong()
}

next.onclick = () => {
  launchNextSong()
}

playlistBtn.onclick = () => {
  if (playlists.classList.contains('none')) {
    playlists.classList.remove('animation-back-slide')
    playlists.classList.remove('none')
  } else {
    playlists.classList.add('animation-back-slide')
    setTimeout(() => {
      playlists.classList.add('none')
    }, 300)
  }
}

document.addEventListener('keypress', (e) => {
  if (e.key === ' ') {
    toggleLaunch()
  }
})

const musicPlayer = document.querySelector('.music-player')

musicPlayer.onclick = (e) => {
  e.stopPropagation()
}

document.body.addEventListener('click', () => {
  playlists.classList.add('animation-back-slide')
  setTimeout(() => {
    playlists.classList.add('none')
  }, 300)
})

function toggleLaunch() {
  // сбрасываю interval, чтобы обложка не тряслась на паузе
  if (interval) {
    clearInterval(interval)
  }

  if (ctrlIcon.classList.contains('fa-play')) {
    song.play()
    setCoverShake()
  } else {
    song.pause()
  }
  ctrlIcon.classList.toggle('fa-play')
  ctrlIcon.classList.toggle('fa-pause')

  checkVisualizer()
}

export function launchNextSong() {
  if (interval) {
    clearInterval(interval)
  }
  ctrlIcon.classList.remove('fa-play')
  ctrlIcon.classList.add('fa-pause')
  preparePlayerSong()
  song.play()
  setCoverShake()
  checkVisualizer()
}

// устанавливаем визуализатор аудио один раз при самом первом запуске песни
function checkVisualizer() {
  if (!visualizerWasSet) {
    setVisualizer()
    visualizerWasSet = true
  }
}
