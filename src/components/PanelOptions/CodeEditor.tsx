import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from 'components/CodeEditor';
import { EditorLanguageType, EditorCodeType } from 'types';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<EditorCodeType, Settings> {}

export const CodeEditorOption: React.FC<Props> = ({ value, item, onChange }) => {
  return <CodeEditor language={item.settings?.language} value={value} onChange={(code) => onChange(code)} />;
};
