module.exports.htmlGraphics = {
  version: '2.1.1',
  latestReleaseUrl:
    'https://github.com/gapitio/gapit-htmlgraphics-panel/releases/latest/download/gapit-htmlgraphics-panel.zip',
  releaseUrl: function () {
    return `https://github.com/gapitio/gapit-htmlgraphics-panel/releases/download/v${this.version}/gapit-htmlgraphics-panel-${this.version}.zip`;
  },
};
