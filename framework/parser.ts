export default function parseHTML(template: string) {
    const fullTemplateDocument = getDocument(template, "text/html");
    const test = fullTemplateDocument.querySelector("body");

}

const parser = new DOMParser();

const getDocument = (test: any, type: string) => {
    return parser.parseFromString(test, type as DOMParserSupportedType);
}