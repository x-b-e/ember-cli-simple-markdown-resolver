import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | get-markdown-content', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{get-markdown-content 'articles' 'example'}}`);
    assert.equal(this.element.textContent.trim(), 'Foo bar');
  });
});
