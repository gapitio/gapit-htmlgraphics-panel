import React, { Component } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { CodeEditor, Monaco } from '@grafana/ui';
import textEditorDeclarations from './declarations';

interface Props {
  language: EditorLanguageType;
  value: string | undefined;
  onChange: (value?: string) => void;
}

interface State {
  editor?: editor.IStandaloneCodeEditor;
}

export class TextEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  editorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    if (this.props.language === 'javascript') {
      // Add autocompletion for panel definitions (htmlNode, codeData, data, options, and theme)
      monaco.languages.typescript.javascriptDefaults.addExtraLib(textEditorDeclarations);
    }

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.saveEditorValue();
    });

    this.setState({ editor });
  };

  componentDidUpdate() {
    this.state.editor?.layout();
  }

  saveEditorValue = () => {
    if (this.state.editor) {
      this.props.onChange(this.state.editor.getValue());
    }
  };

  render = () => {
    return (
      <div onBlur={this.saveEditorValue}>
        <CodeEditor
          height={'33vh'}
          value={this.props.value ?? ''}
          language={this.props.language ?? ''}
          showLineNumbers={true}
          onEditorDidMount={this.editorDidMount}
        />
      </div>
    );
  };
}
