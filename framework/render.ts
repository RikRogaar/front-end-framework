import { classModule, eventListenersModule, init, styleModule } from "snabbdom";

export const patch = init([
    eventListenersModule,
    classModule,
    styleModule
]);

export const initRender = (e: string, v: any) => {
    const targetEl = document.querySelector(e);

    targetEl ?
        patch(targetEl, v) :
        null;
}