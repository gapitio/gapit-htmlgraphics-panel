import React, { Component } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorLanguageType } from 'types';
import { CodeEditor } from '@grafana/ui';

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
        />
      </div>
    );
  };
}
