import React, { PureComponent } from 'react';
import {
  FieldDisplay,
  fieldReducers,
  getFieldDisplayValues,
  GetFieldDisplayValuesOptions,
  PanelProps,
} from '@grafana/data';
import { config, getTemplateSrv, getLocationSrv } from '@grafana/runtime';
import { OptionsInterface, CalcsMutation, ErrorObj, HTMLNodeElement } from 'types';
import 'fonts.scss';
import { parseJSON } from 'utils/parseJSON';
import _ from 'lodash';
import { Errors } from 'components/Errors';
import { addShadowRoot } from 'utils/addShadowRoot';
import { triggerPanelupdate } from 'utils/events/panelupdate';
import { triggerPanelwillunmount } from 'utils/events/panelwillunmount';
import { addHtml } from 'utils/addHtml';

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
  htmlGraphics = this.getHtmlGraphics();
  fieldDisplayValues: FieldDisplay[] = [];
  panelSize = { height: this.props.height, width: this.props.width };
  shadowElt: HTMLDivElement | null = null;

  calcGroups = {
    [CalcsMutation.All]: fieldReducers.list().map(({ id }) => id),
    [CalcsMutation.Standard]: fieldReducers
      .list()
      .filter(({ standard }) => standard)
      .map(({ id }) => id),
  };

  getHtmlGraphics() {
    const htmlNode = this.state.shadowContainerRef.current?.firstElementChild?.shadowRoot as HTMLNodeElement;
    const codeData = this.getCodeData();
    const { data, options, width, height } = this.props;
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
      props: this.props,
      width,
      height,
      getFieldDisplayValues: this.populatedGetFieldDisplayValues,
      fieldDisplayValues: this.fieldDisplayValues,
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
    const { calcsMutation, reduceOptions } = this.props.options;

    if (calcsMutation !== CalcsMutation.None) {
      if (calcsMutation !== CalcsMutation.Custom) {
        reduceOptions.calcs = this.calcGroups[calcsMutation];
      }
      this.fieldDisplayValues.splice(0, this.fieldDisplayValues.length);
      this.fieldDisplayValues.push(...this.populatedGetFieldDisplayValues());
    } else {
      this.fieldDisplayValues.splice(0, this.fieldDisplayValues.length);
    }
  };

  updateDynamicReferences = () => {
    // Update this.data with the new data
    if (this.props.options.dynamicData) {
      Object.assign(this.data, this.props.data);
    }

    if (this.props.options.dynamicProps) {
      Object.assign(this.dynamicProps, this.props);
    }

    if (this.props.options.dynamicHtmlGraphics) {
      Object.assign(this.htmlGraphics, this.getHtmlGraphics());
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
    const data = dynamicData ? this.data : this.props.data;
    const props = dynamicProps ? this.dynamicProps : this.props;
    const fieldDisplayValues = dynamicFieldDisplayValues ? this.fieldDisplayValues : _.clone(this.fieldDisplayValues);
    const codeData = this.getCodeData();

    const htmlNode = this.state.shadowContainerRef.current?.firstElementChild?.shadowRoot as HTMLNodeElement;
    const { options } = this.props;
    const { theme, theme2 } = config;

    const htmlGraphics = dynamicHtmlGraphics
      ? this.htmlGraphics
      : {
          htmlNode,
          data,
          customProperties: codeData,
          codeData,
          options,
          theme,
          theme2,
          getTemplateSrv,
          getLocationSrv,
          props,
          // width and height will not be dynamic even if dynamicProps is true since they are assigned to the value
          width: props.width,
          height: props.height,
          getFieldDisplayValues: this.populatedGetFieldDisplayValues,
          fieldDisplayValues,
          fieldReducers,
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
    this.updateFieldDisplayValues();
    this.shadowElt = addShadowRoot(this.state.shadowContainerRef.current, {
      centerAlignContent: this.props.options.centerAlignContent,
    });

    this.updateError(addHtml(this.state.shadowContainerRef.current, this.props.options));
    this.onInit();
  }

  componentDidMount() {
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
    this.updateDynamicReferences();

    const isChanged = !_.isEqual(this.state.options, this.props.options);

    this.onInitOnResize();

    if (isChanged) {
      this.initialize();
      this.setState({ options: { ...this.props.options } });
    } else {
      this.updateFieldDisplayValues();
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
    return (
      <>
        <div
          ref={this.state.shadowContainerRef}
          style={{
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            position: 'absolute',
          }}
        ></div>
        <Errors errors={this.state.errors} />
      </>
    );
  }
}
