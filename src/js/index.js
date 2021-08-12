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

var arc = {
  start: 0,
  end: 0,
  cx: 150,
  cy: 150,
  r: 105
};
function clipPath() {  
  var d = getPath(arc.cx, arc.cy, arc.r, arc.start, arc.end);
  clipArc.setAttribute("d", d);
}
var piTwo = Math.PI / 2;
var rad = n => n % 360 * Math.PI / 180;
function getPath(x, y, r, a1, a2) {
  var sweep = a2 - a1 <= 180 ? 0 : 1;
  a1 = rad(a1) - piTwo;
  a2 = rad(a2) - piTwo;  
  var start = { 
    x: x + r * Math.cos(a2),   
    y: y + r * Math.sin(a2)
  }
  var end = { 
    x: x + r * Math.cos(a1), 
    y: y + r * Math.sin(a1)
  };
  var d = [
    "M", start.x, start.y, 
    "A", r, r, 0, sweep, 0, end.x, end.y,
    "L", x, y,
    "z"
  ].join(" ");
  return d;
}

// clicker.addEventListener('click', () => {
//     TweenMax.to(arc, 1.5, {
//         start: 0,
//         end: 360,
//         repeat: 0,
//         onUpdate: clipPath,
//         onComplete: () => {
//             let tl = gsap.timeline({paused:true})
//             tl.to('.loader', {opacity: 0, duration: 0.5})
//             tl.to('.loader', {display: 'none'})
//             tl.play(0)
//         }
//     });
// })

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
        video.style.visibility = 'visible'    
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
        video.style.visibility = 'hidden'
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

let divider = document.querySelector('.divider');
let flex = document.querySelector('.flex');
let list = Array.from(document.querySelectorAll('.list-item') );

if( navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)
) {
  document.querySelector('body').classList.add('mobile')
}

window.addEventListener('DOMContentLoaded', () => {
  gsap.fromTo('.divider', {opacity: 0, x: 200}, {
    scrollTrigger: {
      trigger: '.divider',
      start: 'top 70%',
      toggleActions: 'restart none none reverse'
    },
    opacity: 1, x: 0
  })
  list.forEach((item, i) => {
    let a = item.querySelector('a')
    let arr = [25, 15, 7, 0, -7, -15, -25]
    let num = arr[i] + 50

    let mobile = Array.from(document.querySelector('body').classList).includes('mobile')
   
    ScrollTrigger.matchMedia({
      "(min-width: 700px)": function() {
        if (!mobile) {
          gsap.fromTo(item, {opacity: 0, width: 0}, {
            scrollTrigger: {
              trigger: item,
              start: `top ${num}%`,
              toggleActions: 'restart none none reverse'
            },
            opacity: 1,
            width: 650
          })
        } else {
          gsap.fromTo(item, {opacity: 0, width: 0}, {
            scrollTrigger: {
              trigger: item,
              start: `top ${num}%`,
              toggleActions: 'restart none none reverse'
            },
            opacity: 1,
            width: '80vw'
          })
        }
    }})
    ScrollTrigger.matchMedia({
      "(max-width: 700px)": function() {
        gsap.fromTo(item, {opacity: 0, width: 0}, {
          scrollTrigger: {
            trigger: item,
            start: `top ${num}%`,
            toggleActions: 'restart none none reverse'
          },
          opacity: 1,
          width: '80vw'
        })
    }})
    ScrollTrigger.matchMedia({
      "(min-width: 900px)": function() {
        if (!mobile) {
        gsap.to('.siteSection .myDiv', {
          yPercent: 0, 
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".siteSection .myDiv",
            start: "top top",
            end: "+=1200px",
            scrub: true,
            pin: true
          }
        })
        gsap.to('.softwareSection .myDiv', {
          yPercent: 0, 
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".softwareSection .myDiv",
            start: "top top",
            end: "+=2000px",
            scrub: true,
            pin: true
          }
        })
        gsap.to('.stackSection .myDiv', {
          yPercent: 0, 
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".stackSection .myDiv",
            start: "top top",
            end: "+=1200px",
            scrub: true,
            pin: true
          }
        })
      }
    }})
    gsap.fromTo(a, {display: 'none'}, {
      scrollTrigger: {
        trigger: item,
        start:  `top ${num}%`,
        toggleActions: 'restart none none reverse'
      },
      display: 'block'
    })
  })
})
