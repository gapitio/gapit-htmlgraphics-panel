import React, { Component } from 'react';
import MonacoEditor, { BeforeMount, loader, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { config } from '@grafana/runtime';
import textEditorDeclarations from './declarations';

// Load the monaco files locally
// https://github.com/suren-atoyan/monaco-react#loader-config
loader.config({
  paths: {
    vs: '/public/plugins/gapit-htmlgraphics-panel/lib/vs',
  },
});

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

  componentDidUpdate() {
    this.state.editor?.layout();
  }

  editorWillMount: BeforeMount = (monaco) => {
    if (this.props.language == 'javascript') {
      // Add autocompletion for panel definitions (htmlNode, codeData, data, options, and theme)
      monaco.languages.typescript.javascriptDefaults.addExtraLib(textEditorDeclarations);
    }
  };

  editorOnMount: OnMount = (editor, monaco) => {
    // Save editor value when CTRL+S are pressed inside the editor
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.saveEditorValue();
    });

    this.setState({
      editor: editor,
    });
  };

  saveEditorValue = () => {
    if (this.state.editor) {
      this.props.onChange(this.state.editor.getValue());
    }
  };

  render = () => {
    return (
      <div onBlur={this.saveEditorValue}>
        <MonacoEditor
          height={'33vh'}
          language={this.props.language}
          theme={config.theme.isDark ? 'vs-dark' : 'vs-light'}
          value={this.props.value}
          beforeMount={this.editorWillMount}
          onMount={this.editorOnMount}
          options={{ fontSize: 12 }}
        />
      </div>
    );
  };
}
