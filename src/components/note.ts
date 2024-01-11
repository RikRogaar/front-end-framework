import Component from '../../framework/decorators/componentDecorator';

@Component({
    template: "src/components/note.html"
})
export default class Note {
    constructor() {}

    get currentDate() {
        return new Date().toDateString();
    }
}
