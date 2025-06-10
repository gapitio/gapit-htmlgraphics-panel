import React, { FC, useEffect, useState } from 'react';
import { CodeEditorOptionSettings, OptionsInterface } from 'types';
import { CodeEditor as GrafanaCodeEditor, Monaco, MonacoEditor } from '@grafana/ui';
import { StandardEditorContext } from '@grafana/data';

interface Props {
  settings?: CodeEditorOptionSettings;
  value: string | undefined;
  context: StandardEditorContext<OptionsInterface, any>;
  onChange: (value: string) => void;
}

export const CodeEditor: FC<Props> = ({ settings, value, context, onChange }) => {
  const [monaco, setMonaco] = useState<Monaco>();

  const editorDidMount = async (_: MonacoEditor, m: Monaco) => {
    setMonaco(m);
  };

  useEffect(() => {
    if (!monaco || !settings?.htmlGraphicsDeclarationState?.enabled) {
      return;
    }

    if (settings.htmlGraphicsDeclarationState.declarationsLoaded) {
      // onInit and onRender would normally both load the declarations,
      // but this makes only one of them load the declarations
      return;
    } else {
      settings.htmlGraphicsDeclarationState.declarationsLoaded = true;
    }

    const reqDecl = require.context('./declarations', true, /\..*\.d\.ts$/);

    // Only load declarations that are not already loaded
    const loadedDeclarations = Object.keys(monaco.languages.typescript.javascriptDefaults.getExtraLibs());
    const unloadedDeclarations = reqDecl.keys().filter((filePath) => {
      const truncatedPath = filePath.substring(2); // Remove ./
      return !loadedDeclarations.includes(truncatedPath);
    });

    Promise.all(unloadedDeclarations.map((key) => fetch(reqDecl(key))))
      .then((r) => Promise.all(r.map((a) => a.text())))
      .then((d) => {
        const extraLibs = monaco.languages.typescript.javascriptDefaults.getExtraLibs();
        unloadedDeclarations.forEach((filePath, i) => {
          const truncatedPath = filePath.substring(2); // Remove ./
          if (truncatedPath in extraLibs) {
            // Don't add a declaration if it already exists
            // Makes it so customProperties isn't overwritten :D
            return;
          }
          monaco.languages.typescript.javascriptDefaults.addExtraLib(d[i], truncatedPath);
        });
      });
  }, [monaco, settings?.htmlGraphicsDeclarationState]);

  useEffect(() => {
    if (!monaco || context.options?.codeData === undefined || !settings?.htmlGraphicsDeclarationState?.enabled) {
      return;
    }

    if (settings.htmlGraphicsDeclarationState.handlingCustomPropertiesUpdate) {
      return;
    } else {
      settings.htmlGraphicsDeclarationState.handlingCustomPropertiesUpdate = true;
    }

    const createCustomPropertiesType = (json: string) => {
      try {
        return (
          `const customProperties = ${JSON.stringify(JSON.parse(json))} as const;\n` +
          'export type CustomProperties = typeof customProperties;'
        );
      } catch (e) {
        // If parsing fails the customProperties/codeData will be an empty object/dict
        return 'export type CustomProperties = {};';
      }
    };

    const content = createCustomPropertiesType(context.options.codeData);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(content, 'customProperties.d.ts');
    return () => {
      if (!settings.htmlGraphicsDeclarationState) {
        return;
      }
      settings.htmlGraphicsDeclarationState.handlingCustomPropertiesUpdate = false;
    };
  }, [monaco, settings?.htmlGraphicsDeclarationState, context.options?.codeData]);

  return (
    <div>
      <GrafanaCodeEditor
        height={'33vh'}
        value={value ?? ''}
        language={settings?.language ?? ''}
        showLineNumbers={true}
        onEditorDidMount={editorDidMount}
        onSave={onChange}
        onBlur={onChange}
        monacoOptions={{ contextmenu: true }}
      />
    </div>
  );
};
