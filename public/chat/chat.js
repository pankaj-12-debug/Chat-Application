const chatMessage=document.getElementById('chatMessage');
const availableGroup=document.getElementById('availableGroup')
function  joinedNotification(userName)
{
    chatMessage.innerHTML+=`<p><b>${userName} Joined</b></p>`
}
function showMessage(message,userName)
{
    chatMessage.innerHTML+=`<p>${userName}: ${message}`
}
document.getElementById('addGroup').addEventListener('click',()=>{
    document.getElementById("addGroupForm").classList.toggle("hidden")
  });
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
 //window.location.reload()
    })
    .catch(err=>{
        console.log('sendMessage is not working');
    })
})
//Add group 
document.getElementById("addGroupSubmitButton").addEventListener('click',(e)=>{
    e.preventDefault();
    let token=localStorage.getItem('token')
    let groupName = document.getElementById("inputGroupName").value;
    let reqObj={
      groupName
    }
    axios.post(`http://localhost:3000/addGroup`, reqObj,{headers: {Authorization: token,}})
      .then((response) => {
        //console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log('err 44 add group line');
      });
  });

  function viewGroupInUI(obj){
    availableGroup.innerHTML += `<div><span>${obj.name}</span><button id="addUser" onclick='addUserGroup(event)'>Add User</button> <button onclick='openChat(event)'>Open Chat</button></div>`;
  }
  let groupName;
  function addUserGroup(e){
    groupName = e.target.parentNode.firstElementChild.innerText;
    console.log('54',groupName)
    document.getElementById("addUserForm").classList.toggle('hidden');
  }
  
  window.addEventListener('DOMContentLoaded',()=>{
    let token=localStorage.getItem('token')
    axios
      .get("http://localhost:3000/getAllGroup", {headers: {Authorization: token,}})
      .then((result) => {
        result.data.forEach((element) => {
          viewGroupInUI(element);
        });
      })
      .catch((err) => {
      //  console.log(err);
      });
  })
  


  function openChat(e) {
    groupName = e.target.parentNode.firstElementChild.innerText;
    document.getElementById("chatHeader").innerHTML=`<h1>${groupName}</h1>`;
  


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
    axios.get(`http://localhost:3000/getAllMessage?lastMessageId=${lastMessageId}&groupName=${groupName}`)
.then(response=>{
    let message=response.data.result;
    if (!localStorage.getItem(`${groupName}`)) {
        localStorage.setItem(`${groupName}`, JSON.stringify(message));
      } else {
        if (message.length > 0) {
          messagesObj.push(message[0]);
          localStorage.setItem(`${groupName}`, JSON.stringify(messagesObj));
        }
      }

   // if(!localStorage.getItem('messagesObj')){
     //   localStorage.setItem("messagesObj",JSON.stringify(message));
     // }else{
      //  if(message.length>0){
        // messagesObj.push(message[0]);     
        // localStorage.setItem("messagesObj", JSON.stringify(messagesObj));
       // }
     // }
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
  }
//Add User
  document.getElementById("addUserSubmitButton").addEventListener('click',()=>{
    const inputEmail = document.getElementById("inputEmail").value;
    const reqObj = {
      inputEmail,
      groupName,
    };
    console.log(reqObj);
    axios
      .post("http://localhost:3000/addUserGroup", reqObj)
      .then((result) => {
        console.log(result);
        alert(result.data.message)
      })
      .then((err) => {
        console.log(err);
      });
 });