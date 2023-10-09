import { interval, Observable, of, startWith, switchMap } from "rxjs";

export class TimeService {
  private currentPosition: number = ((this.getTimeInMinutes() * 2) + 5); // +5 for the padding

  private getTimeInMinutes(): number {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    return (hours * 60) + minutes;
  }

  // emit line position in px every minute
  public getLinePosition():Observable<number> {
    return interval(60000)
        .pipe(
            startWith(0),
            switchMap(() => of(this.currentPosition += 1)) // +1 px every minute
        )
  }
}
