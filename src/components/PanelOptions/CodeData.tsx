import React, { useState } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType, EditorCodeType } from 'types';
import { TextEditor } from 'components/TextEditor';
import { Switch, Label } from '@grafana/ui';
import { SimpleOptions } from 'components/SimpleOptions';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<OptionsInterface['codeData'] | undefined, Settings> {}

const PARSE_JSON = (json: string) => {
  if (json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      console.error(`codeData:`, e);
      return {};
    }
  }
  return {};
};

const SimpleCodeData = ({ value, onChange }: { value: EditorCodeType; onChange: Props['onChange'] }) => {
  if (value) {
    const VALUE_CODE: { [key: string]: any } = PARSE_JSON(value);
    return (
      <div>
        <SimpleOptions
          dict={VALUE_CODE}
          newDict={VALUE_CODE}
          update={(value: { [key: string]: any }) => onChange(JSON.stringify(value, null, 2))}
        ></SimpleOptions>
      </div>
    );
  }
  return <></>;
};

export const CodeDataOption: React.FC<Props> = ({ value, item, onChange }) => {
  const [jsonView, setJsonView] = useState(false);

  return (
    <div>
      <br />
      <Label>Edit as JSON</Label>
      <Switch value={jsonView} onChange={() => setJsonView(!jsonView)} css={{}}></Switch>
      <br />
      {jsonView ? (
        <TextEditor
          language={item.settings?.language}
          value={value}
          onChange={(code) => {
            onChange(code);
          }}
        />
      ) : (
        <SimpleCodeData value={value} onChange={onChange} />
      )}
    </div>
  );
};
