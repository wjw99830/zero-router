import { ZrElse } from '../components/else';
import { ZrElseIf } from '../components/else-if';
import { ZrIf } from '../components/if';
export declare function resolveParams(template: string, path: string): Record<string, string | void>;
export declare function resolveQuery(path: string): Record<string, string | void | string[]>;
export declare function resolvePrevIf(comp: ZrElseIf | ZrElse): ZrIf[];
