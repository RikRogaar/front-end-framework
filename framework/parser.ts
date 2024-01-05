export default function parseHTML(template: string) {
    const split = splitTemplate(template);
    console.log("🚀 ~ file: parser.ts:3 ~ parseHTML ~ split:", split)
    return split;
}

const splitTemplate = (templateString: string, result: any[] = []) => {
    const regex = /<(\w+)[^>]*>([\s\S]*?)<\/\1>/;
    const match = templateString.match(regex);

    if (match) {
        const tagName = match[1];
        const content = match[2].trim();
        const children = match[3].trim();

        result.push({
            tag: tagName,
            children: children,
            content: content
        });
    }

    return result;
}
