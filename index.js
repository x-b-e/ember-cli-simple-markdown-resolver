'use strict';

const MarkdownResolver = require('broccoli-markdown-resolver');
const MergeTrees = require('broccoli-merge-trees');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: require('./package').name,

  included(app) {
    this.addonConfig = this.getAddonConfig(app);
    this.testAppPath = this.getTestAppPath();
    return this._super.included.apply(this, arguments);
  },

  treeForAddon(tree) {
    const folders = Object.keys(this.addonConfig.folders || {}).reduce(
      (folders, key) => {
        return [...folders, this.addonConfig.folders[key]];
      },
      []
    );

    const mdPaths = folders.reduce((paths, folder) => {
      const folderPathSegments = folder.split('/'),
        folderPath = path.join(
          this.app.project.root,
          this.testAppPath,
          ...folderPathSegments
        ),
        folderExists = fs.existsSync(folderPath);

      return folderExists ? [...paths, folderPath] : [...paths];
    }, []);

    if (mdPaths.length > 0) {
      let mdFiles = new MarkdownResolver(mdPaths, {
        basePath: path.join(this.app.project.root, this.testAppPath),
        outputFile: 'files.js',
        trimExtensions: true,
      });
      tree = new MergeTrees([tree, mdFiles]);
    }

    return this._super.treeForAddon.call(this, tree);
  },

  getAddonConfig(app) {
    return this.app.project.config(app.env)[this.name] || {};
  },

  getTestAppPath() {
    let configPath = this.app.options.configPath;
    return typeof configPath === 'string' || configPath instanceof String
      ? './tests/dummy'
      : '';
  },
};
