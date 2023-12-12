import { eventListenersModule, init } from "snabbdom";
import FrameworkElement from "./types/FrameworkElement";

export const patch = init([
    eventListenersModule
]);

export const initRender = (e: string, v: FrameworkElement) => {
    const targetEl = document.querySelector(e);

    targetEl ?
        patch(targetEl, v.template) :
        null;
}