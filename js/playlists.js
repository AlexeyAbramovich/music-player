import { music } from '../data/data.js'
import { launchNextSong } from '../script.js'
import { playlists } from './globalVar.js'
import { playlistQueue } from './setRandomSong.js'

// текущий плейлист, содержит треки из выбранного плейлиста
export let currentPlaylist = null

// элемент текущего плейлиста, нужен, чтобы установить/сбросить .active класс
export let currentPlaylistElement = null

export function setDefaultPlaylist() {
  currentPlaylist = music.filter((song) => song.playlist === 'Phonk')
}

export function loadPlaylists() {
  // достаю названия плейлистов
  const setOfPlaylists = new Set(music.map((song) => song.playlist))
  setOfPlaylists.forEach((pl) => {
    const playlist = document.createElement('div')
    playlist.className = 'playlist'
    playlist.classList.add('playlist')
    playlist.innerHTML = `
            <img src='../images/covers/${pl.toLowerCase()}/1.png' />
            <h3>${pl}</h3>
        `

    setActivePlaylist(playlist, pl)
    // обновление плейлиста на вновь выбранный
    playlist.onclick = () => {
      updateCurrentPlaylist(playlist, pl)
    }
    playlists.appendChild(playlist)
  })
}

function updateCurrentPlaylist(playlist, pl) {
  currentPlaylistElement.classList.remove('active')
  currentPlaylistElement = playlist
  const setOfPlaylists = new Set(music.map((song) => song.playlist))
  setOfPlaylists.forEach((pl) => {
    setActivePlaylist(playlist, pl)
  })
  currentPlaylist = music.filter((song) => song.playlist === pl)
  // сбрасывю очередь плейлиста
  playlistQueue.length = 0
  launchNextSong()
}

/*
  если поле playlist первой песни текущего currentPlaylist совпадает
  c название плейлиста из уникального списка set - это плейлисту
  добавляется класс .active
*/
function setActivePlaylist(playlist, pl) {
  if (currentPlaylist[0].playlist === pl) {
    currentPlaylistElement = playlist
    currentPlaylistElement.classList.add('active')
  }
}
