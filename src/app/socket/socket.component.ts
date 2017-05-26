import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService }       from './chat.service';

@Component({
  moduleId: module.id,
  selector: 'chat',
  templateUrl: './socket.component.html',
  providers: [ChatService]
})

export class SocketComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  
  constructor(private chatService:ChatService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}