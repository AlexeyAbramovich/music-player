import { currentPlaylist } from './playlists.js'

// песня которая сейчас проигрывается или будет проигрываться
export let currentSong = null
/*
  массивы уже проигранных треков, нужен, чтобы при переключении треков не было повторов
  и были проиграны все песни
*/
export let playlistQueue = []

export function setRandomSong() {
  let newSong =
    currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)]
  if (currentSong) {
    // песня будет пересоздаваться если она уже была проиграна ранее
    while (playlistQueue.some((song) => song.name === newSong.name)) {
      newSong =
        currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)]
    }
  }
  playlistQueue.push(newSong)
  /*
    при проигрывании всех песен из плейлиста очередь сбрасывается до первоначального состояния
    (когда ни одна песня ещё не была проиграна)
  */
  if (playlistQueue.length === currentPlaylist.length) {
    playlistQueue.length = 0
  }
  currentSong = newSong
}
