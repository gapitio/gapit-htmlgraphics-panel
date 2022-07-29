import React, { FC, useEffect, useState } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { CodeEditor as GrafanaCodeEditor, Monaco } from '@grafana/ui';

interface Props {
  language: EditorLanguageType;
  value: string | undefined;
  onChange: (value?: string) => void;
}

export const CodeEditor: FC<Props> = ({ language, value, onChange }) => {
  const [declarations, setDeclarations] = useState<Array<{ filePath: string; content: string }>>();

  const isJavascript = language === 'javascript';
  const editorDidMount = async (_: editor.IStandaloneCodeEditor, m: Monaco) => {
    if (declarations) {
      // Add autocompletion for panel definitions (htmlNode, htmlGraphics, data, options, ETC)
      for (const { filePath, content } of declarations) {
        m.languages.typescript.javascriptDefaults.addExtraLib(content, filePath);
      }
    }
  };

  useEffect(() => {
    if (isJavascript) {
      const reqDecl = require.context('./declarations', true, /\..*\.d\.ts$/);

      Promise.all(reqDecl.keys().map((key) => fetch(reqDecl(key))))
        .then((r) => Promise.all(r.map((a) => a.text())))
        .then((d) =>
          setDeclarations(
            reqDecl.keys().map((filePath, i) => ({
              filePath: filePath.substring(2),
              content: d[i],
            }))
          )
        );
    }
  }, [isJavascript]);

  return (
    <div>
      {!isJavascript || declarations ? (
        <GrafanaCodeEditor
          height={'33vh'}
          value={value ?? ''}
          language={language ?? ''}
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
