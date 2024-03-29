import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketService {
  private socket;

  sendMessage(message){
    this.socket.emit('logs', message);
  }

  getMessages() {

    let observable = new Observable(observer => {

      this.socket = io();

      this.socket.on('message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };

    })
    
    return observable;
  }
}