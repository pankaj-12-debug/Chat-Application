//let chatMessage=document.getElementById("chatMessage").innerHTML+='<p>pp</p>'
const chatMessage=document.getElementById('chatMessage');
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