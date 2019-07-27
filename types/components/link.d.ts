import Vue, { CreateElement } from 'vue';
declare type ZrLink = {
    to: string;
    replace: boolean;
};
declare const _default: {
    props: {
        to: StringConstructor;
        replace: BooleanConstructor;
    };
    render(this: ZrLink & Vue, h: CreateElement): import("vue").VNode;
};
export default _default;
