document.getElementById("pwdalert").style.visibility = "hidden";
document.getElementById("confpwdalert").style.visibility = "hidden";
const userPwdInput = document.getElementById("userpasswordchanged");
const userPwdConfInput = document.getElementById("confirm-userpassword");
const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");

document.getElementById("pwdinput").style.visibility = "hidden";
document.getElementById("pwdconf").style.visibility = "hidden";

// When the user clicks on the password field, show the message box
userPwdInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
userPwdInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};

async function updateUserInfo(url = '', userid, useremail, userpassword, username, userschoolname, usergender, usermajor) {
  await fetch(url, {
    method: 'POST',  
    headers: {
      'Content-Type': "application/json"
    }, 
    body: JSON.stringify({ "userid": userid, "email": useremail, "password": userpassword, "username": username,  "schoolname": userschoolname, "gender": usergender, "major": usermajor})
  });
}

async function updateUserInfoNoPWDChange(url = '', userid, useremail, username, userschoolname, usergender, usermajor) {
  await fetch(url, {
    method: 'POST',  
    headers: {
      'Content-Type': "application/json"
    }, 
    body: JSON.stringify({ "userid": userid, "email": useremail, "username": username,  "schoolname": userschoolname, "gender": usergender, "major": usermajor})
  });
}

window.addEventListener("load", async function (){

  let thissession;
  let sessionEmail;

  try{
    const res_session = await fetch(`/getsession`,{
      method: "GET"
    });
    if (!res_session.ok) {
      console.log(res_session.error);
      return;
    }else{
      thissession = await res_session.json();
      sessionEmail = thissession.passport.user;
    }
    let valid1, valid2 = false;
  
    let useremail = '';
    const res_user = await fetch(`/loaduserinfobyemail?email=${sessionEmail}`,{
        method: "GET"
    });
    if (!res_user.ok) {
        console.log(res_user.error);
        return;
    }
    const user = await res_user.json();
    const userid = user[0].userid;
    document.getElementById('useremail').value = user[0].email;
    useremail = document.getElementById('useremail').value;
    document.getElementById("useremail").readOnly = true;
    document.getElementById('username').value = user[0].username;
    document.getElementById('userschoolname').value = user[0].schoolname;
    document.getElementById('usergender').value = user[0].gender;
    document.getElementById('usermajor').value = user[0].major;
    let userpassword = document.getElementById('userpasswordchanged').value;
    document.getElementById('userpasswordchanged').addEventListener('change',()=>{
        userpassword = document.getElementById('userpasswordchanged').value;
    });

    let username = document.getElementById('username').value;
    document.getElementById('username').addEventListener('change',()=>{
        username = document.getElementById('username').value;
    });

    let userschoolname = document.getElementById('userschoolname').value;
    document.getElementById('userschoolname').addEventListener('change',()=>{
        userschoolname = document.getElementById('userschoolname').value;
    });

    let usergender = document.getElementById('usergender').value;
    document.getElementById('usergender').addEventListener('change',()=>{
        usergender = document.getElementById('usergender').value;
    });

    let usermajor = document.getElementById('usermajor').value;
    document.getElementById('usermajor').addEventListener('change',()=>{
        usermajor = document.getElementById('usermajor').value;
    });

    document.getElementById('pwdinputshow').addEventListener('click',()=>{
      document.getElementById("pwdinput").style.visibility = "visible";
      document.getElementById("pwdconf").style.visibility = "visible";
      userPwdInput.onkeyup = function() {
        let check1,check2,check3 = false;
        // Validate letters
        const letters = /[a-zA-Z]/g;
        if(userPwdInput.value.match(letters)) {  
          letter.classList.remove("invalid");
          letter.classList.add("valid");
          check1 = true;
        } else {
          letter.classList.remove("valid");
          letter.classList.add("invalid");
          check1 = false;
        }
      
        // Validate numbers
        const numbers = /[0-9]/g;
        if(userPwdInput.value.match(numbers)) {  
          number.classList.remove("invalid");
          number.classList.add("valid");
          check2 = true;
        } else {
          number.classList.remove("valid");
          number.classList.add("invalid");
          check2 = false;
        }
        
        // Validate length
        if(userPwdInput.value.length >= 6) {
          length.classList.remove("invalid");
          length.classList.add("valid");
          check3 = true;
        } else {
          length.classList.remove("valid");
          length.classList.add("invalid");
          check3 = false;
        }
        if((check1 === true)&&((check2 === true))&&((check3 === true))){
          userPwdInput.classList.remove("btn-outline-danger");
          userPwdInput.classList.add("btn-outline-success");
          document.getElementById("pwdalert").style.visibility = "hidden";
          valid1 = true;
        }else{
          userPwdInput.classList.add("btn-outline-danger");
          userPwdInput.classList.remove("btn-outline-success");
          document.getElementById("pwdalert").style.visibility = "visible";
          valid1 = false;
        }
  
        if(userPwdConfInput.value === userPwdInput.value){
          userPwdConfInput.classList.remove("btn-outline-danger");
          userPwdConfInput.classList.add("btn-outline-success");
          document.getElementById("confpwdalert").style.visibility = "hidden";
          valid2 = true;
        }else{
          userPwdConfInput.classList.add("btn-outline-danger");
          userPwdConfInput.classList.remove("btn-outline-success");
          document.getElementById("confpwdalert").style.visibility = "visible";
          valid2 = false;
        }
  
        if((userPwdInput.value.length === 0)&&(userPwdConfInput.value.length === 0)){
          document.getElementById("submit").disabled = false;
        }else if((valid1 === true)&&(valid2 === true)){
          document.getElementById("submit").disabled = false;
        }else{
          document.getElementById("submit").disabled = true;
        }
      };
  
      userPwdConfInput.onkeyup = function() {
        if(userPwdConfInput.value === userPwdInput.value){
          userPwdConfInput.classList.remove("btn-outline-danger");
          userPwdConfInput.classList.add("btn-outline-success");
          document.getElementById("confpwdalert").style.visibility = "hidden";
          valid2 = true;
        }else{
          userPwdConfInput.classList.add("btn-outline-danger");
          userPwdConfInput.classList.remove("btn-outline-success");
          document.getElementById("confpwdalert").style.visibility = "visible";
          valid2 = false;
        }
  
        if((userPwdInput.value.length === 0)&&(userPwdConfInput.value.length === 0)){
          document.getElementById("submit").disabled = false;
        }else if((valid1 === true)&&(valid2 === true)){
          document.getElementById("submit").disabled = false;
        }else{
          document.getElementById("submit").disabled = true;
        }
      };
    });
    document.getElementById('submit').addEventListener('click',()=>{
      if (userpassword === ""){
        updateUserInfoNoPWDChange('/updateuserinfonopwdchange', userid, useremail, username, userschoolname, usergender, usermajor);
        alert("You have successfully updated your user profile!");
        location.reload();
      }else{
        updateUserInfo('/updateuserinfo', userid, useremail, userpassword, username, userschoolname, usergender, usermajor);
        alert("You have successfully updated your user profile with Password Change! You will be logged out!");
        window.location.href = '/logout';
      }
    });
  }catch(error){
    alert("Please Login first and then access User Profile!");
    window.location.href="./login.html";
  }
  });