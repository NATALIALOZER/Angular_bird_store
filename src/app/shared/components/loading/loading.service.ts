import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, asyncScheduler } from 'rxjs';
import { finalize, observeOn } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/ban-types
type LoadingContext = object;
type LoaderId = string|number; // expected enum values
const DEFAULT_LOADER_ID: LoaderId = '_DEFAULT';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  protected loadingStates = new WeakMap<LoadingContext, Map<LoaderId, boolean>>();
  protected loadingStates$ = new WeakMap<LoadingContext, Map<LoaderId, BehaviorSubject<boolean>>>();

  constructor(protected zoneRef: NgZone) {}

  public doLoading<V>(
    source$: Observable<V>,
    context: LoadingContext,
    loaderId?: LoaderId
  ): Observable<V> {
    this.startLoading(context, loaderId);

    return source$.pipe(
      observeOn(asyncScheduler),
      finalize(() => this.endLoading(context, loaderId)),
    );
  }

  public isLoading(context: LoadingContext, loaderId?: LoaderId): boolean {
    const loaderStates = this.loadingStates.get(context);

    if (!loaderStates) {
      return false;
    }
    else {
      if (loaderId !== undefined) {
        return !!loaderStates.get(this.getLoaderId(loaderId));
      }
      else {
        return [...loaderStates.values()].filter(state => state).length > 0;
      }
    }
  }

  // To be used in html templates with async pipes.
  public isLoading$(context: LoadingContext, loaderId?: LoaderId): Observable<boolean> {
    const coalescedLoaderId = this.getLoaderId(loaderId);

    if (loaderId && !this.hasLoadingStates(context, coalescedLoaderId)) {
      this.setLoadingState(context, false, loaderId);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.loadingStates$.get(context).get(coalescedLoaderId);
  }

  startLoading(context: LoadingContext, loaderId?: LoaderId): void {
    this.setLoadingState(context, true, this.getLoaderId(loaderId));
  }

  endLoading(context: LoadingContext, loaderId?: LoaderId): void {
    this.setLoadingState(context, false, this.getLoaderId(loaderId));
  }

  // To be called by middleware code (HTTP interceptors/routing listeners, etc.).
  clearLoadings(): void {
    this.loadingStates = new WeakMap<LoadingContext, Map<LoaderId, boolean>>();
    this.loadingStates$ = new WeakMap<LoadingContext, Map<LoaderId, BehaviorSubject<boolean>>>();
  }

  protected setLoadingState(context: LoadingContext, state: boolean, loaderId: LoaderId): void {
    if (!this.hasLoadingStates(context, loaderId)) {
      if (this.hasContextLoadingState(context)) {
        this.loadingStates.get(context)?.set(loaderId, state);
        this.loadingStates$.get(context)?.set(
          loaderId, new BehaviorSubject<boolean>(state)
        );
      }
      else {
        this.loadingStates.set(context, new Map<LoaderId, boolean>([
          [loaderId, state]
        ]));
        this.loadingStates$.set(context, new Map<LoaderId, BehaviorSubject<boolean>>([
          [loaderId, new BehaviorSubject<boolean>(state)]
        ]));
      }
    }
    else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - loadingStates[context] is surely defined in this branch
      this.loadingStates.get(context).set(loaderId, state);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - loadingStates[context] is surely defined in this branch
      this.loadingStates$.get(context).get(loaderId).next(state);
    }
  }

  protected hasLoadingStates(context: LoadingContext, loaderId: LoaderId)
    : boolean | undefined {
    return this.hasContextLoadingState(context) && this.hasLoaderLoadingState(context, loaderId);
  }

  protected hasContextLoadingState(context: LoadingContext): boolean {
    return this.loadingStates.has(context) && this.loadingStates$.has(context);
  }

  protected hasLoaderLoadingState(context: LoadingContext, loaderId: LoaderId)
    : boolean | undefined {
    return this.loadingStates.get(context)?.has(loaderId)
      && this.loadingStates$.get(context)?.has(loaderId);
  }

  protected getLoaderId(loaderId?: LoaderId): LoaderId {
    return loaderId ? loaderId : DEFAULT_LOADER_ID;
  }
}
