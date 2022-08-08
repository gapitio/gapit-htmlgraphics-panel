import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditorOptionSettings } from 'types';
import { CodeEditor } from 'components/CodeEditor';
import { Button, Input } from '@grafana/ui';
import { exportFile, contentType } from 'utils/exportFile';
import { readFile } from 'utils/readFile';

interface Props extends StandardEditorProps<string, CodeEditorOptionSettings> {}

function downloadJsonFile(panelOptionString: string | undefined) {
  if (panelOptionString) {
    exportFile(panelOptionString, 'panel-options.json', contentType.json);
  } else {
    console.warn('Panel options is empty. Failed download.');
  }
}

const Spacer: React.FC = () => <div style={{ marginBottom: '6px' }} />;

export const ImportExportOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const getOptionsString = () => {
    if (!context.options) {
      return;
    }

    const options = { ...context.options };
    delete options.importedPanelOptions;
    return JSON.stringify(options, null, 4);
  };

  const updatePanelOptions = (code: string) => {
    // Update the options dict before requesting a change
    if (code) {
      Object.assign(context.options, JSON.parse(code));
    }
    onChange();
  };

  const importPanelOptions = async (files: FileList | null) => {
    const file = files ? files.item(0) : null;

    if (file) {
      const panelOptionsString = await readFile(file);
      updatePanelOptions(panelOptionsString);
    }
  };

  return (
    <div>
      <Input type="file" onChange={(e) => importPanelOptions(e.currentTarget.files)} />
      <Spacer />
      <CodeEditor settings={item.settings} value={getOptionsString()} context={context} onChange={updatePanelOptions} />
      <Spacer />
      <Button onClick={() => downloadJsonFile(getOptionsString())}>Download as JSON file</Button>
    </div>
  );
};
