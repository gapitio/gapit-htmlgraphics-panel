import { PanelPlugin } from '@grafana/data';
import { OptionsInterface } from './types';
import { HTMLPanel } from './HTMLPanel';
import { PanelOptionCodeData } from 'PanelOptionCodeData';
import { PanelOptionCode } from 'PanelOptionCode';

export const plugin = new PanelPlugin<OptionsInterface>(HTMLPanel).setPanelOptions(builder => {
  return builder
    .addBooleanSwitch({
      path: 'add100Percentage',
      name: 'Fit content to panel',
      description: `
        Adds 100% height and width attribute to the document.
      `,
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'centerAlignContent',
      name: 'Center align content',
      description: `
        Vertically and horizontally aligns the content to the center.
      `,
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'SVGBaseFix',
      name: 'SVG base fix',
      description: 'Fixes an issue in Firefox where xlink:href needs the url to be able to find the link',
      defaultValue: true,
      category: ['Polyfill'],
    })
    .addCustomEditor({
      id: 'codeData',
      path: 'codeData',
      name: 'Code data',
      description: 'This is the codeData, which can be accessed by onInit and onRender',
      editor: PanelOptionCodeData,
      category: ['Code data'],
      defaultValue: '{"randomKey": "randomValue"}',
      settings: {
        language: 'json',
      },
    })
    .addCustomEditor({
      id: 'css',
      path: 'css',
      name: 'CSS',
      description: '',
      editor: PanelOptionCode,
      settings: {
        language: 'css',
      },
    })
    .addCustomEditor({
      id: 'html',
      path: 'html',
      name: 'HTML/SVG document',
      description: `
        This is the htmlNode (can be HTML or SVG).
        It is recommended to write your code in an editor and paste the code here.
        This is to keep a copy of the code and not lose your work if the browser crashes.
      `,
      editor: PanelOptionCode,
      settings: {
        language: 'html',
      },
    })
    .addCustomEditor({
      id: 'onRender',
      path: 'onRender',
      name: 'onRender',
      description: `On render code is executed whenever new data is available (htmlNode, codeData, data, options, theme, getTemplateSrv, getLocationSrv)`,
      editor: PanelOptionCode,
      settings: {
        language: 'javascript',
      },
    })
    .addCustomEditor({
      id: 'onInit',
      path: 'onInit',
      name: 'onInit',
      description:
        'On int code is executed when the panel loads (htmlNode, codeData, data, options, theme, getTemplateSrv, getLocationSrv)',
      editor: PanelOptionCode,
      settings: {
        language: 'javascript',
      },
    });
});
