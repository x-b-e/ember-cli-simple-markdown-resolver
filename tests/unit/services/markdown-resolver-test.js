import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | markdown-resolver', function (hooks) {
  setupTest(hooks);

  test('parses and exposes the markdown files', async function (assert) {
    let service = this.owner.lookup('service:markdown-resolver');
    assert.ok(service);
    const file = await service.file('articles', 'example');
    assert.ok(file);
    assert.equal(file.attributes.slug, 'example');
    assert.equal(file.attributes.title, 'Example Article');
    assert.equal(file.content, 'Foo bar');
    const body = file.children.find(function (child) {
      return child.path.includes('body');
    });
    assert.equal(body.content, 'body');
  });
});
