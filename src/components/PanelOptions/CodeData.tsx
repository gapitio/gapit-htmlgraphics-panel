import React, { useState } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, CodeEditorOptionSettings } from 'types';
import { CodeEditor } from 'components/CodeEditor';
import { Switch, Label } from '@grafana/ui';
import { SimpleOptions } from 'components/SimpleOptions';
import { parseJSON } from 'utils/parseJSON';

interface Props extends StandardEditorProps<string, CodeEditorOptionSettings> {}

const SimpleCodeData = ({ value, onChange }: { value: string; onChange: Props['onChange'] }) => {
  if (value) {
    const { json: codeData } = parseJSON<OptionsInterface>(value, { namespace: 'codeData' });

    return (
      <div>
        <SimpleOptions dict={codeData ?? {}} update={() => onChange(JSON.stringify(codeData, null, 2))} />
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
        <CodeEditor settings={item.settings} value={value} context={context} onChange={(code) => onChange(code)} />
      ) : (
        <SimpleCodeData value={value} onChange={onChange} />
      )}
    </div>
  );
};
