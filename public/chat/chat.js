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
      //  let userName=result.data.user.name;
        //showMessage(chatMessage,userName);
 window.location.reload()
    })
    .catch(err=>{
        console.log('sendMessage is not working');
    })
})
  //  setInterval(()=>{ 

    //axios.get('http://localhost:3000/getAllMessage').then(response=>{
      //  let message=response.data.result;
       // chatMessage.innerHTML='';
       // message.forEach(element => {
         //   console.log(element);
          // if(element.messageText=='JOINED'){
           // joinedNotification(element.name)
            //    }              
                //else
                //showMessage(element.messageText,element.name)
       // });
    //})
    //.catch(err=>{
      //  console.log(err);
       // console.log('get all message error');
    //})
//},1000);

setInterval(() => {
    let messagesObj=JSON.parse(localStorage.getItem('messagesObj'))
    let lastMessageId;
    if(messagesObj)
    {
        let lastObj=messagesObj[(messagesObj.length-1)]
      lastMessageId=lastObj.id;
    }
    else{
        lastMessageId=0;
    }
    axios.get(`http://localhost:3000/getAllMessage?lastMessageId=${lastMessageId}`)
.then(response=>{
    let message=response.data.result;
    if(!localStorage.getItem('messagesObj')){
        localStorage.setItem("messagesObj",JSON.stringify(message));
      }else{
        if(message.length>0){
         messagesObj.push(message[0]);     
         localStorage.setItem("messagesObj", JSON.stringify(messagesObj));
        }
      }
    chatMessage.innerHTML='';
    if(Array.isArray(messagesObj)){
        messagesObj.forEach((element) => {
          if (element.messageText == "JOINED") {
            joinedNotification(element.name);
          } else showMessage(element.messageText, element.name);
        });
      }
     })
     .catch((err) => {
       console.log(err);
     });
//})
}, 1000);