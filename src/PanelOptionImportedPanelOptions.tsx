import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType } from './types';
import { TextPanelEditor } from './TextPanelEditor';
import { Button } from '@grafana/ui';
import { exportFile, contentType } from 'components/exportFile';
import { EditorCodeType } from 'types';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<OptionsInterface['importedPanelOptions'] | undefined, Settings> {}

function downloadJsonFile(panelOptionString: EditorCodeType) {
  if (panelOptionString) {
    exportFile(panelOptionString, 'panel-options.json', contentType.json);
  } else {
    console.warn('Panel options is empty. Failed download.');
  }
}

export const PanelOptionImportedPanelOptions: React.FC<Props> = ({ value, item, onChange, context }) => {
  if (context.options) {
    const options = { ...context.options };
    delete options.importedPanelOptions;
    const optionsString = JSON.stringify(options, null, 4);
    value = optionsString;
  }

  return (
    <div>
      <Button style={{ marginBottom: '6px' }} onClick={() => downloadJsonFile(value)}>
        Download as JSON file
      </Button>
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
