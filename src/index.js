import {testing} from './test.js';
import '../scss/main.scss';

console.log(testing, testing)

// Create heading node
const heading = document.createElement('h1')
heading.textContent = 'Interesting!'
  
// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root')
app.append(heading)