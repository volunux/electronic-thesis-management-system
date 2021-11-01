


let numberField = document.querySelector('input[name=telephone]');
let textField = document.querySelector('input[name=text]');
let button = document.querySelector('input[type=button]');
let msg = document.querySelector('.response');


textField.addEventListener('keyup', function(e) {
  if ((e.keyCode || e.charCode) === 13) send();
}, false); // when a user presses a Return key

button.addEventListener('click', send, false); // when a user click the "Send" button


function send() {
  var number = numberField.value.replace(/\D/g,''); // Remove all non-numeric chars
  var text = textField.value;
  // ... will send the form using fetch here


fetch('/', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({number: number, text: text})
})
.then(function(res){ console.log(res) })
.catch(function(error){ console.log(error)});

var socket = io();
socket.on('smsStatus', function(data) {
  displayStatus('Message ID ' + data.id + ' successfully sent to ' + data.number);
});

}


Notification.requestPermission().then(function(status) {
  console.log(status); // when a user granted, status == 'granted', otherwise, 'denied'
});


function displayStatus(message) {
   var notification = new Notification('Nexmo', {
     body: message,
     icon: 'images/icon-nexmo.png'
   });
 }