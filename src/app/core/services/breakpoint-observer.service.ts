import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

const QUERY: Map<string, string> = new Map([
  ['xs', '(min-width: 0px)'],
  ['sm', '(min-width: 576px)'],
  ['md', '(min-width: 768px)'],
  ['lg', '(min-width: 992px)'],
  ['xl', '(min-width: 1200px)'],
]);

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {
  private _size$: Observable<string>;

  constructor() {
    this._size$ = fromEvent(window, 'resize')
      .pipe(
        startWith(this._getScreenSize()),
        map((event: Event) => {
          return this._getScreenSize();
        }),
        distinctUntilChanged(),
        shareReplay(1)
      )
  }

  public get size$(): Observable<string> {
    return this._size$;
  }

  private _getScreenSize(): string {
    const [[newSize = 'never']] = Array.from(QUERY.entries())
      .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    return newSize;
  }

  public isBiggerThanOrEqual(querySize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): Observable<boolean> {
    const [[newSize = 'never']] = Array.from(QUERY.entries())
    .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);

    return new Observable((observer) => {
      const newSizeIndex = Array.from(QUERY.keys()).indexOf(newSize);
      const sizeIndex = Array.from(QUERY.keys()).indexOf(querySize);
      observer.next(newSizeIndex >= sizeIndex);
      observer.complete();
    });
  }

  public isSmallerThanOrEqual(querySize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): Observable<boolean> {
    const [[newSize = 'never']] = Array.from(QUERY.entries())
    .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);

    return new Observable((observer) => {
      const newSizeIndex = Array.from(QUERY.keys()).indexOf(newSize);
      const sizeIndex = Array.from(QUERY.keys()).indexOf(querySize);
      observer.next(newSizeIndex <= sizeIndex);
      observer.complete();
    });
  }
}
