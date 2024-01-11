import parser from '../parser';

export default function Component(data: componentDecoratorParams) {
    return (ctr: new () => any) => {
        const { template, styles, initialRender } = data;
        const instance = new ctr();

        new parser(template, initialRender ?? '', instance);
    }
}

interface componentDecoratorParams {
    template: string;
    styles?: string;
    initialRender?: string;
}
