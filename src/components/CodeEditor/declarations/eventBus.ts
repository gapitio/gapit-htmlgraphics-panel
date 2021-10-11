export default `
interface EventFilterOptions {
  onlyLocal: boolean;
}

interface BusEventHandler<T extends BusEvent> {
  (event: T): void;
}

interface BusEventType<T extends BusEvent> {
  type: string;
  new (...args: any[]): T;
}

interface BusEvent {
  readonly type: string;
  readonly payload?: any;
  readonly origin?: EventBus;
}

interface EventBus {
  /**
   * Publish single vent
   */
  publish<T extends BusEvent>(event: T): void;
  /**
   * Get observable of events
   */
  getStream<T extends BusEvent>(eventType: BusEventType<T>): Observable<T>;
  /**
   * Subscribe to an event stream
   *
   * This function is a wrapper around the \`getStream(...)\` function
   */
  subscribe<T extends BusEvent>(eventType: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
  /**
   * Remove all event subscriptions
   */
  removeAllListeners(): void;
  /**
   * Returns a new bus scoped that knows where it exists in a heiarchy
   *
   * @internal -- This is included for internal use only should not be used directly
   */
  newScopedBus(key: string, filter: EventFilterOptions): EventBus;
}
`;
