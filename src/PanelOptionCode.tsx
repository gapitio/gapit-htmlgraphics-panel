import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { TextPanelEditor } from 'TextPanelEditor';
import { EditorLanguageType, EditorCodeType } from 'types';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<EditorCodeType, Settings> {}

export const PanelOptionCode: React.FC<Props> = ({ value, item, onChange }) => {
  return <TextPanelEditor language={item.settings?.language} value={value} onChange={code => onChange(code)} />;
};
