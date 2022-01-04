import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType, EditorCodeType } from 'types';
import { CodeEditor } from 'components/CodeEditor';
import { Button, Input } from '@grafana/ui';
import { exportFile, contentType } from 'utils/exportFile';
import { readFile } from 'utils/readFile';

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

const Spacer: React.FC = () => <div style={{ marginBottom: '6px' }}></div>;

export const ImportExportOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const getOptionsString = () => {
    if (!context.options) {
      return;
    }

    const options = { ...context.options };
    delete options.importedPanelOptions;
    return JSON.stringify(options, null, 4);
  };

  const updatePanelOptions = (code: EditorCodeType) => {
    // Update the options dict before requesting a change
    if (code) {
      Object.assign(context.options, JSON.parse(code));
    }
    onChange();
  };

  return (
    <div>
      <Input type="file" onChange={(e) => importPanelOptions(e.currentTarget.files, updatePanelOptions)} />
      <Spacer />
      <CodeEditor language={item.settings?.language} value={getOptionsString()} onChange={updatePanelOptions} />
      <Spacer />
      <Button onClick={() => downloadJsonFile(getOptionsString())}>Download as JSON file</Button>
    </div>
  );
};
