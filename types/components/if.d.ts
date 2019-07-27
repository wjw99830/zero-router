import Vue, { CreateElement, VNode } from 'vue';
export declare type ZrIf = Vue & {
    component: string | object | Function;
    matched: boolean;
    parentPath: string;
    path: string;
    zrid: number;
};
declare const _default: {
    name: string;
    provide(this: any): {
        parentPath: any;
    };
    inject: {
        parentPath: {
            default: string;
        };
    };
    props: {
        path: {
            required: boolean;
            type: StringConstructor;
        };
        component: {
            type: (StringConstructor | ObjectConstructor | FunctionConstructor)[];
            required: boolean;
        };
    };
    data(): {
        matched: boolean;
        zrid: number;
    };
    render(this: ZrIf, h: CreateElement): void | VNode;
};
export default _default;
