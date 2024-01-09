import Component from "../framework/decorators/componentDecorator";

@Component({
    template: "src/app.html",
    initialRender: '#app'
})
export default class App {
    constructor() {}
}
