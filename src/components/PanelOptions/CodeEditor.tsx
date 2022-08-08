import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from 'components/CodeEditor';
import { CodeEditorOptionSettings, OptionsInterface } from 'types';

interface Props extends StandardEditorProps<string, CodeEditorOptionSettings, OptionsInterface> {}

export const CodeEditorOption: React.FC<Props> = ({ value, item, context, onChange }) => {
  return <CodeEditor settings={item.settings} value={value} context={context} onChange={(code) => onChange(code)} />;
};
