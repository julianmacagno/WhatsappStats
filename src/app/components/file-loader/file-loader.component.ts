import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../../interfaces/message';
import { log } from 'ng-zorro-antd/core/logger';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss'],
})
export class FileLoaderComponent implements OnInit {
  constructor() {}

  file: Blob = new Blob();
  @Output() chat: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  private messageArray: Message[] = [];

  ngOnInit(): void {}

  fileChanged(e: any): void {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        const chatArray: string[] = fileReader.result.toString().split('\n');
        chatArray.shift();

        const regex = new RegExp(/[0-9]+\/[0-9]+\/[0-9]+ [0-9]+:[0-9]+/);

        chatArray.forEach((line) => {
          // Solucion temporal al mal parseo del array. Si la linea obtenida no empieza con una fecha (de ahí la regex)
          // no lo agrega al array de Mensajes. PERO se debería mejorar el parseo del array para separar bien cada mensaje
          // y no solo separar por \n
          if (regex.test(line)) {
            this.messageArray.push({
              date: line.slice(0, line.indexOf('-') - 1),
              name: line.slice(
                line.indexOf('-') + 2,
                line.indexOf(':', line.indexOf(':') + 1)
              ),
              message: line.slice(line.indexOf(':', line.indexOf(':') + 1) + 2),
            });
          }
        });
        this.chat.emit(this.messageArray);
      }
    };
    fileReader.readAsText(this.file);
  }
}
