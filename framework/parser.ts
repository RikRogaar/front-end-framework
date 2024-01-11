import { VNode, h } from "snabbdom";
import { initRender } from "./render";
import fs from "vite-plugin-fs/browser";

export default class parser {
    private PROPERTY_REFERENCE = /{{\s?(\w*)\s?}}/gi;

    private initialRender: string;
    private componentInstance: any;

    constructor(
        fname: string,
        initialRender: string,
        componentInstance: any
    ) {
        this.initialRender = initialRender;
        this.componentInstance = componentInstance;

        this.init(fname);
    }

    private init(fname: string) {
        this.getTemplate(fname);
    }

    private async getTemplate(fname: string) {
        let markup = await fs.readFile(fname);

        const parsed = this.parseHTML(markup);

        if (this.initialRender) {

            initRender(this.initialRender, parsed);
        }
    }

    public parseHTML(html: string) {
        const stack: VNode[] = [];
        const root = h('div');
        let currentElement = root;

        const tokens = html.match(/<\/?[^>]+>|[^<]+/g) || [];

        for (const token of tokens) {
            if (token.startsWith('</')) {
                stack.pop();
                currentElement = stack[stack.length - 1];
            } else if (token.startsWith('<')) {
                const match = token.match(/<(\w+)([^>]*)>/);

                if (match) {
                    const tag = match[1];
                    let attributes = {};

                    match[2].replace(/(\w+)="([^"]*)"/g, (_substring: string, ...args: any[]) => {
                        const strippedFn = args[1].replace(/^["]+|["]+$/g, '');
                        const matches = /(\w+)\((\S+)?\)/g.exec(strippedFn);

                        if (matches) {
                            const fnArg = matches[2] ? matches[2].replace(/^[']+|[']+$/g, '') : '';
                            const fn = this.componentInstance[matches[1]];
                            console.log(fn);
                            attributes = ({
                                on: {
                                    click: () => fn(fnArg)
                                }
                            });
                        }

                        return "";
                    });

                    const newNode = h(tag, attributes);
                    if (currentElement.children) {
                        currentElement.children[currentElement.children.length] = newNode
                    } else {
                        currentElement.children = [newNode]
                    }
                    stack.push(newNode);
                    currentElement = newNode;
                }
            } else {
                const trimmedToken = token.trim();

                if (trimmedToken.length > 0) {
                    const parsedToken = this.handleReferences(token);
                    const textNode = h('span', parsedToken);
                    textNode.text = parsedToken;

                    if (currentElement.children) {
                        currentElement.children[currentElement.children.length] = textNode
                    } else {
                        currentElement.children = [textNode]
                    }
                }
            }
        }

        return root.children ? root.children[0] : null;
    }

    private handleReferences(token: string) {
        const propertyReferences = token.matchAll(this.PROPERTY_REFERENCE);

        for (const propertyReference of propertyReferences) {
            const property = propertyReference[1];
            token = token.replace(propertyReference[0], this.componentInstance[property]);
        }

        return token;
    }
}