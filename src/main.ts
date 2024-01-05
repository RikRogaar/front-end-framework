// import './style.css'
// import { div, p } from '../framework/element';
import { initRender } from '../framework/render';
import Note from './components/note';

// const text = 'world';
// const who = 'me';

// const yo = div`hello ${text} ${p`by: ${who}`} !!!`;
// console.log(yo);
// import { h } from 'snabbdom';

// function parseHTML(htmlString: any) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, 'text/html');
//   const body = doc.body;

//   // @ts-ignore
//   function traverse(node: any) {
//     if (node.nodeType === 3) {
//       // Text node
//       return node.nodeValue;
//     }

//     const children: any = Array.from(node.childNodes).map(traverse);

//     return h(node.tagName.toLowerCase(), {}, children);
//   }

//   return traverse(body);
// }

// // Example usage
// const htmlString = parseHTML`
//   <div>
//   yooo
//     <p>hello</p>
//     <span>world</span>
//   </div>
// `;

// console.log(htmlString);
// initRender('#app', htmlString);

new Note();