function getURLParam(paramName) {
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {return unescape(r[2]);} return null;
}

const schoolName = getURLParam("schoolname");
const courseSubject = getURLParam("coursesubject");
const courseNumber = getURLParam("coursenumber");

function starRating(n,element){
    const div = document.createElement('div');
    let count = 0;
    for(let i = 0; i < 5; i++){
        const node = document.createElement('span');
        if(count < n){
            node.setAttribute('class','fa fa-star full');
            count ++;
        }
        else{
            node.setAttribute('class','fa fa-star');
        }
        div.appendChild(node);
    }
    element.appendChild(div);
}


function coursedetailURLJump(para_courseid){
    const courseid = para_courseid;
    const url = "coursedetail.html?courseid="+courseid;
    window.location.href = url;
}

function createDiv(courseid, courseSubject, courseNumber, courseSchoolName, courseName, instructor, difficulty, time, overall){
    const bigDiv = document.createElement('div');
    bigDiv.classList.add('row');
    const node1 = document.createElement('div');
    node1.innerHTML = courseName.toUpperCase();
    const a = document.createElement('a');
    a.addEventListener("click", () => coursedetailURLJump(courseid));
    a.setAttribute('style','cursor:pointer');
    a.appendChild(node1);
    a.classList.add('col-sm');
    const node2 = document.createElement('div');
    node2.classList.add('col-sm');
    node2.innerHTML = instructor.toUpperCase();
    const node3 = document.createElement('div');
    node3.classList.add('col-sm');
    starRating(difficulty,node3);
    const node4 = document.createElement('div');
    node4.classList.add('col-sm');
    starRating(time,node4);
    const node5 = document.createElement('div');
    node5.classList.add('col-sm');
    starRating(overall,node5);
    bigDiv.appendChild(a);
    bigDiv.appendChild(node2);
    bigDiv.appendChild(node3);
    bigDiv.appendChild(node4);
    bigDiv.appendChild(node5);
    return bigDiv;
}

let res_courses;

let courses;

window.addEventListener("load", async function () {
    if(schoolName === ""){
        alert("Sorry, You need to at least enter a School Name for searching courses!");
        window.history.back();
    } else if((courseSubject === "")&&(courseNumber !== "")){
        alert("Sorry, You need to enter a Course Subject before Course Number!");
        window.history.back();
    } else if((courseSubject === "")&&(courseNumber === "")){
        res_courses = await fetch(`/loadcoursesbyschool?schoolname=${schoolName}`,{
            method: "GET"
        });
    } else if((courseNumber === "")){
        res_courses = await fetch(`/loadcoursesbyschoolsubject?schoolname=${schoolName}&coursesubject=${courseSubject}`,{
            method: "GET"
        });
    } else{
        res_courses = await fetch(`/loadcoursesbyschoolsubjectnumber?schoolname=${schoolName}&coursesubject=${courseSubject}&coursenumber=${courseNumber}`,{
            method: "GET"
        });
    }
    if (!res_courses.ok) {
        console.log(res_courses.error);
        return;
    }
    courses = await res_courses.json();

    if(courses === undefined){
        courses = [];
    }

    const theDiv = document.getElementById('searchDetail');
    
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});

/*<a id="rankdifficultyLH" class="dropdown-item" href="#">Difficulty(Low to High)</a>
<a id="rankdifficultyHL" class="dropdown-item" href="#">Difficulty(High to Low)</a>
<a id="ranktimeLH" class="dropdown-item" href="#">Time Comsumption(Low to High)</a>
<a id="ranktimeHL" class="dropdown-item" href="#">Time Comsumption(High to Low)</a>
<a id="rankoverallHL" class="dropdown-item" href="#">Overall(High to Low)</a>
<a id="rankoverallLH" class="dropdown-item" href="#">Overall(Low to High)</a>*/

document.getElementById('rankdifficultyLH').addEventListener('click',()=>{
    const theDiv = document.getElementById('searchDetail');
    theDiv.textContent = '';
    courses.sort(function (a, b) {
        return a.difficulty - b.difficulty;
      });
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});

document.getElementById('rankdifficultyHL').addEventListener('click',()=>{
    const theDiv = document.getElementById('searchDetail');
    theDiv.textContent = '';
    courses.sort(function (a, b) {
        return b.difficulty - a.difficulty;
      });
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});

document.getElementById('ranktimeLH').addEventListener('click',()=>{
    const theDiv = document.getElementById('searchDetail');
    theDiv.textContent = '';
    courses.sort(function (a, b) {
        return a.time - b.time;
      });
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});

document.getElementById('ranktimeHL').addEventListener('click',()=>{
    const theDiv = document.getElementById('searchDetail');
    theDiv.textContent = '';
    courses.sort(function (a, b) {
        return b.time - a.time;
      });
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});

document.getElementById('rankoverallHL').addEventListener('click',()=>{
    const theDiv = document.getElementById('searchDetail');
    theDiv.textContent = '';
    courses.sort(function (a, b) {
        return b.overall - a.overall;
      });
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});

document.getElementById('rankoverallLH').addEventListener('click',()=>{
    const theDiv = document.getElementById('searchDetail');
    theDiv.textContent = '';
    courses.sort(function (a, b) {
        return a.overall - b.overall;
      });
    courses.forEach(function (obj) {
        const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.schoolname + ")";
        theDiv.appendChild(createDiv(obj.courseid, obj.coursesubject, obj.coursenumber, obj.schoolname, coursename, obj.instructor, obj.difficulty, obj.time, obj.overall));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    });
});
