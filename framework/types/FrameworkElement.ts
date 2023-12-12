import { VNode } from "snabbdom";

export default interface FrameworkElement {
    type: string;
    template: VNode;
}