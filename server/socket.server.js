//一.设置Socket.IO服务器
var socketio = require('socket.io');
var io;

//require models
var Author =     require('./swarm/keepers/model/author.model');
var Article =    require('./swarm/keepers/model/article.model');
var Backlog =    require('./swarm/keepers/model/backlog.model');
var Entrance =   require('./swarm/keepers/model/entrance.model');
var Log =        require('./swarm/keepers/model/log.model');

exports.listen = (server) => {
    
    io = socketio.listen(server);
    io.set('log level',1);
    
    io.sockets.on('connection',function(socket){
        console.log("a new user connection!");
        
        socket.on('add-message', (message) => {
            console.log(message);
        });
        
        socket.on('add-log', (log) => {
            console.log(log);
        });
        
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        
        socket.on('add-message', (message) => {
            io.emit('message', {
                type:'new-message',
                text: message
            });    
        });
  
    });

    return io;
}