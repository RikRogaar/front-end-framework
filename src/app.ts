import Component from "../framework/decorators/componentDecorator";

@Component({
    template: "src/app.html",
    styles: "src/app.css",
    initialRender: '#app'
})
export default class App {
    public werk: string = "please!";

    constructor() {}

    public log(text: string) {
        console.log(text);
    }

    public test() {
        const answer = prompt('who');
        console.log("🚀 ~ App ~ test ~ answer:", answer)
    }
}
