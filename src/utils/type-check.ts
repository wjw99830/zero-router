import Vue from 'vue';
import { ZrIf } from '../components/if';
import { ZrElseIf } from '../components/else-if';
import { ZrElse } from '../components/else';

export function isZrIf(comp: Vue): comp is ZrIf {
  return comp.$options.name === 'zr-if';
}

export function isZrElseIf(comp: Vue): comp is ZrElseIf {
  return comp.$options.name === 'zr-else-if';
}

export function isZrElse(comp: Vue): comp is ZrElse {
  return comp.$options.name === 'zr-else';
}
