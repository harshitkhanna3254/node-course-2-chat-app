var socket = io(); //we are making a req from client to server to open up a web socket and keep it open.
        
        socket.on('connect', () => {
                console.log("Connected to server");

                // socket.emit('createMessage',{

                //     from: 'jenny',
                //     text: "ssup nigga? ... via createMessage"
                // })
        });
        
        //Down below is a stupid way I tried. I made 2 different socket.on() while I already had a newMessage() listener. Could've made the event as 'newMessage' only
        // socket.on('selfjoining', () => {
        //     console.log("Welcome to the Chat App,  User");
        // })

        // socket.on('otherjoining', () => {
        //     console.log("Other user has joined the chat app.")
        // })

        socket.on('disconnect' , () => {
            console.log("Disconnected from server");
        })

        socket.on('newMessage', (message) => {
            console.log("New Message received from server. The details are : \n", message) //this is the object and will contain the data send from server side and we are sending it as second arguement. 
        })

        socket.emit('createMessage', {
            from: 'createMessage User',
            text: "To Everyone!"
        })
        