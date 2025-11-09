import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertServices {
  private messageSource = new BehaviorSubject<{ text: string; type: string } | null>(null);
  message$ = this.messageSource.asObservable();

  showMessage(text: string, type: string) {
    this.messageSource.next({ text, type });
    setTimeout(() => this.clearMessage(), 2000);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
