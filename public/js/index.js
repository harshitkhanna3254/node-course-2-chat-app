var socket = io(); //we are making a req from client to server to open up a web socket and keep it open.
        
        socket.on('connect', () => {
                console.log("Connected to server");

                // socket.emit('createMessage',{

                //     from: 'jenny',
                //     text: "ssup nigga? ... via createMessage"
                // })
        });

        socket.on('disconnect' , () => {
            console.log("Disconnected from server");
        })


        socket.on('newMessage', (message) => {
            console.log("New Message received from server. The details are : ", message) //this is the object and will contain the data send from server side and we are sending it as second arguement. 
        })

        // socket.on('', () => {

        // })

        