import Vue, { CreateElement } from 'vue';
import { push, replace } from '../route';

type ZrLink = {
  to: string;
  replace: boolean;
};
export default {
  props: {
    to: String,
    replace: Boolean,
  },
  render(this: ZrLink & Vue, h: CreateElement) {
    return h('a', {
      on: {
        click: (e: Event) => {
          e.preventDefault();
          if (this.replace) {
            replace(this.to);
          } else {
            push(this.to);
          }
        },
      },
    }, this.$slots.default);
  },
}