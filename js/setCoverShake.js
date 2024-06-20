import { songImg } from './globalVar.js'

export let interval = null

/*
  функция запускает тряску обложки трека для большей динамичности,
  interval сбрасывается при паузах и переключении трека
*/
export function setCoverShake() {
  interval = setInterval(() => {
    songImg.style.width = `${Math.random() * 20 + 200}px`
  }, 100)
}
