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

        socket.on('newLocationMessage', (message) => {

            var li = jQuery('<li></li>');
            var a = jQuery('<a target="_blank">My current location</a>')

            li.text(`${message.from} : `)
            a.attr('href', message.url)

            li.append(a);
            jQuery('#message-list').append(li);
        });      



        jQuery('#message-form').on('submit', (e) => {
            e.preventDefault(); // we have prevented default behaviour with this

            var messageTextBox = jQuery('[name=message');

            socket.emit('createMessage', {
                from: 'User',
                text: messageTextBox.val()
            }, () => {
                    messageTextBox.val('')
            })
        });

        var locationButton = jQuery('#location');
        locationButton.on('click',() => {
            if(!navigator.geolocation){
                return alert("Geolocation not supported by your browser")
            }
            
            locationButton.attr('disabled','disabled').text('Sending...');

            navigator.geolocation.getCurrentPosition((position)=> {

                locationButton.removeAttr('disabled').text('Send Location');

                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, () => {
                locationButton.removeAttr('disabled').text('Send Location');
                alert("Unable to fetch the location")
            })

        })