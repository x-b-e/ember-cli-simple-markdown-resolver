import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class GetMarkdownTree extends Helper {
  @service
  markdownResolver;

  compute([tree]) {
    return this.markdownResolver._tree(tree);
  }
}
