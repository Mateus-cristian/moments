// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toastInfo = {
    message: '',
    type: '',
  };

  // Crie um BehaviorSubject para armazenar o estado do toastInfo
  private _toastInfo$ = new BehaviorSubject(this._toastInfo);

  // Exponha o BehaviorSubject como um Observable
  toastInfo$ = this._toastInfo$.asObservable();

  constructor() {}

  add(message: string, type: string) {
    this._toastInfo.message = message;
    this._toastInfo.type = type;

    // Emita o novo valor de toastInfo
    this._toastInfo$.next(this._toastInfo);

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear(): void {
    this._toastInfo.message = '';
    this._toastInfo.type = '';

    // Emita o novo valor de toastInfo
    this._toastInfo$.next(this._toastInfo);
  }
}
