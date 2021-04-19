const socket = io();

const message = document.getElementById('message'),
      user = document.getElementById('user'),
      output = document.getElementById('output'),
      button = document.getElementById('sendMessage')

      button.addEventListener('click', () => {
        console.log('hello');
        socket.emit('userMessage', {
          user: user.value,
          message: message.value
        })
      })


      socket.on('userMessage', data => {
        output.innerHTML += '<p> <strong>' + data.user + ': </strong>' + data.message + '</p>'
      })
// const sendMessageButton = document.getElementById('sendMessage');
// sendMessageButton.addEventListener('click', function(e) {
//   e.preventDefault(); // prevents page reloading
//   const messageElement = document.getElementById('message');
//   const msg = {
//     msg: messageElement.value,
//     to: "<%= therapistId %>",
//     from: "<%= user._id %>"
//   }
//   console.log("Trying to send Message", msg)
//   socket.emit('chat message', JSON.stringify(msg));
//   fetch('/clientMessage', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'clientId': "<%= user._id %>",
//       'therapistId': "<%= therapistId %>",
//       'message': messageElement.value
//     })
//   })
//   messageElement.value = '';
  // .then(response => {
  //   if (response.ok) return response.json()
  // })
  // .then(data => {
  //   console.log(data)
  // })
//   return false;
// });
// socket.on('chat message', function(msg) {
//   const jsonMsg = JSON.parse(msg)
//   if (jsonMsg.to === "<%= user._id %>" || jsonMsg.from === "<%= user._id %>") {
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//     const today = new Date();
//     const day = today.getDay()
//     const dd = today.getDate();
//     const mm = today.getMonth() + 1;
//     const yyyy = today.getFullYear();
//     const date = daysOfWeek[day] + " " + mm + '/' + dd + '/' + yyyy;
//     const time = today.toLocaleTimeString('en-US')
//     const ul = document.getElementById('messages');
//     const li = document.createElement("LI");
//     const dateSpan = document.createElement("span");
//     const timeSpan = document.createElement("span");
//     const messageSpan = document.createElement("span")
//     const dateTextNode = document.createTextNode(date);
//     const timeTextNode = document.createTextNode(time);
//     const messageTextNode = document.createTextNode(jsonMsg.msg);
//     dateSpan.appendChild(dateTextNode);
//     timeSpan.appendChild(timeTextNode);
//     messageSpan.appendChild(messageTextNode);
//     dateSpan.classList.add("<%= profiletype%>")
//     timeSpan.classList.add("<%= profiletype%>")
//     messageSpan.classList.add("<%= profiletype%>")
//     li.appendChild(dateSpan);
//     li.appendChild(timeSpan);
//     li.appendChild(messageSpan);
//     ul.appendChild(li)
//     li.classList.add('message');
//   }
// });
