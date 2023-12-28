// import fs from 'node:fs/promises'
import { addDays } from 'date-fns'
import './index.css'
import rabbit from './assets/images/evil-rabbit.png'

const anObject = {
    yes: 1,
    no: 4,
    undecided: 78,
}
// console.log(import.meta.url)
console.log(anObject)
const newDate = addDays(Date.now(), 3)
console.log('current date is', newDate, Date.now());
const newObject = { ...anObject, date: JSON.stringify(newDate) }
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