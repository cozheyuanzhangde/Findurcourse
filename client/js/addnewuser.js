const userEmailInput = document.getElementById("useremail");
const userPwdInput = document.getElementById("userpassword");
const userPwdConfInput = document.getElementById("confirm-userpassword");
const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");

document.getElementById("emailalert").style.visibility = "hidden";
document.getElementById("pwdalert").style.visibility = "hidden";
document.getElementById("confpwdalert").style.visibility = "hidden";
document.getElementById("submit").disabled = true;

let valid1, valid2, valid3 = false;

/*function focusMethod1() {           
  document.getElementById("useremail").focus();
}

function focusMethod2() {           
  document.getElementById("userpassword").focus();
}

function focusMethod3() {           
  document.getElementById("confirm-userpassword").focus();
}

userEmailInput.addEventListener(onclick, focusMethod1);
userPwdInput.addEventListener(onclick, focusMethod2);
userPwdConfInput.addEventListener(onclick, focusMethod3);*/

// When the user clicks on the password field, show the message box
userPwdInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
userPwdInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};

userEmailInput.onkeyup = function() {
  const mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(userEmailInput.value.match(mailformat)){
    userEmailInput.classList.remove("btn-outline-danger");
    userEmailInput.classList.add("btn-outline-success");
    document.getElementById("emailalert").style.visibility = "hidden";
    valid1 = true;
  }else{
    userEmailInput.classList.add("btn-outline-danger");
    userEmailInput.classList.remove("btn-outline-success");
    document.getElementById("emailalert").style.visibility = "visible";
    valid1 = false;
  }
  if((valid1 === true)&&((valid2 === true))&&((valid3 === true))){
    document.getElementById("submit").disabled = false;
  }else{
    document.getElementById("submit").disabled = true;
  }
};

// When the user starts to type something inside the password field
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
    valid2 = true;
  }else{
    userPwdInput.classList.add("btn-outline-danger");
    userPwdInput.classList.remove("btn-outline-success");
    document.getElementById("pwdalert").style.visibility = "visible";
    valid2 = false;
  }
  
  if(userPwdConfInput.value === userPwdInput.value){
    userPwdConfInput.classList.remove("btn-outline-danger");
    userPwdConfInput.classList.add("btn-outline-success");
    document.getElementById("confpwdalert").style.visibility = "hidden";
    valid3 = true;
  }else{
    userPwdConfInput.classList.add("btn-outline-danger");
    userPwdConfInput.classList.remove("btn-outline-success");
    document.getElementById("confpwdalert").style.visibility = "visible";
    valid3 = false;
  }
  if((valid1 === true)&&((valid2 === true))&&((valid3 === true))){
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
    valid3 = true;
  }else{
    userPwdConfInput.classList.add("btn-outline-danger");
    userPwdConfInput.classList.remove("btn-outline-success");
    document.getElementById("confpwdalert").style.visibility = "visible";
    valid3 = false;
  }
  if((valid1 === true)&&((valid2 === true))&&((valid3 === true))){
    document.getElementById("submit").disabled = false;
  }else{
    document.getElementById("submit").disabled = true;
  }
};

