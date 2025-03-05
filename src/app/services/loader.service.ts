import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  public set isLoading$(value: boolean) {
    this.isLoading.next(value);
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
