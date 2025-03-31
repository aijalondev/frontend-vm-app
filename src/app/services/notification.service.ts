// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this._notifications.asObservable();

  showSuccess(message: string): void {
    this._notifications.next([...this._notifications.value, { message, type: 'success' }]);
    this.clearMessageAfterDelay();
  }

  showError(message: string): void {
    this._notifications.next([...this._notifications.value, { message, type: 'error' }]);
    this.clearMessageAfterDelay();
  }

  clear(): void {
    this._notifications.next([]);
  }

  private clearMessageAfterDelay(): void {
    setTimeout(() => {
      // Remove the first notification
      this._notifications.next(this._notifications.value.slice(1));
    }, 3000);
  }
}