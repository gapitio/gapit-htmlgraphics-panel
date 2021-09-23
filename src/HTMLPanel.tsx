import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { config, getTemplateSrv, getLocationSrv } from '@grafana/runtime';
import { Alert } from '@grafana/ui';
import { OptionsInterface } from 'types';
import { SVGBaseFix } from 'utils/polyfill';
import 'fonts.scss';
import { parseJSON } from 'utils/parseJSON';
import { shallowCompare } from 'utils/shallowCompare';

interface HTMLNodeElement extends ShadowRoot {
  onpanelupdate: () => void;
  onpanelwillunmount: () => void;
}

interface Props extends PanelProps<OptionsInterface> {}
interface PanelState {
  shadowContainerRef: React.RefObject<HTMLDivElement>;
  htmlErrorStatus: boolean;
  onInitErrorStatus: boolean;
  onRenderErrorStatus: boolean;
  codeDataErrorStatus: boolean;
  options: OptionsInterface;
}

export class HTMLPanel extends PureComponent<Props, PanelState> {
  state: PanelState = {
    shadowContainerRef: React.createRef<HTMLDivElement>(),
    htmlErrorStatus: false,
    onInitErrorStatus: false,
    onRenderErrorStatus: false,
    codeDataErrorStatus: false,
    options: this.props.options,
  };

  data = this.props.data; // Used for dynamic data
  panelUpdateEvent = new CustomEvent('panelupdate');
  panelWillUnmountEvent = new CustomEvent('panelwillunmount');

  getCodeData() {
    const { json: codeData, isError } = parseJSON<OptionsInterface>(this.props.options.codeData, {
      namespace: 'codeData',
    });

    if (this.state.codeDataErrorStatus !== isError) {
      this.setState({ codeDataErrorStatus: isError });
    }

    return codeData ?? {};
  }

  setHTML() {
    const shadowContainer = this.state.shadowContainerRef.current;
    const htmlNode = shadowContainer?.firstElementChild?.shadowRoot as HTMLNodeElement;
    let isError = false;

    if (shadowContainer && htmlNode) {
      try {
        htmlNode.onpanelupdate = () => {};
        htmlNode.onpanelwillunmount = () => {};
        htmlNode.dispatchEvent(this.panelUpdateEvent);

        // Create a new variable to not mutate/override the current html code
        let htmlCode = this.props.options.html;
        const CSSCode = this.props.options.css;
        const rootCSSCode = this.props.options.rootCSS;

        if (this.props.options.SVGBaseFix && htmlCode) {
          // Fix references to inline SVG elements when the <base> tag is in use.
          htmlCode = SVGBaseFix(htmlCode);
        }

        const rootCSS = document.createElement('style');
        rootCSS.textContent = rootCSSCode ?? '';
        shadowContainer.appendChild(rootCSS);

        htmlNode.innerHTML = `<style>${CSSCode ?? ''}</style>${htmlCode ? htmlCode : '<div></div>'}`;

        const htmlDocument = htmlNode.children[1] as HTMLElement | (HTMLElement & SVGElement) | undefined;

        if (this.props.options.overflow && htmlDocument) {
          htmlDocument.style.overflow = this.props.options.overflow;
        }

        if (this.props.options.add100Percentage && htmlDocument) {
          htmlDocument.setAttribute('height', '100%');
          htmlDocument.setAttribute('width', '100%');
          htmlDocument.style.height = '100%';
          htmlDocument.style.width = '100%';
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

  executeScript(script: string, dynamic = false) {
    const data = dynamic ? this.data : this.props.data;
    const codeData = this.getCodeData();

    const htmlNode = this.state.shadowContainerRef.current?.firstElementChild?.shadowRoot as HTMLNodeElement;
    const options = this.props.options;
    const theme = config.theme;

    const htmlGraphics = {
      htmlNode,
      data,
      customProperties: codeData,
      codeData,
      options,
      theme,
      getTemplateSrv,
      getLocationSrv,
      props: this.props,
      width: this.props.width,
      height: this.props.height,
    };

    const F = new Function(
      'htmlNode',
      'data',
      'customProperties',
      'codeData',
      'options',
      'theme',
      'getTemplateSrv',
      'getLocationSrv',
      'htmlGraphics',
      script
    );
    F(htmlNode, data, codeData, codeData, options, theme, getTemplateSrv, getLocationSrv, htmlGraphics);
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
        this.executeScript(this.props.options.onInit, this.props.options.dynamicData);
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
    this.addShadowRoot();
    this.setHTML();
    this.onInit();
  }

  createShadowRootElement() {
    const shadowElt = document.createElement('div');
    shadowElt.attachShadow({ mode: 'open' });

    shadowElt.style.width = `100%`;
    shadowElt.style.height = `100%`;
    shadowElt.style.position = 'absolute';

    if (this.props.options.centerAlignContent) {
      shadowElt.style.display = 'flex';
      shadowElt.style.justifyContent = 'center';
      shadowElt.style.alignItems = 'center';
    }

    return shadowElt;
  }

  addShadowRoot() {
    const shadowContainerElt = this.state.shadowContainerRef.current;

    if (shadowContainerElt) {
      while (shadowContainerElt.firstChild) {
        shadowContainerElt.firstChild.remove();
      }

      shadowContainerElt.appendChild(this.createShadowRootElement());
    }
  }

  // Update panelUpdate to notify a change has happened
  panelupdate() {
    const htmlNode = this.state.shadowContainerRef.current?.firstElementChild?.shadowRoot as HTMLNodeElement;
    if (htmlNode && htmlNode.onpanelupdate) {
      htmlNode.onpanelupdate();
      htmlNode.dispatchEvent(this.panelUpdateEvent);
    }
  }

  componentDidMount() {
    this.initialize();

    if (this.props.options.renderOnMount) {
      this.onRender();
    }

    if (this.props.options.panelupdateOnMount) {
      this.panelupdate();
    }
  }

  componentDidUpdate() {
    // Update this.data with the new data
    if (this.props.options.dynamicData) {
      Object.assign(this.data, this.props.data);
    }

    const isChanged = !shallowCompare(this.state.options, this.props.options);

    if (isChanged) {
      this.initialize();
      this.setState({
        options: this.props.options,
      });
    } else {
      this.panelupdate();
      this.onRender();
    }
  }

  componentWillUnmount() {
    const htmlNode = this.state.shadowContainerRef.current?.firstElementChild?.shadowRoot as HTMLNodeElement;
    htmlNode.onpanelwillunmount();
    htmlNode.dispatchEvent(this.panelWillUnmountEvent);
  }

  Error = () => {
    const { onRenderErrorStatus, onInitErrorStatus, codeDataErrorStatus, htmlErrorStatus } = this.state;
    return (
      <div>
        {[
          { status: onRenderErrorStatus, name: 'onRender' },
          { status: onInitErrorStatus, name: 'onInit' },
          { status: codeDataErrorStatus, name: 'codeData' },
          { status: htmlErrorStatus, name: 'html' },
        ].map((errorStatus) =>
          errorStatus.status ? (
            <Alert title={`Error executing ${errorStatus.name}`}>Check the console for further information</Alert>
          ) : null
        )}
      </div>
    );
  };

  shadowContainerStyle = () => {
    const style: React.CSSProperties = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      position: 'absolute',
    };

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
