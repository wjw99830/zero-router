import { RouterOptions } from './install';
export declare type RouteParams = Record<string, string | void>;
export declare type RouteQuery = Record<string, string | string[] | void>;
export declare type Route = {
    path: string;
    data?: any;
    query: RouteQuery;
    params: RouteParams;
};
export declare type RouterHook = (to: Route, from?: Route) => any;
export declare type Router = {
    stack: Route[];
    base: string;
    current: Route;
    hooks: {
        before: RouterHook[];
        after: RouterHook[];
    };
};
export declare function useBefore(cb: RouterHook): void;
export declare function useAfter(cb: RouterHook): void;
export declare const router: Router;
export declare function init(opts: RouterOptions): void;
export declare function push(path: string, data?: any): void;
export declare function replace(path: string, data?: any): void;
export declare function back(): void;
export declare function forward(): void;
