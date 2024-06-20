import { song, songName, songArtist, songImg } from './globalVar.js'
import { currentSong, setRandomSong } from './setRandomSong.js'

/*
  подготовка плеера перед проигрывание песни:
  - генерируется рандомная песня из плейлиста
  - обновляются данные о треки в плеере
  - подгружается сама песня => далее срабатывает событие loadedmetadata,
  где устанавливается max значение progress ползунка и временные метки
*/
export function preparePlayerSong() {
  setRandomSong()
  song.src = currentSong.path
  songName.textContent = currentSong.name
  songArtist.textContent = currentSong.artist
  songImg.src = currentSong.cover
  songImg.alt = currentSong.name + ' by '+ currentSong.artist
  song.load()
}