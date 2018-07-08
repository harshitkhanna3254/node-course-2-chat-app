var socket = io(); //we are making a req from client to server to open up a web socket and keep it open.
        
        socket.on('connect', () => {
                console.log("Connected to server");
        });

        socket.on('disconnect' , () => {
            console.log("Disconnected from server");
        })

        socket.on('newMessage', (message) => {

            var formattedTime = moment(message.createdAt).format('h:mm A');

            var template = jQuery('#message-template').html();
            var html = Mustache.render(template,{
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });

            jQuery('#message-list').append(html)
        });


        socket.on('newLocationMessage', (message) => {
    
            var formattedTime = moment(message.createdAt).format('h:mm A');
            var template = jQuery('#location-message-template').html();
            var html = Mustache.render(template,{
                    from: message.from,
                    url: message.url,
                    createdAt: formattedTime
            })
            jQuery('#message-list').append(html);
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