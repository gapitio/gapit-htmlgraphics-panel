import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType } from './types';
import { TextPanelEditor } from './TextPanelEditor';
import { Button, Input } from '@grafana/ui';
import { exportFile, contentType } from 'components/exportFile';
import { readFile } from 'components/readFile';
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

async function importPanelOptions(files: FileList | null, updatePanelOptions: (value?: EditorCodeType) => void) {
  const file = files ? files.item(0) : null;

  if (file) {
    const panelOptionsString = await readFile(file);
    updatePanelOptions(panelOptionsString);
  }
}

const Spacer: React.FC = () => {
  return <div style={{ marginBottom: '6px' }}></div>;
};

export const PanelOptionImportedPanelOptions: React.FC<Props> = ({ value, item, onChange, context }) => {
  if (context.options) {
    const options = { ...context.options };
    delete options.importedPanelOptions;
    const optionsString = JSON.stringify(options, null, 4);
    value = optionsString;
  }

  const updatePanelOptions = (code: EditorCodeType) => {
    // Update the options dict before requesting a change
    if (code) Object.assign(context.options, JSON.parse(code));
    onChange(code);
  };

  return (
    <div>
      <Input css={{}} type="file" onChange={(e) => importPanelOptions(e.currentTarget.files, updatePanelOptions)} />
      <Spacer />
      <TextPanelEditor language={item.settings?.language} value={value} onChange={updatePanelOptions} />
      <Spacer />
      <Button onClick={() => downloadJsonFile(value)}>Download as JSON file</Button>
    </div>
  );
};
