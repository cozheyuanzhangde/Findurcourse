document.getElementById("schoolName").value = "";
document.getElementById("courseSubject").value = "";
document.getElementById("courseNumber").value = "";

document.getElementById("searchbtn").addEventListener("click", urlJump);

function urlJump(){
    const schoolName = document.getElementById("schoolName").value;
    const courseSubject = document.getElementById("courseSubject").value;
    const courseNumber = document.getElementById("courseNumber").value;
    const url = "searchresult.html?schoolname="+schoolName+"&coursesubject="+courseSubject+"&coursenumber="+courseNumber;
    window.location.href = url;
}
