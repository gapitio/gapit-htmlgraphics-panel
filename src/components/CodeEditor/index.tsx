import React, { FC, useEffect, useLayoutEffect, useState, useRef, type RefObject } from 'react';
import { CodeEditorOptionSettings, OptionsInterface } from 'types';
import { CodeEditor as GrafanaCodeEditor, Monaco, MonacoEditor, useStyles2 } from '@grafana/ui';
import { StandardEditorContext, type GrafanaTheme2 } from '@grafana/data';
import { HeightControllerBar } from './HeightControllerBar';
import { css } from '@emotion/css';
import { CONTAINER_DEFAULT_HEIGHT, CONTAINER_MIN_HEIGHT, EDITOR_BORDER_SIZE, EDITOR_HEIGHT_OFFSET } from './constants';
import { declarationPaths } from './declarationPaths';

interface Props {
  settings?: CodeEditorOptionSettings;
  value: string | undefined;
  context: StandardEditorContext<OptionsInterface, any>;
  onChange: (value: string) => void;
}

function useSizeController(containerRef: RefObject<HTMLDivElement>, editor: MonacoEditor | undefined) {
  const [containerSize, setContainerSize] = useState<{ height: number; width: number }>();
  const [editorSize, setEditorSize] = useState<{ height: number; width: number }>();

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length !== 1) {
        return;
      }
      const entry = entries[0];

      const editorHeight = entry.contentRect.height - EDITOR_HEIGHT_OFFSET;
      const editorWidth = entry.contentRect.width - EDITOR_BORDER_SIZE;

      setContainerSize({ height: entry.contentRect.height, width: entry.contentRect.width });
      setEditorSize({ height: editorHeight, width: editorWidth });

      if (editor) {
        editor.layout({ height: editorHeight, width: editorWidth });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, editor]);

  return { containerSize, editorSize };
}

function useTypeDeclarationUpdater(
  monaco: Monaco | undefined,
  htmlGraphicsDeclarationState: CodeEditorOptionSettings['htmlGraphicsDeclarationState'] | undefined,
  codeData: string | undefined
) {
  useEffect(() => {
    if (!monaco || !htmlGraphicsDeclarationState?.enabled) {
      return;
    }

    if (htmlGraphicsDeclarationState.declarationsLoaded) {
      // onInit and onRender would normally both load the declarations,
      // but this makes only one of them load the declarations
      return;
    } else {
      htmlGraphicsDeclarationState.declarationsLoaded = true;
    }

    // Only load declarations that are not already loaded
    const loadedDeclarations = Object.keys(monaco.languages.typescript.javascriptDefaults.getExtraLibs());
    const unloadedDeclarationPaths = declarationPaths.filter(
      ({ declarationImportPath }) => !loadedDeclarations.includes(declarationImportPath)
    );

    Promise.all(
      unloadedDeclarationPaths.map(({ declarationFilePath, declarationImportPath }) =>
        fetch(declarationFilePath)
          .then((response) => response.text())
          .then((declarationContent) => ({ declarationContent, declarationImportPath }))
      )
    ).then((declarationPaths) => {
      const extraLibs = monaco.languages.typescript.javascriptDefaults.getExtraLibs();
      for (const { declarationContent, declarationImportPath } of declarationPaths) {
        if (declarationImportPath in extraLibs) {
          // Don't add a declaration if it already exists
          // Makes it so customProperties isn't overwritten :D
          continue;
        }
        monaco.languages.typescript.javascriptDefaults.addExtraLib(declarationContent, declarationImportPath);
      }
    });
  }, [monaco, htmlGraphicsDeclarationState]);

  useEffect(() => {
    if (!monaco || codeData === undefined || !htmlGraphicsDeclarationState?.enabled) {
      return;
    }

    if (htmlGraphicsDeclarationState.handlingCustomPropertiesUpdate) {
      return;
    } else {
      htmlGraphicsDeclarationState.handlingCustomPropertiesUpdate = true;
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

    const content = createCustomPropertiesType(codeData);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(content, 'customProperties.d.ts');
    return () => {
      if (!htmlGraphicsDeclarationState) {
        return;
      }
      htmlGraphicsDeclarationState.handlingCustomPropertiesUpdate = false;
    };
  }, [monaco, htmlGraphicsDeclarationState, codeData]);
}

export const CodeEditor: FC<Props> = ({ settings, value, context, onChange }) => {
  const styles = useStyles2(getStyles);

  const [monaco, setMonaco] = useState<Monaco>();
  const [editor, setEditor] = useState<MonacoEditor>();

  const containerRef = useRef<HTMLDivElement>(null);

  const { containerSize, editorSize } = useSizeController(containerRef, editor);
  useTypeDeclarationUpdater(monaco, settings?.htmlGraphicsDeclarationState, context.options?.codeData);

  const editorDidMount = async (e: MonacoEditor, m: Monaco) => {
    e.layout();
    setMonaco(m);
    setEditor(e);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        height: `${CONTAINER_DEFAULT_HEIGHT}px`,
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
      <HeightControllerBar
        containerRef={containerRef}
        editorHeight={editorSize && editorSize.height}
        containerHeight={containerSize && containerSize.height}
      />
    </div>
  );
};

function getStyles(_theme: GrafanaTheme2) {
  return {
    container: css`
      resize: vertical;
      overflow: hidden;
      min-height: ${CONTAINER_MIN_HEIGHT}px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
  };
}
