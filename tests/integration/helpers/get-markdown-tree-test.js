import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | get-markdown-tree', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{get (get-markdown-tree 'articles') 'name'}}`);
    assert.equal(this.element.textContent.trim(), 'articles');
  });
});
