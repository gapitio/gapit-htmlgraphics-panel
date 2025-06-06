import React, { FC, useEffect, useState } from 'react';
import { CodeEditorOptionSettings, OptionsInterface } from 'types';
import { CodeEditor as GrafanaCodeEditor, Monaco, MonacoEditor } from '@grafana/ui';
import { StandardEditorContext } from '@grafana/data';

interface Props {
  settings?: CodeEditorOptionSettings;
  value: string | undefined;
  context: StandardEditorContext<OptionsInterface, any>;
  onChange: (value: string) => void;
}

export const CodeEditor: FC<Props> = ({ settings, value, context, onChange }) => {
  const [declarations, setDeclarations] = useState<Array<{ filePath: string; content: string }>>();
  const [monaco, setMonaco] = useState<Monaco>();

  const editorDidMount = async (_: MonacoEditor, m: Monaco) => {
    setMonaco(m);
    if (declarations) {
      // Add autocompletion for panel definitions (htmlNode, htmlGraphics, data, options, ETC)
      m.languages.typescript.javascriptDefaults.setExtraLibs(declarations);
    }
  };

  useEffect(() => {
    if (settings?.useHtmlGraphicsDeclarations) {
      const reqDecl = require.context('./declarations', true, /\..*\.d\.ts$/);

      Promise.all(reqDecl.keys().map((key) => fetch(reqDecl(key))))
        .then((r) => Promise.all(r.map((a) => a.text())))
        .then((d) =>
          setDeclarations(
            reqDecl.keys().map((filePath, i) => ({
              filePath: filePath.substring(2), // Remove ./
              content: d[i],
            }))
          )
        );
    }
  }, [settings?.useHtmlGraphicsDeclarations]);

  useEffect(() => {
    if (!monaco || context.options?.codeData === undefined || !settings?.useHtmlGraphicsDeclarations === true) {
      return;
    }

    const createCustomPropertiesType = (json: string) => {
      try {
        return (
          `const customProperties = ${JSON.stringify(JSON.parse(json))} as const;\n` +
          'export type CustomProperties = typeof customProperties;'
        );
      } catch (e) {
        // If parsing fails the customProperties/codeData will be an empty object/dict
        return 'export type CustomProperties = {};';
      }
    };

    const content = createCustomPropertiesType(context.options.codeData);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(content, 'customProperties.d.ts');
  }, [context, monaco, settings]);

  return (
    <div>
      {!settings?.useHtmlGraphicsDeclarations || declarations ? (
        <GrafanaCodeEditor
          height={'33vh'}
          value={value ?? ''}
          language={settings?.language ?? ''}
          showLineNumbers={true}
          onEditorDidMount={editorDidMount}
          onSave={onChange}
          onBlur={onChange}
          monacoOptions={{ contextmenu: true }}
        />
      ) : (
        <div style={{ height: '33vh' }}>Loading declarations...</div>
      )}
    </div>
  );
};
