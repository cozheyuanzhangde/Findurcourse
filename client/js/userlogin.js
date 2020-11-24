const alert = document.getElementById("epalert");
const submitbtn = document.getElementById("submit");
alert.style.visibility = "hidden";
submitbtn.disabled = true;
const emailInput = document.getElementById("useremail");
const pwdInput = document.getElementById("userpassword");

emailInput.onkeyup = function() {
    if ((emailInput.value.length > 0)&&(pwdInput.value.length > 0)){
        alert.style.visibility = "hidden";
        document.getElementById("submit").disabled = false;
    }else{
        alert.style.visibility = "visible";
        document.getElementById("submit").disabled = true;
    }
};

pwdInput.onkeyup = function() {
    if ((emailInput.value.length > 0)&&(pwdInput.value.length > 0)){
        alert.style.visibility = "hidden";
        submitbtn.disabled = false;
    }else{
        alert.style.visibility = "visible";
        submitbtn.disabled = true;
    }
};