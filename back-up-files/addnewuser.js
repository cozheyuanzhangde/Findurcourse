
let useremail = '';
document.getElementById('useremail').addEventListener('change',()=>{
  useremail = document.getElementById('useremail').value;
});

let userpassword = '';
document.getElementById('userpassword').addEventListener('change',()=>{
    userpassword = document.getElementById('userpassword').value;
});

async function postAddNewUser(url = '', useremail, userpassword) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "application/json"
      }, 
      body: JSON.stringify({ "email": useremail, "password": userpassword, "username": "Anonymous",  "schoolname": "", "gender": "", "major": ""})
    });
}

function focusMethodE() {           
  document.getElementById("useremail").focus();
}

function focusMethodP() {           
  document.getElementById("userpassword").focus();
}

function focusMethodP2() {           
  document.getElementById("confirm-userpassword").focus();
}

const myInput = document.getElementById("userpassword");
const conf = document.getElementById("confirm-userpassword");
const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");
const e = document.getElementById("useremail");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};
// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate letters
  const letters = /[a-zA-Z]/g;
  if(myInput.value.match(letters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate numbers
  const numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 6) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};
e.onkeyup = function(){
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(e.value.match(mailformat)){
    e.classList.remove("wrong");
  }else{
    if(!e.classList.contains("wrong")){
      e.classList.add("wrong");
    }
  }
};
conf.onkeyup = function() {
  if(conf.value.match(myInput.value)){
    conf.classList.remove("wrong");
  }else{
    if(!conf.classList.contains("wrong")){
      conf.classList.add("wrong");
    }
  }
};

/*document.getElementById('submit').addEventListener('click',()=>{
    if(useremail === ''){
      alert("Sorry, you should enter email, please try again!");
    }
    else if(userpassword === ''){
      alert("Sorry, you should enter password, please try again!");
    }
    else if(document.getElementById("confirm-userpassword").value === ''){
      alert("Sorry, you should confirm password, please try again!");
    }
    else if(document.getElementById("confirm-userpassword").value !== userpassword){
      alert("Sorry, you confirm password is not match with password, please try again!");
    }
    else{
      postAddNewUser('/addnewuser', useremail, userpassword);
      alert("Successful! You become a member of FindUrCourse Club!");
      window.location.href = "./index.html";
    }
});*/