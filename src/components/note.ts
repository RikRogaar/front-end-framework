import { p, div } from '../../framework/element';

export default class Note {
    constructor() {
        const test = div`nr.1  ${div`nr.2 ${p`nr.3`}`}`;
        console.log("🚀 ~ file: note.ts:7 ~ Note ~ constructor ~ test:", test)
    }
}