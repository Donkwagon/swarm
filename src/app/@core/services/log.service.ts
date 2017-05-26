import { Injectable } from '@angular/core';

import { Log }                from '../classes/log';
import { WebSocketService }   from './websocket.service';

import { Observable }         from 'rxjs/Observable';
import {Subject}              from 'rxjs/Subject';
import * as io                from 'socket.io-client';

@Injectable()
export class LogService {
    private logsUrl = '/queen/log';
    public logs: Subject<Log>;

    constructor(wsService: WebSocketService) {

        this.logs = <Subject<Log>> wsService.connect(this.logsUrl).map((response: MessageEvent): Log => {
            let data = JSON.parse(response.data);
            console.log(data);
            return data;
        });
        
    }

    private url = 'http://localhost:8080';  
    private socket;
    
    sendMessage(message){
        this.socket.emit('add-message', message);    
    }
    
    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
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