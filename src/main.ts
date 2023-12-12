import './style.css'
import { div, p } from '../framework/element';
import { initRender } from '../framework/render';

const text = 'world';
const who = 'me';

const yo = div`hello ${text} ${p`by: ${who}`} !!!`;
console.log(yo);
initRender('#app', yo);