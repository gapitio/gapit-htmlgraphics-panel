import React, { FC, useEffect, useLayoutEffect, useState, useRef } from 'react';
import { CodeEditorOptionSettings, OptionsInterface } from 'types';
import { CodeEditor as GrafanaCodeEditor, IconButton, Monaco, MonacoEditor, Text, useTheme2 } from '@grafana/ui';
import { StandardEditorContext } from '@grafana/data';

interface Props {
  settings?: CodeEditorOptionSettings;
  value: string | undefined;
  context: StandardEditorContext<OptionsInterface, any>;
  onChange: (value: string) => void;
}

const EDITOR_BORDER_SIZE = 2; // Grafana has a 1px border on the editor container
const BAR_HEIGHT = 24;
const BAR_BORDER_SIZE = 1; // The bar only has a bottom border
const EDITOR_HEIGHT_OFFSET = EDITOR_BORDER_SIZE + BAR_HEIGHT + BAR_BORDER_SIZE; // 27px

export const CodeEditor: FC<Props> = ({ settings, value, context, onChange }) => {
  const [monaco, setMonaco] = useState<Monaco>();
  const [editor, setEditor] = useState<MonacoEditor>();
  const [editorHeight, setEditorHeight] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme2();

  const editorDidMount = async (e: MonacoEditor, m: Monaco) => {
    e.layout();
    setMonaco(m);
    setEditor(e);
  };

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // Ensure the container is sized correctly
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length !== 1) {
        return;
      }
      const entry = entries[0];
      const editorHeight2 = entry.contentRect.height - EDITOR_HEIGHT_OFFSET;

      setEditorHeight(editorHeight2);

      if (editor) {
        editor.layout({
          height: editorHeight2,
          width: entry.contentRect.width - EDITOR_BORDER_SIZE,
        });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [editor]);

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

  const actuallySetContainerHeight = (height: string) => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.style.height = height;
  };

  return (
    <div
      ref={containerRef}
      style={{
        resize: 'vertical',
        overflow: 'hidden',
        height: `${EDITOR_HEIGHT_OFFSET + 64}px`, // 27px + 64px = 91px
        minHeight: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <GrafanaCodeEditor
        value={value ?? ''}
        language={settings?.language ?? ''}
        showLineNumbers={true}
        onEditorDidMount={editorDidMount}
        onSave={onChange}
        onBlur={onChange}
        monacoOptions={{ contextmenu: true, automaticLayout: false }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          paddingRight: '14px',
          gap: '8px',
          border: `1px solid ${theme.colors.border.weak}`,
          borderTop: 'none',
        }}
      >
        <Text variant="bodySmall">
          {editorHeight === 5 ? '(min) ' : ''}
          {editorHeight === 64 ? '(default) ' : ''}
          {editorHeight !== undefined ? editorHeight.toFixed() + 'px' : ''}
        </Text>
        <div style={{ height: '24px', display: 'flex', gap: '4px' }}>
          <IconButton
            aria-label="Shrink"
            tooltip="Shrink (64px)"
            name={
              editorHeight && editorHeight === 64
                ? 'arrow-right'
                : editorHeight && editorHeight < 64
                ? 'arrow-down'
                : 'arrow-up'
            }
            size="md"
            onClick={() => actuallySetContainerHeight(`${EDITOR_HEIGHT_OFFSET + 64}px`)}
          />
          <IconButton
            aria-label="Expand"
            tooltip="Expand (33vh)"
            name={
              editorHeight && editorHeight < 64
                ? 'angle-double-down'
                : 'arrow-down'
            }
            size="md"
            onClick={() => actuallySetContainerHeight('33vh')}
          />
        </div>
      </div>
    </div>
  );
};
