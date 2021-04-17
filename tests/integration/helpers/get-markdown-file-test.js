import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | get-markdown-file', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      hbs`{{get (get-markdown-file 'articles' 'example') 'attributes.title'}}`
    );

    assert.equal(this.element.textContent.trim(), 'Example Article');
  });
});
