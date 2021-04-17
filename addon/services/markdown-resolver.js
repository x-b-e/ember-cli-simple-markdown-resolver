import Service from '@ember/service';

import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { files, trees } from 'ember-cli-simple-markdown-resolver/files';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
const { resolve } = RSVP;

export default class MarkdownResolverService extends Service {
  get config() {
    return (
      getOwner(this).resolveRegistration('config:environment')[
        'ember-cli-simple-markdown-resolver'
      ] || {}
    );
  }

  get files() {
    return A(files);
  }

  get trees() {
    return Object.keys(trees).reduce((allTrees, key) => {
      allTrees[key] = {
        name: this.getTreeName(key),
        path: key,
        files: this.orderFiles(trees[key]),
      };
      return allTrees;
    }, {});
  }

  _file(tree, file) {
    tree = this.getPathFromTreeName(tree);
    return this.files.findBy('path', `${tree}/${file}`);
  }

  file(tree, file) {
    return resolve(this._file(tree, file));
  }

  _tree(tree) {
    const { trees } = this;
    tree = this.getPathFromTreeName(tree);
    if (trees && get(trees, tree)) {
      return get(trees, tree);
    } else {
      return [];
    }
  }

  tree(tree) {
    return resolve(this._tree(tree));
  }

  getTreeName(path) {
    const {
      config: { folders },
    } = this;

    return Object.keys(folders).find((key) => {
      return folders[key] === path;
    });
  }

  getPathFromTreeName(treeName) {
    const {
      config: { folders },
    } = this;

    return get(folders, treeName);
  }

  orderFiles(files) {
    files = A(files)
      .sortBy('attributes.order')
      .filter((file) => {
        let attrs = file.attributes;
        if ('inTree' in attrs && !attrs.inTree) {
          return;
        }
        return file;
      });

    files.forEach((file) => {
      const { children } = file;
      if (children) {
        set(file, 'children', this.orderFiles(children));
      }
    });

    return files;
  }
}
