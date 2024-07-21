import { songCurrentTime, songEndTime } from './globalVar.js'

// устанавливаем текущее и конечное время трека
export function setSongTime(currentTime, duration) {
	songCurrentTime.textContent = `${formatTime(currentTime)}`
	songEndTime.textContent = `${formatTime(duration)}`
}

// форматируем время в формат m:ss
function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)
	const formattedSeconds = remainingSeconds.toString().padStart(2, '0')
	return `${minutes}:${formattedSeconds}`
}

// обновляем текущее время трека
export function updateCurrentSongTime(currentTime) {
	songCurrentTime.textContent = `${formatTime(currentTime)}`
}
