ember-cli-simple-markdown-resolver
==============================================================================

Simplified version of [ember-cli-markdown-resolver](https://github.com/willviles/ember-cli-markdown-resolver) that provides a service to expose static markdown content using [Brocolli Markdown Resolver](https://github.com/willviles/broccoli-markdown-resolver).

The service and helpers are the same, but the templates were removed.


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-simple-markdown-resolver
```


Usage
------------------------------------------------------------------------------

The addon requires you specify the locations of markdown files:

```js
// config/environment.js

ENV['ember-cli-simple-markdown-resolver'] = {
  folders: {
    'guides': 'app/guides'
  }
};
```

And to populate your folder with markdown content:

```shell
.
└── app/
    └── guides/
        ├── quick-start.md
        ├── examples.md
        └── examples/
            └── first.md
```


Usage
------------------------------------------------------------------------------

Ember CLI Markdown Resolver enables markdown content to be retrieved via the `markdownResolver` service.

### `this.markdownResolver.file(type, path)`

The `file` method returns promisified markdown content, allowing the content to be chainable via `.then()`.

```js
// routes/guides/single.js

import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  model({ path }) {
    return get(this, 'markdownResolver').file('guides', path);
  }
});
```

Each markdown file exposes the path, raw content, frontmatter attributes and its children.

```hbs
<!-- templates/guides/single.hbs -->

{{model.content}} <!-- 'Lorem ipsum dolor sit amet' -->
{{model.path}} <!-- 'app/guides/examples' -->
{{model.attributes}} <!-- { title: 'Examples', order: 1 } -->
{{model.children}} <!-- Array of child content -->
```

### `this.markdownResolver.tree(type)`

The `tree` method returns a tree object for a given folder, allowing menu interfaces to be built from the markdown file structure.

```js
// routes/guides.js

import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  model() {
    return get(this, 'markdownResolver').tree('guides');
  }
});
```

Adding an `order` value to a file's frontmatter will automatically order files within the tree.

```md
---
title: Quick Start
order: 0
---

Lorem ipsum dolor sit amet...
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
