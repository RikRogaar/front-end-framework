import { h } from "snabbdom";

const initialState = {
    template: "",
    on: {}
};

const createReducer = (args: any) => (acc: any, currentString: any, index: any) => {
    const currentArg = args[index];

    if (currentArg) {
        switch(currentArg.type) {
            case "event":
                return {
                    ...acc,
                    on: {
                        click: currentArg.click
                    }
            };
        }
    }

    return {
        ...acc,
        template: acc.template + currentString + (args[index] || "")
    };
};

const createElement = (tagName: string) => (strings: TemplateStringsArray, ...args: any) => {
    console.log(strings, args);
    const { template, on } = strings.reduce(createReducer(args), initialState);

    return {
        type: "element",
        template: h(tagName, { on }, template)
    };
};

export const p = createElement("p");
export const div = createElement("div");