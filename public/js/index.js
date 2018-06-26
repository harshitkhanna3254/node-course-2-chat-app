var socket = io(); //we are making a req from client to server to open up a web socket and keep it open.
        
        socket.on('connect', () => {
                console.log("Connected to server");
        });

        socket.on('disconnect' , () => {
            console.log("Disconnected from server");
        })

        socket.on('newMessage', (message) => {
            console.log("New Message received from server. The details are : \n", message) //this is the object and will contain the data send from server side and we are sending it as second arguement. 
            
            var li = jQuery('<li></li>');
            li.text(`${message.from} : ${message.text}`);

            jQuery('#message-list').append(li);
        })

        // socket.emit('createMessage', {
        //     from: 'Frank',
        //     text: "Hi"
        // }, (data) => {
        //     console.log("Got it.",data)
        // })
        

        jQuery('#message-form').on('submit', (e) => {
            e.preventDefault(); // we have prevented default behaviour with this

            socket.emit('createMessage', {
                from: 'User',
                text: jQuery('[name=message]').val()
            }, () => {

            })
        });