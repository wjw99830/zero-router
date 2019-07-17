import { CreateElement, VNode } from 'vue';
import { router } from '../route';
import { _Vue } from '../install';

export default {
  props: {
    path: {
      required: true,
      type: String,
    },
    component: {
      type: [Object, String, Function],
      required: true,
    },
  },
  render(this: any, h: CreateElement) {
    let vnode: VNode | void = undefined;
    if (router.current.path.replace(new RegExp(`^${router.base}`), '/') === this.path) {
      vnode = h(this.component, {
        props: {
          route: router.current,
        },
      });
    }
    return vnode;
  },
};
