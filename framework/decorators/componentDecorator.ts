import parser from '../parser';

export default function Component(data: componentDecoratorParams) {
    return (ctr: new () => any) => {
        // @ts-ignore
        const { template, styles, initialRender } = data;
        const instance = new ctr();

        new parser(template, initialRender ?? '', instance);
        // new ParserTest(template, styles ?? '', initialRender ?? '', instance);
    }
}

interface componentDecoratorParams {
    template: string;
    styles?: string;
    initialRender?: string;
}
