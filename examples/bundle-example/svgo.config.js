// https://github.com/svg/svgo#what-it-can-do

export default {
  plugins: [
    {
      cleanupAttrs: true
    },
    {
      removeDoctype: true
    },
    {
      removeXMLProcInst: true
    },
    {
      removeComments: true
    },
    {
      removeMetadata: true
    },
    {
      removeTitle: true
    },
    {
      removeDesc: true
    },
    {
      removeUselessDefs: true
    },
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeHiddenElems: false
    },
    {
      removeEmptyText: false
    },
    {
      removeEmptyContainers: true
    },
    {
      removeViewBox: false
    },
    {
      cleanupEnableBackground: true
    },
    {
      convertStyleToAttrs: false
    },
    {
      convertColors: true
    },
    {
      convertPathData: true
    },
    {
      convertTransform: true
    },
    {
      removeUnknownsAndDefaults: true
    },
    {
      removeNonInheritableGroupAttrs: true
    },
    {
      removeUselessStrokeAndFill: true
    },
    {
      removeUnusedNS: true
    },
    {
      cleanupIDs: false
    },
    {
      cleanupNumericValues: true
    },
    {
      moveElemsAttrsToGroup: true
    },
    {
      moveGroupAttrsToElems: false
    },
    {
      collapseGroups: false
    },
    {
      removeRasterImages: false
    },
    {
      mergePaths: false
    },
    {
      convertShapeToPath: false
    },
    {
      sortAttrs: true
    },
    {
      removeDimensions: true
    },
    {
      removeAttrs: {}
    }
  ]
}
