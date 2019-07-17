import { CreateElement, VNode } from 'vue';
import { router } from '../route';
import { _Vue } from '../install';
import { resolveParams } from '../utils/resolve';
import { isSamePath, match } from '../utils';

export default {
  provide(this: any) {
    return {
      parentPath: this.path,
    };
  },
  inject: {
    parentPath: {
      default: '',
    },
  },
  props: {
    path: {
      required: true,
      type: String,
    },
    component: {
      type: [Object, String, Function],
      required: true,
    },
    hasChild: {
      type: Boolean,
      default: false,
    },
  },
  render(this: any, h: CreateElement) {
    let vnode: VNode | void = undefined;
    const template = this.parentPath + this.path;
    const currentPath = router.current.path.replace(new RegExp(`^${router.base}`), '/');
    const compare = this.hasChild ? match : isSamePath;
    console.log(this.$parent.$children)
    if (compare(template, currentPath)) {
      router.current.params = resolveParams(this.path, router.current.path);
      vnode = h(this.component, {
        props: {
          route: router.current,
        },
      });
    }
    return vnode;
  },
};
