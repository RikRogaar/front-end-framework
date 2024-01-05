import parseHTML from '../parser';

export default function Component(data: componentDecoratorParams) {
    return (_ctr: Function) => {
        const { template } = data;

        const vtree = parseHTML(template);
    }
}

interface componentDecoratorParams {
    template: string;
}
