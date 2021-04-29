
function showMessage(message, currentUser){


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const today = new Date();
const day = today.getDay()
const dd = today.getDate();
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
const date = daysOfWeek[day] + " " + mm + '/' + dd + '/' + yyyy;
const time = today.toLocaleTimeString('en-US')
const name = document.getElementById('user');
const ul = document.getElementById('messages');
const li = document.createElement("LI");
const dateSpan = document.createElement("span");
const timeSpan = document.createElement("span");
const nameSpan = document.createElement("span")
const messageSpan = document.createElement("span")
const dateTextNode = document.createTextNode(date);
const timeTextNode = document.createTextNode(time);
const nameTextNode = document.createTextNode(message.fromName);
const messageTextNode = document.createTextNode(message.msg);
dateSpan.appendChild(dateTextNode);
timeSpan.appendChild(timeTextNode);
nameSpan.appendChild(nameTextNode)
messageSpan.appendChild(messageTextNode);

let author = ''
if (message.to === currentUser){
  author = 'other'
} else {
  author = 'self'
}
console.log(currentUser, author, message.to);

li.appendChild(dateSpan);
li.appendChild(timeSpan);
li.appendChild(nameSpan);
li.appendChild(messageSpan);
ul.appendChild(li)
li.classList.add('message', author);
nameSpan.classList.add('chatterName');

}
