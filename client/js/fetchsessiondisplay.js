window.addEventListener("load", async function (){
    let user;
    let user_email;
    const res_user = await fetch(`/getsession`,{
        method: "GET"
    });
    if (!res_user.ok) {
        console.log(res_user.error);
        return;
    }else{
        try {
            document.getElementById("navsignup").style.visibility = "hidden";
            document.getElementById("navlogin").style.visibility = "hidden";
            document.getElementById("navuserhome").style.visibility = "visible";
            user = await res_user.json();
            document.getElementById("navuseremail").innerHTML = "<span class='fas fa-user-circle'></span>" + " " + user.passport.user;
            document.getElementById("navlogout").href = '/logout';
            user_email = user.passport.user;
            let userinfo;
            let user_id;
            const res_userinfo = await fetch(`/loaduserinfobyemail?email=${user_email}`,{
                method: "GET"
            });
            if (!res_userinfo.ok) {
                console.log(res_userinfo.error);
                return;
            }else{
                userinfo = await res_userinfo.json();
                user_id = userinfo[0].userid;
            }   
        }catch (error){
            document.getElementById("navsignup").style.visibility = "visible";
            document.getElementById("navlogin").style.visibility = "visible";
            document.getElementById("navuserhome").style.visibility = "hidden";
        }
    }
});