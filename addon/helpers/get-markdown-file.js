import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class GetMarkdownFile extends Helper {
  @service
  markdownResolver;

  compute([tree, file]) {
    return this.markdownResolver._file(tree, file);
  }
}
