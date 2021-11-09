import '/scss/main.scss';



   
import '/scss/main.scss';
import canvas from '/videos/canvas.webm';
import contactform from '/videos/contactform.webm';
import earth from '/videos/earth.webm';
import kaleidoscope from '/videos/kaleidoscope.webm';
import webgl from '/videos/webgl.webm';
import ripple from '/videos/ripple.webm';
import image from '/images/34_large.png'
import image2 from '/images/HT.png'
import site from '/videos/site.webm';
import {gsap} from 'gsap';
import {TweenMax} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

let array = {'canvas': canvas, 'contactform': contactform, 'earth': earth, 'kaleidoscope': kaleidoscope, 'site': site, 'webgl': webgl, 'ripple': ripple}
let links = [
    'http://bwsite.s3-website.eu-west-2.amazonaws.com/contact.html',
    'http://dgb-digital.infinityfreeapp.com/',
    'https://lbaker15.github.io/Shaders2/',
    'http://my-site-lbaker15.s3-website.eu-west-2.amazonaws.com/',
    'http://dgb-digital.infinityfreeapp.com/contact.html',
    'http://red-umbrella.flywheelsites.com/',
    'http://look2020.42web.io/'
]
let clicker = document.getElementById('clicker');
let body = document.getElementById('clickCondition');
let loader = document.querySelector('.loader');
var select  = document.querySelector.bind(document);
var clipArc = select("#clipArc");


let listItem = Array.from(document.querySelectorAll('.list-item'))
listItem.forEach((x, i) => {
    let video = x.querySelector('video')
    let source = video.querySelector('source')
    let vidName = source.dataset.parent.split(".")[0]
    source.src = array[vidName]
    video.load()
    let hover = false;
    let a = x.querySelector('a')
    x.addEventListener('mouseover', (e) => {
        hover = true;
        video.style.display = 'block'    
        if (video.readyState === 4) {
            video.play()
        }
        gsap.to(x, {height: 200})
        gsap.to(a, { color: 'black', letterSpacing: '3px' })
    })
    x.addEventListener('mousemove', (e) => {
        if (hover) {
            let offset = x.getBoundingClientRect();
            let {width, height, top, left} = offset;
            let center = left + (width/2);
            let mid = top + (height/2);
            let x2 = e.clientX;
            let y = e.clientY;
            let posX = (x2 - center) + 100;
            let posY = (y - mid) - 50;
            video.style.transform = `translate(${posX}px, ${posY}px)`
        }
    })
    x.addEventListener('click', () => {
        window.location.href = links[i]
    })
    x.addEventListener('mouseout', (e) => {
        hover = false;
        video.style.display = 'none'
        video.pause()
        gsap.to(x, {height: 'auto'})
        gsap.to(a, {fontWeight: 200, color: 'black', letterSpacing: '', rotate: 0})
    })
})



let blob1 = document.querySelector("#blob1");
let blob2 = document.querySelector("#blob2");
let inner = Array.from(document.querySelectorAll('.innerEye'));
window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('mousemove', (e) => {
    let num = e.clientX / window.innerWidth * 100;
    let num2 = e.clientY / window.innerHeight * 100;
    num2 = 1 + (num2/50)
    blob1.querySelector('path').style.fill = `rgb(${250-num/1.5}, ${190+num/num2}, 250)`
    blob2.querySelector('path').style.fill = `rgb(${250-num/1.5}, ${190+num/num2}, 250)`
    let num3 = e.clientY / window.innerHeight * 180
    inner.forEach(x => {
      gsap.to(x, { marginLeft: - (40-(num*0.8)), marginTop: - (90-num3)+10 })
    })
  })
})
