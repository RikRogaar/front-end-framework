import { h } from "snabbdom";

const initialState = {
    template: "",
    children: [],
    on: {}
};

const createReducer = (args: any) => (acc: any, currentString: any, index: any) => {
    const currentArg = args[index];

    if (currentArg) {
        switch (currentArg.type) {
            case "event":
                return {
                    ...acc,
                    on: {
                        click: currentArg.click
                    }
                };
            case "element":
                return {
                    ...acc,
                    template: acc.template + currentString + (args[index] || ""),
                    children: [...acc.children, currentArg]
                };
        }
    }
    console.log(currentString)

    return {
        ...acc,
        template: acc.template + currentString + (args[index] || "")
    };
};

const createElement = (tagName: string) => (strings: TemplateStringsArray, ...args: any) => {
    const { template, on , children} = strings.reduce(createReducer(args), initialState);

    return {
        type: "element",
        template: h(tagName, { on }, children ? children.map((child: any) => child.template) : template),
    };
};

export const p = createElement("p");
export const div = createElement("div");