import { Component } from '@angular/core';
import { Message } from './interfaces/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public chat: Message[] = [];

  constructor() {}

  onChatLoaded(event: Message[]): void {
    this.chat = event;
  }
}
