import React, { useState } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType, EditorCodeType } from 'types';
import { CodeEditor } from 'components/CodeEditor';
import { Switch, Label } from '@grafana/ui';
import { SimpleOptions } from 'components/SimpleOptions';
import { parseJSON } from 'utils/parseJSON';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<OptionsInterface['codeData'] | undefined, Settings> {}

const SimpleCodeData = ({ value, onChange }: { value: EditorCodeType; onChange: Props['onChange'] }) => {
  if (value) {
    const { json: codeData } = parseJSON<OptionsInterface>(value, { namespace: 'codeData' });

    return (
      <div>
        <SimpleOptions dict={codeData ?? {}} update={() => onChange(JSON.stringify(codeData, null, 2))}></SimpleOptions>
      </div>
    );
  }
  return <></>;
};

export const CodeDataOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const [jsonView, setJsonView] = useState(false);

  return (
    <div>
      <br />
      <Label>Edit as JSON</Label>
      <Switch value={jsonView} onChange={() => setJsonView(!jsonView)}></Switch>
      <br />
      {jsonView ? (
        <CodeEditor language={item.settings?.language} value={value} onChange={(code) => onChange(code)} />
      ) : (
        <SimpleCodeData value={value} onChange={onChange} />
      )}
    </div>
  );
};
