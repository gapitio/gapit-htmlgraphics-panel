import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { TextEditor } from 'components/TextEditor';
import { EditorLanguageType, EditorCodeType } from 'types';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<EditorCodeType, Settings> {}

export const TextEditorOption: React.FC<Props> = ({ value, item, onChange }) => {
  return <TextEditor language={item.settings?.language} value={value} onChange={(code) => onChange(code)} />;
};
