//const { response } = require("express");
const chatMessage=document.getElementById('chatMessage');
function  joinedNotification(userName)
{
    chatMessage.innerHTML+=`<p><b>${userName} Joined</b></p>`
}
function showMessage(message,userName)
{
    chatMessage.innerHTML+=`<p>${userName}: ${message}`
}
document.getElementsByClassName('btn')[0].addEventListener('click',()=>{
    let token=localStorage.getItem('token')
    let chatMessage=document.getElementById('chatMessageInput').value;
    let Obj={
        chatMessage
    }
    axios.post('http://localhost:3000/sendMessage',Obj, { headers: { 'Authorization': token } })
    .then(result=>{
        let userName=result.data.user.name;
        showMessage(chatMessage,userName);
    })
    .catch(err=>{
        console.log('sendMessage is not working');
    })
})
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/getAllMessage').then(response=>{
        let message=response.data.result;
        message.forEach(element => {
            console.log(element);
           if(element.messageText=='JOINED'){
            joinedNotification(element.name)
                }
               
             //   joinedNotification(element.name)
               
                else
                showMessage(element.messageText,element.name)
        });
    })
    .catch(err=>{
        console.log(err);
        console.log('get all message error');
    })
})