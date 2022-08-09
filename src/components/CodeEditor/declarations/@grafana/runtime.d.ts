import { VariableModel, ScopedVars, TimeRange, UrlQueryMap } from './data';
import * as H from 'history';

/**
 * @public
 * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
 */
export interface LocationUpdate {
  /**
   * Target path where you automatically wants to navigate the user.
   */
  path?: string;
  /**
   * Specify this value if you want to add values to the query string of the URL.
   */
  query?: UrlQueryMap;
  /**
   * If set to true, the query argument will be added to the existing URL.
   */
  partial?: boolean;
  /**
   * Used internally to sync the Redux state from Angular to make sure that the Redux location
   * state is in sync when navigating using the Angular router.
   *
   * @remarks
   * Do not change this unless you are the Angular router.
   *
   * @internal
   */
  routeParams?: UrlQueryMap;
  replace?: boolean;
}
/**
 * If you need to automatically navigate the user to a new place in the application this should
 * be done via the LocationSrv and it will make sure to update the application state accordingly.
 *
 * @public
 * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
 */
export interface LocationSrv {
  update(options: LocationUpdate): void;
}
/**
 * Used during startup by Grafana to set the LocationSrv so it is available
 * via the {@link getLocationSrv} to the rest of the application.
 *
 * @internal
 */
export declare function setLocationSrv(instance: LocationSrv): void;
/**
 * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
 * the user to a new place in Grafana.
 *
 * @public
 * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
 */
export declare function getLocationSrv(): LocationSrv;

/**
 * Via the TemplateSrv consumers get access to all the available template variables
 * that can be used within the current active dashboard.
 *
 * For a more in-depth description visit: https://grafana.com/docs/grafana/latest/reference/templating
 * @public
 */
export interface TemplateSrv {
  /**
   * List the dashboard variables
   */
  getVariables(): VariableModel[];
  /**
   * Replace the values within the target string.  See also {@link InterpolateFunction}
   */
  replace(target?: string, scopedVars?: ScopedVars, format?: string | Function): string;
  /**
   * Checks if a target contains template variables.
   */
  containsTemplate(target?: string): boolean;
  /**
   * Update the current time range to be used when interpolating __from / __to variables.
   */
  updateTimeRange(timeRange: TimeRange): void;
}
/**
 * Used during startup by Grafana to set the TemplateSrv so it is available
 * via the {@link getTemplateSrv} to the rest of the application.
 *
 * @internal
 */
export declare const setTemplateSrv: (instance: TemplateSrv) => void;
/**
 * Used to retrieve the {@link TemplateSrv} that can be used to fetch available
 * template variables.
 *
 * @public
 */
export declare const getTemplateSrv: () => TemplateSrv;

/**
 * @public
 * A wrapper to help work with browser location and history
 */
export interface LocationService {
  partial: (query: Record<string, any>, replace?: boolean) => void;
  push: (location: H.Path | H.LocationDescriptor<any>) => void;
  replace: (location: H.Path | H.LocationDescriptor<any>) => void;
  reload: () => void;
  getLocation: () => H.Location;
  getHistory: () => H.History;
  getSearch: () => URLSearchParams;
  getSearchObject: () => UrlQueryMap;
  /**
   * This is from the old LocationSrv interface
   * @deprecated use partial, push or replace instead */
  update: (update: LocationUpdate) => void;
}
