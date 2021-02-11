export default `
/**
 * Type to represent the value of a single query variable.
 *
 * @public
 */
declare type UrlQueryValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | undefined
  | null;
/**
 * Type to represent the values parsed from the query string.
 *
 * @public
 */
declare type UrlQueryMap = Record<string, UrlQueryValue>;

interface LocationUpdate {
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
 */
interface LocationSrv {
  update(options: LocationUpdate): void;
}

/**
 * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
 * the user to a new place in Grafana.
 *
 * @public
 */
declare function getLocationSrv(): LocationSrv;
`;
