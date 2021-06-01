import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stats-viewer',
  templateUrl: './stats-viewer.component.html',
  styleUrls: ['./stats-viewer.component.scss'],
})
export class StatsViewerComponent {
  private privateChat: Message[] = [];

  constructor() {}

  get chat(): Message[] {
    return this.privateChat;
  }

  @Input() set chat(value: Message[]) {
    this.privateChat = value;
    console.log(this.privateChat);
    // TODO: Call methods to calculate statistics
    this.countMessagesByEmitter();
  }

  countMessagesByEmitter(): void {
    const emissorList: string[] = [];
    this.chat.forEach((message) => {
      if (!emissorList.includes(message.name)) {
        emissorList.push(message.name);
      }
    });
    console.log(emissorList);
  }
}
