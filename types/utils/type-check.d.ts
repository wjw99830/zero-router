import Vue from 'vue';
import { ZrIf } from '../components/if';
import { ZrElseIf } from '../components/else-if';
import { ZrElse } from '../components/else';
export declare function isZrIf(comp: Vue): comp is ZrIf;
export declare function isZrElseIf(comp: Vue): comp is ZrElseIf;
export declare function isZrElse(comp: Vue): comp is ZrElse;
