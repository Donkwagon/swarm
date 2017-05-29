import { Injectable } from '@angular/core';

import { Log }                from '../classes/log';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class LogService {
    private url = 'http://localhost:8080';  
    private socket;
    private logsUrl = '/queen/log';
    public logs: Subject<Log>;

    constructor() {}
  
    getLogs(){
        this.socket.emit('logs');    
    }
    
    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('log', (data) => {
                observer.next(data);    
            });
            return () => {this.socket.disconnect(); };  
        })     
        return observable;
    }  

}