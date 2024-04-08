import { PanelPlugin } from '@grafana/data';
import { OptionsInterface, CalcsMutation, EditorLanguage, CodeEditorOptionSettings } from 'types';
import { HTMLPanel } from 'HTMLPanel';
import { CodeDataOption } from 'components/PanelOptions/CodeData';
import { CodeEditorOption } from 'components/PanelOptions/CodeEditor';
import { ImportExportOption } from 'components/PanelOptions/ImportExport';
import { SelectedCalcsOption } from 'components/PanelOptions/SelectedCalcsOption';
import { CalcsMutationOption } from 'components/PanelOptions/CalcsMutationOptions';
import { calcsMutations } from 'utils/calcsMutations';

export const plugin = new PanelPlugin<OptionsInterface>(HTMLPanel).useFieldConfig().setPanelOptions((builder) => {
  {
    const category = ['Value options'];
    builder
      .addCustomEditor<Record<string, never>, CalcsMutation>({
        id: 'calcsMutation',
        path: 'calcsMutation',
        name: 'Mutate calcs',
        description:
          "Mutate the calcs object and returned values from fieldDisplayValues. Useful when getting metric values. This doesn't remove existing calcs. Adding two or more calcs adds the standard calcs to the calcs object. OBS! Some changes might require a page reload.",
        category,
        editor: CalcsMutationOption,
        defaultValue: CalcsMutation.Standard,
      })
      .addCustomEditor<Record<string, never>, string[]>({
        id: 'reduceOptions.calcs',
        path: 'reduceOptions.calcs',
        name: 'Calcs',
        description: 'Reducer functions (calcs) to be added to the calcs object.',
        category,
        editor: SelectedCalcsOption,
        defaultValue: calcsMutations.find(({ value }) => value === CalcsMutation.Standard)?.getReducerIDs() ?? [],
        showIf: (options) => options.calcsMutation !== CalcsMutation.None,
      });
  }

  {
    const category = ['Polyfill'];
    builder.addBooleanSwitch({
      path: 'SVGBaseFix',
      name: 'SVG base fix',
      description: 'Fixes an issue in Firefox where xlink:href needs the url to be able to find the link',
      defaultValue: true,
      category,
    });
  }

  {
    const category = ['Style'];
    builder
      .addBooleanSwitch({
        path: 'add100Percentage',
        name: 'Fit content to panel',
        description: `Adds 100% height and width attribute to the first element in the HTML/SVG code.`,
        category,
        defaultValue: true,
      })
      .addBooleanSwitch({
        path: 'centerAlignContent',
        name: 'Center align content',
        description: `Vertically and horizontally aligns the content to the center.`,
        category,
        defaultValue: true,
      })
      .addRadio({
        path: 'overflow',
        name: 'Overflow',
        description:
          'Chooses what happens if content overflows outside the panel. "Fit content to panel" is recommended to turn on with some of these options.',
        category,
        settings: {
          options: [
            {
              label: 'Visible',
              value: 'visible',
            },
            {
              label: 'Auto',
              value: 'auto',
            },
            {
              label: 'Scroll',
              value: 'scroll',
            },
            {
              label: 'Hidden',
              value: 'hidden',
            },
          ],
        },
        defaultValue: 'visible',
      })
      .addBooleanSwitch({
        path: 'useGrafanaScrollbar',
        name: 'Use Grafana scrollbar',
        description: '',
        category,
        defaultValue: true,
        showIf: (options) => options.overflow === 'visible',
      })
      .addCustomEditor<CodeEditorOptionSettings, string>({
        id: 'rootCSS',
        path: 'rootCSS',
        name: 'Root CSS',
        description: "CSS that's loaded outside the shadow root. Useful for font faces and imports.",
        category,
        editor: CodeEditorOption,
        defaultValue: '',
        settings: {
          language: EditorLanguage.Css,
        },
      })
      .addCustomEditor<CodeEditorOptionSettings, string>({
        id: 'css',
        path: 'css',
        name: 'CSS',
        description: '',
        category,
        editor: CodeEditorOption,
        defaultValue:
          '* {\n  font-family: Open Sans;\n}\n\n.box {\n  border: solid #555 2px;\n  border-radius: 10px;\n  padding: 10px 20px;\n}\n',
        settings: {
          language: EditorLanguage.Css,
        },
      });
  }

  {
    const category = ['HTML'];
    builder.addCustomEditor<CodeEditorOptionSettings, string>({
      id: 'html',
      path: 'html',
      name: 'HTML/SVG document',
      description: `
        This is the htmlNode (can be HTML and/or SVG).
        It is recommended to write your code in an editor and paste the code here.
        This is to keep a copy of the code and not lose your work if the browser crashes.
    `,
      category,
      editor: CodeEditorOption,
      defaultValue:
        '<div style="text-align: center;">\n  <div class="box" id="htmlgraphics-text"></div>\n  <br />\n  <div class="box" id="htmlgraphics-value"></div>\n</div>\n',
      settings: {
        language: EditorLanguage.Html,
      },
    });
  }

  {
    const category = ['On render'];
    builder
      .addBooleanSwitch({
        path: 'renderOnMount',
        name: 'Run onRender when mounted',
        description: 'Run onRender when the panel is first loaded (in most cases, this should be true)',
        category,
        defaultValue: true,
      })
      .addCustomEditor<CodeEditorOptionSettings, string>({
        id: 'onRender',
        path: 'onRender',
        name: 'onRender',
        description: `The onRender code is executed whenever new data is available (htmlNode, customProperties/codeData, data, options, theme, getTemplateSrv, getLocationSrv, htmlGraphics)`,
        editor: CodeEditorOption,
        category,
        defaultValue:
          '// Sets the value from the first series on every refresh\nconst htmlgraphicsValue = htmlNode.getElementById(\'htmlgraphics-value\');\n\nif (htmlgraphicsValue) {\n  const valueField = data.series[0]?.fields[1];\n  if (valueField) {\n    const length = valueField.values.length;\n    htmlgraphicsValue.textContent = valueField.values.get(length - 1);\n  } else {\n    htmlgraphicsValue.textContent = "No data"\n  }\n}\n',
        settings: {
          language: EditorLanguage.Javascript,
        },
      });
  }

  {
    const category = ['On init'];
    builder
      .addBooleanSwitch({
        path: 'panelupdateOnMount',
        name: 'Trigger panelupdate when mounted',
        description:
          'Trigger the panelupdate event (htmlNode.onpanelupdate) when the panel is first loaded (in most cases, this should be true)',
        category,
        defaultValue: true,
      })
      .addBooleanSwitch({
        path: 'dynamicHtmlGraphics',
        name: 'Dynamic htmlGraphics (onInit)',
        description: 'Update the onInit htmlGraphics object when new data is available.',
        category,
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'dynamicData',
        name: 'Dynamic data object (onInit)',
        description:
          'Update the onInit data object when new data is available. The onInit code will not execute again, it will only update the data object.',
        category,
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'dynamicFieldDisplayValues',
        name: 'Dynamic fieldDisplayValues (onInit)',
        description: 'Update the onInit fieldDisplayValues object when new data is available.',
        category,
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'dynamicProps',
        name: 'Dynamic props (onInit)',
        description: 'Update the onInit props object when new data is available.',
        category,
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'onInitOnResize',
        name: 'Trigger onInit on resize',
        description: 'Trigger the onInit code when the panels width/height changes.',
        category,
        defaultValue: false,
      })
      .addCustomEditor<CodeEditorOptionSettings, string>({
        id: 'onInit',
        path: 'onInit',
        name: 'onInit',
        description:
          'The onInit code is executed when the panel loads (htmlNode, customProperties/codeData, data, options, theme, getTemplateSrv, getLocationSrv, htmlGraphics)',
        editor: CodeEditorOption,
        category,
        defaultValue:
          "// Sets the text from customProperties\nconst htmlgraphicsText = htmlNode.getElementById('htmlgraphics-text');\n\nif (htmlgraphicsText) {\n  htmlgraphicsText.textContent = customProperties.text;\n\n  // Change the text color based on the theme\n  if (theme.isDark) {\n    htmlgraphicsText.style.color = 'green';\n  } else {\n    htmlgraphicsText.style.color = 'red';\n  }\n}\n",
        settings: {
          language: EditorLanguage.Javascript,
          useHtmlGraphicsDeclarations: true,
        },
      });
  }

  {
    const category = ['Custom properties'];
    builder.addCustomEditor<CodeEditorOptionSettings, string>({
      id: 'codeData',
      path: 'codeData',
      name: 'Custom properties',
      description: 'CustomProperties (codeData) which can be accessed by onInit and onRender',
      editor: CodeDataOption,
      category,
      defaultValue: '{\n  "text": "Random text"\n}',
      settings: {
        language: EditorLanguage.Json,
      },
    });
  }

  {
    const category = ['Import/export'];
    builder.addCustomEditor<CodeEditorOptionSettings, string>({
      id: 'importedPanelOptions',
      path: 'importedPanelOptions',
      name: 'Panel options',
      description: 'Easily copy all options to a panel which uses the HTMLGraphics panel (gapit-htmlgraphics-panel).',
      editor: ImportExportOption,
      category,
      settings: {
        language: EditorLanguage.Json,
      },
    });
  }
});
