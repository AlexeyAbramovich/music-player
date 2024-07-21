import { currentSong } from './setRandomSong.js'
const visualizer = document.querySelector('.visualizer')

// скопипастил код с видео - https://www.youtube.com/watch?v=20eapavnQ0U
export function setVisualizer() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext
	const ctx = new window.AudioContext()
	const analyser = ctx.createAnalyser()
	const source = ctx.createMediaElementSource(song)
	source.connect(analyser)
	source.connect(ctx.destination)
	// количество элементов в визуализаторе, которые буду расположены вокруг обложки трека
	analyser.fftSize = 128
	const bufferLength = analyser.frequencyBinCount

	let dataArray = new Uint8Array(bufferLength)
	let elements = []
	for (let i = 0; i < bufferLength; i++) {
		const element = document.createElement('span')
		element.classList.add('element')
		elements.push(element)
		visualizer.appendChild(element)
	}

	const clamp = (num, min, max) => {
		if (num >= max) return max
		if (num <= min) return min
		return num
	}

	const update = () => {
		requestAnimationFrame(update)
		analyser.getByteFrequencyData(dataArray)
		for (let i = 0; i < bufferLength; i++) {
			let item = dataArray[i]
			/*
        от этого значения насколько далеко будет выступать элемент в конкретный момент трека
        итоговое значение указывается в пикселях min - 60px, max - 100px
        dataArray - выдает значения от 0 до 255:
        - item < 60 - приводится в дальнейшем к нижней границе - 60
        - item > 100 - приводится в дальнейшем к верхней границе - 100 либо делятся на три
        - числа подбирал по итоговому результату, чтобы визуализатор был более динамичным
      */
			item = item > 160 ? item / 3 : item
			elements[i].style.transform = `rotateZ(${
				i * (360 / bufferLength)
			}deg) translate(-50%, ${clamp(item, 60, 100)}px)`
			if (currentSong) {
				elements[i].style.borderTopColor = currentSong.visualizerColor
			}
		}
	}
	update()
}
