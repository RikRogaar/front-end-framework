import ParserTest from '../parser';

export default function Component(data: componentDecoratorParams) {
    return (ctr: any) => {
        const { template, styles, initialRender } = data;
        const instance = new ctr();
        new ParserTest(template, styles, initialRender ?? '', instance);
    }
}

interface componentDecoratorParams {
    template: string;
    styles: string;
    initialRender?: string;
}
