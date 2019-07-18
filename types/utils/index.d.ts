import { Route } from '../route';
export declare function ensureInstalled(): void;
export declare function createIndexRoute(base: string): Route;
export declare function isSamePath(p1: string, p2: string): boolean;
export declare function match(template: string, path: string): boolean;
