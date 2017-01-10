var socket = io.connect('http://192.168.1.251:6677',{'forceNew':true});

socket.on('messages', function(data){
   console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(mensaje, index){
        return (`
            <div class="message">
                <strong>${mensaje.nickname}</strong> dice:
                <p>${mensaje.text}</p>
            </div>
        `)
    }).join(' ');
    
    var divi = document.getElementById('mensajes');
    divi.innerHTML=html;
    divi.scrollTop=divi.scrollHeight;
    document.getElementById('msg').value='';
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('msg').value       
    };
    document.getElementById('nickname').style.display='none';
    socket.emit('add-message', message);
    return false;
}