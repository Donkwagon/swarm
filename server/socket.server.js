
var socketio = require('socket.io');
var io;

//require models
var Author =     require('./swarm/keepers/models/author.model');
var Article =    require('./swarm/keepers/models/article.model');
var Backlog =    require('./swarm/keepers/models/backlog.model');
var Entrance =   require('./swarm/keepers/models/entrance.model');
var Log =        require('./swarm/keepers/models/log.model');

exports.listen = (server) => {
    
    io = socketio.listen(server);
    io.set('log level',1);
    
    io.sockets.on('connection',function(socket){
        console.log("a new user connection!");
        
        socket.on('add-message', (message) => {
            console.log(message);
        });
        
        socket.on('logs', () => {
            console.log("on logs");
            var currentTime = new Date();
            //var stream = Log.find({gte:currentTime}).cursor();
            var stream = Log.find().cursor();
            len = 0;

            stream.on('data', function (log) {
                console.log(len++);
                io.emit("log",log);
            })
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