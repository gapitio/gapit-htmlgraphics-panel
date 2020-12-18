import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType } from './types';
import { TextPanelEditor } from './TextPanelEditor';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<OptionsInterface['importedPanelOptions'] | undefined, Settings> {}

export const PanelOptionImportedPanelOptions: React.FC<Props> = ({ value, item, onChange, context }) => {
  if (context.options) {
    const options = { ...context.options };
    delete options.importedPanelOptions;
    const optionsString = JSON.stringify(options, null, 4);
    value = optionsString;
  }

  return (
    <div>
      <TextPanelEditor
        language={item.settings?.language}
        value={value}
        onChange={code => {
          onChange(code);
        }}
      />
    </div>
  );
};
