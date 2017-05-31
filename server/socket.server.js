
var socketio = require('socket.io');
var io;

//require models
var Author =     require('./swarm/keepers/models/author.model');
var Article =    require('./swarm/keepers/models/article.model');
var Backlog =    require('./swarm/keepers/models/backlog.model');
var Entrance =   require('./swarm/keepers/models/entrance.model');
var Log =        require('./swarm/keepers/models/log.model');

exports.listen = function(server) {

    var collection = db.collection("logs");
    
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
            console.log("COLLECTION------------------");
            console.log(collection);
            collection.find({}, {'tailable': 1, 'sort': [['$natural', 1]]}, function(err, cursor) {
                cursor.intervalEach(300, function(err, item) {
                    console.log(item);
                    if(item != null) {
                        console.log(item);
                        socket.emit('all', item);
                    }
                });
            });
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