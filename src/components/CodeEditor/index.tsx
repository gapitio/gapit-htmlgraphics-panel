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
  const [declarations, setDeclarations] = useState<string>();

  const isJavascript = language === 'javascript';
  const editorDidMount = async (_: editor.IStandaloneCodeEditor, m: Monaco) => {
    if (declarations) {
      // Add autocompletion for panel definitions (htmlNode, codeData, data, options, ETC)
      m.languages.typescript.javascriptDefaults.addExtraLib(declarations, 'HtmlGraphics/HtmlGraphics.d.ts');
    }
  };

  useEffect(() => {
    if (isJavascript) {
      import('./declarations')
        .then(({ default: decl }) => {
          setDeclarations(decl);
        })
        .catch(() => setDeclarations(''));
    }
  }, [isJavascript]);

  return (
    <div>
      {!isJavascript || declarations || declarations === '' ? (
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
