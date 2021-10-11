import React, { FC } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { CodeEditor as GrafanaCodeEditor, Monaco } from '@grafana/ui';
import declarations from './declarations';

interface Props {
  language: EditorLanguageType;
  value: string | undefined;
  onChange: (value?: string) => void;
}

export const CodeEditor: FC<Props> = ({ language, value, onChange }) => {
  const editorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    if (language === 'javascript') {
      // Add autocompletion for panel definitions (htmlNode, codeData, data, options, ETC)
      monaco.languages.typescript.javascriptDefaults.addExtraLib(declarations, 'HtmlGraphics/HtmlGraphics.d.ts');
    }
  };

  return (
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
  );
};
