import codeData from './codeData';
import customProperties from './customProperties';
import data from './data';
import dataFrame from './dataFrame';
import dataQuery from './dataQuery';
import dataQueryRequest from './dataQueryRequest';
import eventBus from './eventBus';
import fieldColor from './fieldColor';
import fieldReducers from './fieldReducers';
import getFieldDisplayValues from './getFieldDisplayValues';
import getLocationSrv from './getLocationSrv';
import getTemplateSrv from './getTemplateSrv';
import htmlGraphics from './htmlGraphics';
import htmlNode from './htmlNode';
import observable from './observable';
import options from './options';
import panelProps from './panelProps';
import scopedVars from './scopedVars';
import subscription from './subscription';
import theme from './theme';
import theme2 from './theme2';
import thresholds from './thresholds';
import timeRanges from './timeRanges';
import timezone from './timezone';
import valueMapping from './valueMapping';

export default codeData +
  customProperties +
  data +
  dataFrame +
  dataQuery +
  dataQueryRequest +
  eventBus +
  fieldColor +
  fieldReducers +
  getFieldDisplayValues +
  getLocationSrv +
  getTemplateSrv +
  htmlNode +
  observable +
  options +
  panelProps +
  scopedVars +
  subscription +
  theme +
  theme2 +
  thresholds +
  timeRanges +
  timezone +
  valueMapping +
  htmlGraphics;
