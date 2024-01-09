import { VNode, h } from 'snabbdom';
import fs from 'vite-plugin-fs/browser';
import { initRender } from './render';

export default class ParserTest {
    private PATTERN = /<(\/)?([a-z][a-z0-9-]*)\s*([^>]*?)(\/?)>/gi;
    private PROPERTY_REFERENCE = /{{\s?(\w*)\s?}}/gi;
    private component: any;
    private stack: VNode[] = [];
    private initialRender: string = '';

    constructor(
        fname: string,
        component: any,
        initialRender: string
    ) {
        this.component = component;
        this.initialRender = initialRender;

        this.getTemplate(fname);
    }

    private async getTemplate(fname: string) {
        let markup = await fs.readFile(fname);
        this.parse(markup);
    }

    // Parse the provided markup and build the VNode stack
    private parse(markup: string) {
        const stack: VNode[] = [];
        const stackRef: any[] = [];
        let lastNode: RegExpExecArray | null = null;
        let match: RegExpExecArray | null = null;
        let lastIndex = 0;

        this.handleRegex(match, markup, stack, lastNode, lastIndex);

        this.stack = stack;
        if (this.initialRender.length > 0) {
            initRender(this.initialRender, this.stack[0]);
        }
    }

    // Handle the regular expression match to process HTML tags and build the VNode stack
    private handleRegex(match: RegExpExecArray | null, markup: string, stack: VNode[], lastNode: RegExpExecArray | null, lastIndex: number) {
        while ((match = this.PATTERN.exec(markup)) !== null) {
            const [, closingSlash, tagName, attributes, selfClosingSlash] = match;
            const stackLastItem = stack.at(-1);

            // Handle text content between tags
            if (stackLastItem && lastNode && closingSlash && match[2] === lastNode[2]) {
                this.handleText(markup, lastIndex, match.index, stackLastItem);
            }

            // Process opening and closing tags
            if (!closingSlash) {
                const vnode: VNode = h(tagName, {});

                if (stackLastItem) {
                    stackLastItem.children = stackLastItem.children || [];
                    stackLastItem.children.push(vnode);
                } else {
                    stack.push(vnode);
                }

                stack.push(vnode);
            } else {
                stack.pop();
            }

            lastNode = match;
            lastIndex = this.PATTERN.lastIndex;
        }
    }

    // Handle text content between HTML tags, replacing property references with actual values
    private handleText(markup: string, lastIndex: number, matchIndex: number, stackLastItem: VNode) {
        let text = markup.slice(lastIndex, matchIndex);

        // Find all property references in the text
        const propertyReferences = text.matchAll(this.PROPERTY_REFERENCE);

        // Replace property references with actual property values from the component
        for (const propertyReference of propertyReferences) {
            const property = propertyReference[1];
            text = text.replace(propertyReference[0], this.component[property]);
        }

        // Set the processed text as the text content of the current VNode
        if (stackLastItem) {
            stackLastItem.text = text.trim();
        }
    }
}
