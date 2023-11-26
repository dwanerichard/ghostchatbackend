const express = require('express');
const {Server} = require('socket.io');
const cors = require('cors');
const app = express();

const PORT = 5000;


app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.write("Hello");
    res.end();
});

app.post('/message',(req,res)=>{
    let newMessage = req.body.message;
    io.emit('updateChat',{newMessage:newMessage});
    res.send({status:"success"}).status(200).end();
})

const server = app.listen(PORT,()=>{
    console.log("listening on port",PORT);
});

const io = new Server(server,{
    cors:{
        origin:['https://ghostchat.ccbp.tech']
    }
});

io.on('connection',(socket)=>{
    console.log("new user enterd into the chat");

    socket.on('sendToFriends',(data)=>{
        io.emit('updateChat',{newMessage:data.message});
    });
});

io.on('disconnect',(socket)=>{
    console.log("user exited from chat");
});



io.emit('updateChat',{newMessage:"Hello Welcome to the Ghost chat"});




