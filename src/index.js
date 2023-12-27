// import fs from 'node:fs/promises'
import { addDays } from 'date-fns'
import './index.css'
import rabbit from './assets/images/evil-rabbit.png'
// const fileUrl = new URL('ind.txt', import.meta.url)
// fs.readFile(fileUrl, 'utf-8').then((t) => console.log(t))
const anObject = {
    yes: 1,
    no: 4,
    undecided: 78
}
// console.log(import.meta.url)
console.log(anObject)
const newDate = addDays(Date.now(), 3)
console.log('current date is', newDate, Date.now());
const newObject = { ...anObject, date: newDate }
const heading = document.getElementById('heading')
heading.classList.add(['heading'])
const image = document.getElementById('demo-image');
image.src = rabbit

// for the kicks of it, add a script tag to end of body
const newScript = document.createElement('script')
newScript.innerHTML = JSON.stringify(newObject)
document.body.appendChild(newScript)
const para = document.createElement('p')
para.innerHTML = `Last updated: ${newObject.date}`
document.body.appendChild(para)