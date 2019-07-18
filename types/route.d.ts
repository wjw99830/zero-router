import { RouterOptions } from './install';
export declare type RouteParams = Record<string, string | void>;
export declare type RouteQuery = Record<string, string | string[] | void>;
export declare type Route = {
    path: string;
    data?: any;
    query: RouteQuery;
    params: RouteParams;
};
export declare type Router = {
    stack: Route[];
    base: string;
    current: Route;
};
export declare let router: Router;
export declare function init(opts: RouterOptions): void;
export declare function push(path: string, data?: any): void;
export declare function replace(path: string, data?: any): void;
export declare function back(): void;
export declare function forward(): void;
