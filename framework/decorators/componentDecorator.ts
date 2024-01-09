import ParserTest from '../parser';

export default function Component(data: componentDecoratorParams) {
    return (ctr: any) => {
        const { template, initialRender } = data;
        const instance = new ctr();
        new ParserTest(template, instance, initialRender ?? '');
    }
}

interface componentDecoratorParams {
    template: string;
    initialRender?: string;
}
