import React, { Component } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { CodeEditor as GrafanaCodeEditor, Monaco } from '@grafana/ui';
import declarations from './declarations';

interface Props {
  language: EditorLanguageType;
  value: string | undefined;
  onChange: (value?: string) => void;
}

interface State {
  editor?: editor.IStandaloneCodeEditor;
}

export class CodeEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  editorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    if (this.props.language === 'javascript') {
      // Add autocompletion for panel definitions (htmlNode, codeData, data, options, ETC)
      monaco.languages.typescript.javascriptDefaults.addExtraLib(declarations, 'HtmlGraphics/HtmlGraphics.d.ts');
    }

    this.setState({ editor });
  };

  saveEditorValue = (value: string) => {
    this.props.onChange(value);
  };

  render = () => {
    return (
      <GrafanaCodeEditor
        height={'33vh'}
        value={this.props.value ?? ''}
        language={this.props.language ?? ''}
        showLineNumbers={true}
        onEditorDidMount={this.editorDidMount}
        onSave={this.saveEditorValue}
        onBlur={this.saveEditorValue}
        monacoOptions={{ contextmenu: true }}
      />
    );
  };
}
