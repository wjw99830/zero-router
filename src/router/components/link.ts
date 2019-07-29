import Vue, { CreateElement } from 'vue';
import { push, replace } from '../route';

type ZrLink = {
  to: string;
  replace: boolean;
  data: any;
};
export default {
  props: {
    to: String,
    replace: Boolean,
    data: [Object, Array, String, Number, Boolean],
  },
  render(this: ZrLink & Vue, h: CreateElement) {
    return h('a', {
      on: {
        click: (e: Event) => {
          e.preventDefault();
          if (this.replace) {
            replace(this.to, this.data);
          } else {
            push(this.to, this.data);
          }
        },
      },
    }, this.$slots.default);
  },
}