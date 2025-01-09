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

  const editorDidMount = async (_: MonacoEditor, m: Monaco) => {
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
