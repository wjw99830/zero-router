import { CreateElement, VNode } from 'vue';
import { ZrIf } from './if';
export declare type ZrElseIf = ZrIf;
declare const _default: {
    name: string;
    provide(this: ZrIf): {
        parentPath: string;
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
        keepAlive: BooleanConstructor;
    };
    data(): {
        matched: boolean;
        zrid: number;
    };
    render(this: ZrIf, h: CreateElement): void | VNode;
};
export default _default;
