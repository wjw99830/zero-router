import Vue, { CreateElement, VNode } from 'vue';
export declare type ZrElse = Vue & {
    component: string | object | Function;
    parentPath: string;
    zrid: number;
};
declare const _default: {
    name: string;
    inject: {
        parentPath: {
            default: string;
        };
    };
    props: {
        component: {
            type: (ObjectConstructor | StringConstructor | FunctionConstructor)[];
            required: boolean;
        };
    };
    data(): {
        zrid: number;
    };
    render(this: ZrElse, h: CreateElement): void | VNode;
};
export default _default;
