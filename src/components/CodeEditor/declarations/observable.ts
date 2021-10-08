export default `
interface UnaryFunction<T, R> {
  (source: T): R;
}
interface OperatorFunction<T, R> extends UnaryFunction<Observable<T>, Observable<R>> {
}

interface PromiseLike<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}

declare type PromiseConstructorLike = new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;

interface Unsubscribable {
  unsubscribe(): void;
}

declare type TeardownLogic = Unsubscribable | Function | void;

interface NextObserver<T> {
  closed?: boolean;
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}
interface ErrorObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error: (err: any) => void;
  complete?: () => void;
}
interface CompletionObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
}
declare type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;

interface Subscribable<T> {
  subscribe(observer?: PartialObserver<T>): Unsubscribable;
  /** @deprecated Use an observer instead of a complete callback */
  subscribe(next: null | undefined, error: null | undefined, complete: () => void): Unsubscribable;
  /** @deprecated Use an observer instead of an error callback */
  subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): Unsubscribable;
  /** @deprecated Use an observer instead of a complete callback */
  subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Unsubscribable;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
}

declare class Observable<T> implements Subscribable<T> {
  /** Internal implementation detail, do not use directly. */
  _isScalar: boolean;
  /** @deprecated This is an internal implementation detail, do not use. */
  source: Observable<any>;
  /** @deprecated This is an internal implementation detail, do not use. */
  operator: Operator<any, T>;
  /**
   * @constructor
   * @param {Function} subscribe the function that is called when the Observable is
   * initially subscribed to. This function is given a Subscriber, to which new values
   * can be \`next\`ed, or an \`error\` method can be called to raise an error, or
   * \`complete\` can be called to notify of a successful completion.
   */
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic);
  /**
   * Creates a new cold Observable by calling the Observable constructor
   * @static true
   * @owner Observable
   * @method create
   * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
   * @return {Observable} a new cold observable
   * @nocollapse
   * @deprecated use new Observable() instead
   */
  static create: Function;
  /**
   * Creates a new Observable, with this Observable as the source, and the passed
   * operator defined as the new observable's operator.
   * @method lift
   * @param {Operator} operator the operator defining the operation to take on the observable
   * @return {Observable} a new observable with the Operator applied
   */
  lift<R>(operator: Operator<T, R>): Observable<R>;
  subscribe(observer?: PartialObserver<T>): Subscription;
  /** @deprecated Use an observer instead of a complete callback */
  subscribe(next: null | undefined, error: null | undefined, complete: () => void): Subscription;
  /** @deprecated Use an observer instead of an error callback */
  subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): Subscription;
  /** @deprecated Use an observer instead of a complete callback */
  subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Subscription;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
  /** @deprecated This is an internal implementation detail, do not use. */
  _trySubscribe(sink: Subscriber<T>): TeardownLogic;
  /**
   * @method forEach
   * @param {Function} next a handler for each value emitted by the observable
   * @param {PromiseConstructor} [promiseCtor] a constructor function used to instantiate the Promise
   * @return {Promise} a promise that either resolves on observable completion or
   *  rejects with the handled error
   */
  forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void>;
  /** @internal This is an internal implementation detail, do not use. */
  _subscribe(subscriber: Subscriber<any>): TeardownLogic;
  /**
   * @nocollapse
   * @deprecated In favor of iif creation function: import { iif } from 'rxjs';
   */
  static if: typeof iif;
  /**
   * @nocollapse
   * @deprecated In favor of throwError creation function: import { throwError } from 'rxjs';
   */
  static throw: typeof throwError;
  pipe(): Observable<T>;
  pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
  pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
  pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
  pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
  pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
  pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>;
  pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): Observable<H>;
  pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): Observable<I>;
  pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): Observable<{}>;
  toPromise<T>(this: Observable<T>): Promise<T>;
  toPromise<T>(this: Observable<T>, PromiseCtor: typeof Promise): Promise<T>;
  toPromise<T>(this: Observable<T>, PromiseCtor: PromiseConstructorLike): Promise<T>;
}
`;
