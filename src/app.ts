import Component from "../framework/decorators/componentDecorator";

@Component({
    template: "src/app.html",
    styles: "src/app.css",
    initialRender: '#app'
})
export default class App {
    constructor() {}
}
