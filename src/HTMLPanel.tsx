import React, { PureComponent } from 'react';
import {
  FieldDisplay,
  fieldReducers,
  getFieldDisplayValues,
  GetFieldDisplayValuesOptions,
  PanelProps,
} from '@grafana/data';
import { config, getTemplateSrv, getLocationSrv, locationService } from '@grafana/runtime';
import { OptionsInterface, CalcsMutation, ErrorObj, HTMLNodeElement } from 'types';
import 'fonts.scss';
import { parseJSON } from 'utils/parseJSON';
import _ from 'lodash';
import { Errors } from 'components/Errors';
import { addShadowRoot } from 'utils/addShadowRoot';
import { triggerPanelupdate } from 'utils/events/panelupdate';
import { triggerPanelwillunmount } from 'utils/events/panelwillunmount';
import { addHtml } from 'utils/addHtml';
import { CustomScrollbar } from '@grafana/ui';

interface Props extends PanelProps<OptionsInterface> {}
interface PanelState {
  shadowContainerRef: React.RefObject<HTMLDivElement>;
  errors: { [key: string]: string };
  options: OptionsInterface;
}

interface PopulatedGetFieldDisplayValuesOptions {
  series?: GetFieldDisplayValuesOptions['data'];
  reduceOptions?: GetFieldDisplayValuesOptions['reduceOptions'];
  fieldConfig?: GetFieldDisplayValuesOptions['fieldConfig'];
  replaceVariables?: GetFieldDisplayValuesOptions['replaceVariables'];
  sparkline?: GetFieldDisplayValuesOptions['sparkline'];
  theme?: GetFieldDisplayValuesOptions['theme'];
  timeZone?: GetFieldDisplayValuesOptions['timeZone'];
}

export class HTMLPanel extends PureComponent<Props, PanelState> {
  state: PanelState = {
    shadowContainerRef: React.createRef<HTMLDivElement>(),
    errors: {},
    options: { ...this.props.options },
  };

  errors: PanelState['errors'] = {};
  defaultErrorMessage = 'Check console for more info (ctrl+shift+j)';
  data = this.props.data; // Used for dynamic data
  dynamicProps = this.props; // Used for dynamic props
  fieldDisplayValues: FieldDisplay[] = [];
  panelSize = { height: this.props.height, width: this.props.width };
  shadowElt: HTMLDivElement | null = null;
  htmlGraphics: ReturnType<typeof this.getHtmlGraphics> | null = null;

  getHtmlGraphics({ dynamicData = false, dynamicFieldDisplayValues = false, dynamicProps = false } = {}) {
    const data = dynamicData ? this.data : { ...this.props.data };
    const props = dynamicProps ? this.dynamicProps : { ...this.props };
    const fieldDisplayValues = dynamicFieldDisplayValues ? this.fieldDisplayValues : { ...this.fieldDisplayValues };
    const htmlNode = this.state.shadowContainerRef.current?.firstElementChild?.shadowRoot as HTMLNodeElement;
    const codeData = this.getCodeData();
    const { options, width, height } = this.props;
    // eslint-disable-next-line deprecation/deprecation
    const { theme, theme2 } = config;

    return {
      htmlNode,
      data,
      customProperties: codeData,
      codeData,
      options,
      theme,
      theme2,
      getTemplateSrv,
      getLocationSrv,
      locationService,
      props,
      width,
      height,
      getFieldDisplayValues: this.populatedGetFieldDisplayValues,
      fieldDisplayValues,
      fieldReducers,
    };
  }

  populatedGetFieldDisplayValues = ({
    series = this.props.data.series,
    fieldConfig = this.props.fieldConfig,
    reduceOptions = this.props.options.reduceOptions,
    replaceVariables = this.props.replaceVariables,
    theme = config.theme2,
    sparkline,
    timeZone,
  }: PopulatedGetFieldDisplayValuesOptions = {}) =>
    getFieldDisplayValues({
      data: series,
      fieldConfig,
      reduceOptions,
      replaceVariables,
      theme,
      sparkline,
      timeZone,
    });

  onInitOnResize() {
    if (
      this.props.options.onInitOnResize &&
      !(this.panelSize.height === this.props.height && this.panelSize.width === this.props.width)
    ) {
      this.onInit();

      this.panelSize.height = this.props.height;
      this.panelSize.width = this.props.width;
    }
  }

  updateFieldDisplayValues = () => {
    const { calcsMutation } = this.props.options;

    if (calcsMutation !== CalcsMutation.None) {
      this.fieldDisplayValues.splice(0, this.fieldDisplayValues.length);
      this.fieldDisplayValues.push(...this.populatedGetFieldDisplayValues());
    } else {
      this.fieldDisplayValues.splice(0, this.fieldDisplayValues.length);
    }
  };

  updateDynamicReferences = () => {
    const { dynamicData, dynamicFieldDisplayValues, dynamicProps, dynamicHtmlGraphics } = this.props.options;

    // Update this.data with the new data
    if (dynamicData) {
      Object.assign(this.data, this.props.data);
    }

    if (dynamicProps) {
      Object.assign(this.dynamicProps, this.props);
    }

    if (dynamicHtmlGraphics && this.htmlGraphics) {
      Object.assign(this.htmlGraphics, this.getHtmlGraphics({ dynamicData, dynamicFieldDisplayValues, dynamicProps }));
    }
  };

  getCodeData() {
    const {
      json: codeData,
      isError,
      error,
    } = parseJSON(this.props.options.codeData, {
      namespace: 'codeData',
    });

    this.updateError({
      scope: 'codeData',
      isError,
      error,
    });

    return codeData ?? {};
  }

  executeScript(
    script: string,
    { dynamicData = false, dynamicFieldDisplayValues = false, dynamicProps = false, dynamicHtmlGraphics = false } = {}
  ) {
    const rawHtmlGraphics = this.getHtmlGraphics({ dynamicData, dynamicFieldDisplayValues, dynamicProps });
    const { htmlNode, data, codeData, options, theme } = rawHtmlGraphics;

    if (dynamicHtmlGraphics) {
      this.htmlGraphics = rawHtmlGraphics;
    }

    const htmlGraphics = dynamicHtmlGraphics ? this.htmlGraphics : rawHtmlGraphics;

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
    // eslint-disable-next-line deprecation/deprecation
    F(htmlNode, data, codeData, codeData, options, theme, getTemplateSrv, getLocationSrv, htmlGraphics);
  }

  onRender() {
    const errorObj: ErrorObj = {
      scope: 'onRender',
      isError: false,
    };

    const { onRender } = this.props.options;

    if (onRender) {
      try {
        this.executeScript(onRender);
      } catch (e) {
        errorObj.isError = true;
        errorObj.error = e;
        console.error(`onRender:`, e);
      }
    }

    this.updateError(errorObj);
  }

  onInit() {
    const errorObj: ErrorObj = {
      scope: 'onInit',
      isError: false,
    };

    const { onInit, dynamicData, dynamicFieldDisplayValues, dynamicProps, dynamicHtmlGraphics } = this.props.options;

    if (onInit) {
      try {
        this.executeScript(onInit, { dynamicData, dynamicFieldDisplayValues, dynamicProps, dynamicHtmlGraphics });
      } catch (e) {
        errorObj.isError = true;
        errorObj.error = e;
        console.error(`onInit:`, e);
      }
    }

    this.updateError(errorObj);
  }

  initialize() {
    this.shadowElt = addShadowRoot(this.state.shadowContainerRef.current, {
      centerAlignContent: this.props.options.centerAlignContent,
    });

    this.updateError(addHtml(this.state.shadowContainerRef.current, this.props.options));
    this.onInit();
  }

  componentDidMount() {
    this.updateFieldDisplayValues();
    this.initialize();

    if (this.props.options.renderOnMount) {
      this.onRender();
    }

    if (this.props.options.panelupdateOnMount) {
      triggerPanelupdate(this.shadowElt);
    }

    if (!_.isEqual(this.state.errors, this.errors)) {
      this.setState({ errors: { ...this.errors } });
    }
  }

  componentDidUpdate() {
    this.updateFieldDisplayValues();
    this.updateDynamicReferences();

    const isChanged = !_.isEqual(this.state.options, this.props.options);

    if (isChanged) {
      this.initialize();
      this.setState({ options: { ...this.props.options } });
    } else {
      this.onInitOnResize();
      triggerPanelupdate(this.shadowElt);
      this.onRender();

      if (!_.isEqual(this.state.errors, this.errors)) {
        this.setState({ errors: { ...this.errors } });
      }
    }
  }

  componentWillUnmount() {
    triggerPanelwillunmount(this.shadowElt);
  }

  updateError({ scope, isError, error }: ErrorObj) {
    if (!isError && this.state.errors[scope]) {
      delete this.errors[scope];
    } else {
      const errorMessage = error instanceof Error ? error.message : this.defaultErrorMessage;
      if (isError && this.errors[scope] !== errorMessage) {
        this.errors = { ...this.errors, [scope]: errorMessage };
      }
    }
  }

  render() {
    const {
      width,
      height,
      options: { useGrafanaScrollbar, overflow },
    } = this.props;

    return (
      <>
        <div style={{ position: 'absolute', width: `${width}px`, height: `${height}px` }}>
          {useGrafanaScrollbar && overflow === 'visible' ? (
            <CustomScrollbar autoHeightMin={'100%'}>
              <div ref={this.state.shadowContainerRef} />
            </CustomScrollbar>
          ) : (
            <div ref={this.state.shadowContainerRef} />
          )}
        </div>
        <Errors errors={this.state.errors} />
      </>
    );
  }
}
