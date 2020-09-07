import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { config } from '@grafana/runtime';
import { Alert } from '@grafana/ui';
import { OptionsInterface, EditorCodeType } from './types';
import { SVGBaseFix } from 'polyfill';
import 'fonts.scss';

interface Props extends PanelProps<OptionsInterface> {}
interface PanelState {
  css: EditorCodeType;
  html: EditorCodeType;
  onRender: EditorCodeType;
  onInit: EditorCodeType;
  codeData: EditorCodeType;
  shadowContainerRef: React.RefObject<HTMLDivElement>;
  htmlNode: ShadowRoot | null;
  htmlErrorStatus: boolean;
  onInitErrorStatus: boolean;
  onRenderErrorStatus: boolean;
  codeDataErrorStatus: boolean;
  options: OptionsInterface;
}

export class HTMLPanel extends PureComponent<Props, PanelState> {
  state: PanelState = {
    css: this.props.options.css,
    html: this.props.options.html,
    onRender: this.props.options.onRender,
    onInit: this.props.options.onInit,
    codeData: this.props.options.codeData,
    shadowContainerRef: React.createRef<HTMLDivElement>(),
    htmlNode: null,
    htmlErrorStatus: false,
    onInitErrorStatus: false,
    onRenderErrorStatus: false,
    codeDataErrorStatus: false,
    options: this.props.options,
  };

  getCodeData() {
    let codeDataParsed = {};
    let isError = false;

    if (this.props.options.codeData) {
      try {
        codeDataParsed = JSON.parse(this.props.options.codeData);
      } catch (e) {
        isError = true;
        console.error(`codeData:`, e);
      }
    }

    if (this.state.codeDataErrorStatus !== isError) {
      this.setState({ codeDataErrorStatus: isError });
    }

    return codeDataParsed;
  }

  setHTML() {
    const htmlNode = this.state.shadowContainerRef.current?.shadowRoot;
    let isError = false;

    if (htmlNode && this.props.options.html) {
      try {
        // Create a new variable to not mutate/override the current html code
        let htmlCode = this.props.options.html;
        let CSSCode = this.props.options.css;

        if (this.props.options.SVGBaseFix) {
          // Fix references to inline SVG elements when the <base> tag is in use.
          htmlCode = SVGBaseFix(htmlCode);
        }

        htmlNode.innerHTML = `<style>${CSSCode}</style>${htmlCode}`;

        if (this.props.options.add100Percentage) {
          htmlNode.children[1].setAttribute('height', '100%');
          htmlNode.children[1].setAttribute('width', '100%');
        }
      } catch (e) {
        isError = true;
        console.error(`htmlNode:`, e);
      }
    }

    if (this.state.htmlErrorStatus !== isError) {
      this.setState({ htmlErrorStatus: isError });
    }
  }

  executeScript(script: string) {
    const F = new Function('htmlNode', 'data', 'codeData', 'options', 'theme', script);
    F(
      this.state.shadowContainerRef.current?.shadowRoot,
      this.props.data,
      this.getCodeData(),
      this.props.options,
      config.theme
    );
  }

  onRender() {
    let isError = false;

    if (this.props.options.onRender) {
      try {
        this.executeScript(this.props.options.onRender);
      } catch (e) {
        isError = true;
        console.error(`onRender:`, e);
      }
    }

    if (this.state.onRenderErrorStatus !== isError) {
      this.setState({ onRenderErrorStatus: isError });
    }
  }

  onInit() {
    let isError = false;

    if (this.props.options.onInit) {
      try {
        this.executeScript(this.props.options.onInit);
      } catch (e) {
        isError = true;
        console.error(`onInit:`, e);
      }
    }

    if (this.state.onInitErrorStatus !== isError) {
      this.setState({ onInitErrorStatus: isError });
    }
  }

  initialize() {
    this.setHTML();
    this.onInit();
  }

  addShadowRoot() {
    const shadowContainerElt = this.state.shadowContainerRef.current;

    if (shadowContainerElt) {
      shadowContainerElt.attachShadow({ mode: 'open' });
      this.setState({ htmlNode: shadowContainerElt.shadowRoot });
    }
  }

  componentDidMount() {
    this.addShadowRoot();
    this.initialize();
  }

  /*
    Shallow compares obj1 and obj2 and returns true if they are equal
  */
  compareShallow(obj1: { [key: string]: any }, obj2: { [key: string]: any }) {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  componentDidUpdate() {
    const HAS_CHANGED = !this.compareShallow(this.state.options, this.props.options);

    if (HAS_CHANGED) {
      this.initialize();
      this.setState({
        options: this.props.options,
      });
    } else {
      this.onRender();
    }
  }

  Error = () => (
    <div>
      {this.state.onRenderErrorStatus ? (
        <Alert title={'Error executing onRender'}>Check the console for further information</Alert>
      ) : null}
      {this.state.onInitErrorStatus ? (
        <Alert title={'Error executing onInit'}>Check the console for further information</Alert>
      ) : null}
      {this.state.codeDataErrorStatus ? (
        <Alert title={'Error parsing codeData'}>Check the console for further information</Alert>
      ) : null}
      {this.state.htmlErrorStatus ? (
        <Alert title={'Error parsing html'}>Check the console for further information</Alert>
      ) : null}
    </div>
  );

  shadowContainerStyle = () => {
    const style: React.CSSProperties = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      position: 'absolute',
    };

    if (this.props.options.centerAlignContent) {
      style.display = 'flex';
      style.justifyContent = 'center';
      style.alignItems = 'center';
    }

    return style;
  };

  render() {
    return (
      <>
        <div ref={this.state.shadowContainerRef} style={this.shadowContainerStyle()}></div>
        <this.Error />
      </>
    );
  }
}
