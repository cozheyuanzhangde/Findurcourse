const optionList = document.getElementById('coursesubject').options;

const options = [
  {
    text: "Anthropology(ANTHRO)",
    value: "ANTHRO"
  },
  {
    text: "Chemistry(CHEM)",
    value: "CHEM"
  },
  {
    text: "Communication(COMM)",
    value: "COMM"
  },
  {
    text: "Computer Science(CS)",
    value: "CS"
  },
  {
    text: "Economics(ECON)",
    value: "ECON"
  },
  {
    text: "English Writing(ENGLWRIT)",
    value: "ENGLWRIT"
  },
  {
    text: "English as a Second Language(ESL)",
    value: "ESL"
  },
  {
    text: "Linguistics(LINGUIST)",
    value: "LINGUIST"
  },
  {
    text: "Mathematics(MATH)",
    value: "MATH"
  },
  {
    text: "Nutrition(NUTRITN)",
    value: "NUTRITN"
  },
  {
    text: "Physics(PHYSICS)",
    value: "PHYSICS"
  },
  {
    text: "Statistics(STATS)",
    value: "STATS"
  },
  {
    text: "History(HISTORY)",
    value: "HISTORY"
  },
  {
    text: "Accounting(ACCOUNTG)",
    value: "ACCOUNTG"
  },
  {
    text: "Resource Economics(RES-ECON)",
    value: "RES-ECON"
  },
  {
    text: "Operations & Info Management(OIM)",
    value: "OIM"
  },
  {
    text: "Management(MANAGMNT)",
    value: "MANAGMNT"
  },
  {
    text: "Finance(FINANCE)",
    value: "FINANCE"
  },
  {
    text: "Chinese(CHINESE)",
    value: "CHINESE"
  },
  {
    text: "Public Health(PUBHLTH)",
    value: "PUBHLTH"
  },
  {
    text: "Art(ART)",
    value: "ART"
  },
  {
    text: "Isenberg School of Management(SCH-MGMT)",
    value: "SCH-MGMT"
  },
  {
    text: "College of Inform & Comp Sci(CICS)",
    value: "CICS"
  },
  {
    text: "Japanese(JAPANESE)",
    value: "JAPANESE"
  },
  {
    text: "Astronomy(ASTRON)",
    value: "ASTRON"
  },
  {
    text: "Biology(BIOLOGY)",
    value: "BIOLOGY"
  },
  {
    text: "Biochemistry & Molecular Bio(BIOCHEM)",
    value: "BIOCHEM"
  },
  {
    text: "Afro-American Studies(AFROAM)",
    value: "AFROAM"
  },
  {
    text: "Art History(ART-HIST)",
    value: "ART-HIST"
  },
  {
    text: "English(ENGLISH)",
    value: "ENGLISH"
  },
  {
    text: "German(GERMAN)",
    value: "GERMAN"
  },
  {
    text: "Korean(KOREAN)",
    value: "KOREAN"
  },
  {
    text: "Education(EDUC)",
    value: "EDUC"
  },
  {
    text: "Informatics(INFO)",
    value: "INFO"
  },
  {
    text: "Political Science(POLISCI)",
    value: "POLISCI"
  },
  {
    text: "Geography(GEOGRAPH)",
    value: "GEOGRAPH"
  },
  {
    text: "Geology(GEOLOGY)",
    value: "GEOLOGY"
  },
  {
    text: "Kinesiology(KIN)",
    value: "KIN"
  },
  {
    text: "Journalism(JOURNAL)",
    value: "JOURNAL"
  },
  {
    text: "Marketing(MARKETNG)",
    value: "MARKETNG"
  },
  {
    text: "Philosophy(PHIL)",
    value: "PHIL"
  },
  {
    text: "Nursing(NURSING)",
    value: "NURSING"
  },
  {
    text: "Animal Science(ANIMLSCI)",
    value: "ANIMLSCI"
  },
  {
    text: "Architecture(ARCH)",
    value: "ARCH"
  },
  {
    text: "Biomedical Engineering(BMED-ENG)",
    value: "BMED-ENG"
  },
  {
    text: "Biostatistics(BIOSTATS)",
    value: "BIOSTATS"
  },
  {
    text: "Psychology & Brain Sciences(PSYCH)",
    value: "PSYCH"
  },
  {
    text: "Microbiology(MICROBIO)",
    value: "MICROBIO"
  },
  {
    text: "Comparative Literature(COMP-LIT)",
    value: "COMP-LIT"
  },
  {
    text: "Engineering(ENGIN)",
    value: "ENGIN"
  },
  {
    text: "Dance(DANCE)",
    value: "DANCE"
  },
  {
    text: "Chemical Engineering(CHEM-ENG)",
    value: "CHEM-ENG"
  },
  {
    text: "Informatics(INFO)",
    value: "INFO"
  },
  {
    text: "Sport Management(SPORTMGT)",
    value: "SPORTMGT"
  },
  {
    text: "Food Science(FOOD-SCI)",
    value: "FOOD-SCI"
  },
  {
    text: "Stockbridge Sch of Agriculture(STOCKSCH)",
    value: "STOCKSCH"
  },
  {
    text: "Civil & Environmental Engrg(CE-ENGIN)",
    value: "CE-ENGIN"
  },
  {
    text: "Classics(CLASSICS)",
    value: "CLASSICS"
  },
  {
    text: "Communication Disorders(COMM-DIS)",
    value: "COMM-DIS"
  },
  {
    text: "Electrical & Computer Engin(EC-ENG)",
    value: "EC-ENG"
  },
  {
    text: "Arabic(ARABIC)",
    value: "ARABIC"
  },
  {
    text: "Spanish(SPANISH)",
    value: "SPANISH"
  },
  {
    text: "Latin(LATIN)",
    value: "LATIN"
  },
  {
    text: "French Studies(FRENCHST)",
    value: "FRENCHST"
  },
  {
    text: "Judaic Studies(JUDAIC)",
    value: "JUDAIC"
  },
  {
    text: "Theater(THEATER)",
    value: "THEATER"
  },
  {
    text: "Social Thought & Polic. Econ(STPEC)",
    value: "STPEC"
  },
  {
    text: "Sustainable Community(SUSTCOMM)",
    value: "SUSTCOMM"
  },
  {
    text: "Legal Studies(LEGAL)",
    value: "LEGAL"
  },
  {
    text: "Sociology(SOCIOL)",
    value: "SOCIOL"
  },
  {
    text: "Portuguese(PORTUG)",
    value: "PORTUG"
  }
];

options.sort((a, b) => (a.value > b.value) ? 1 : -1);

options.forEach(option =>
  optionList.add(
    new Option(option.text, option.value)
  )
);

optionList.add(
  new Option("If your Course Subject is not listed here, please contact admin by email: support@findurcourse.com", "")
);


let courseschoolname = 'UMass Amherst';
document.getElementById('courseschoolname').addEventListener('change',()=>{
  courseschoolname = document.getElementById('courseschoolname').value;
  console.log(courseschoolname);
});

let coursesubject = '';
document.getElementById('coursesubject').addEventListener('change',()=>{
  coursesubject = document.getElementById('coursesubject').value;
});

let coursenumber = '';
document.getElementById('coursenumber').addEventListener('change',()=>{
  coursenumber = document.getElementById('coursenumber').value;
});

let courseinstructor = '';
document.getElementById('courseinstructor').addEventListener('change',()=>{
  courseinstructor = document.getElementById('courseinstructor').value;
});

let coursedifficulty = '';
document.getElementById('coursedifficulty').addEventListener('change',()=>{
  coursedifficulty = document.getElementById('coursedifficulty').value;
});

let coursetime = '';
document.getElementById('coursetime').addEventListener('change',()=>{
  coursetime = document.getElementById('coursetime').value;
});

let courseoverall = '';
document.getElementById('courseoverall').addEventListener('change',()=>{
  courseoverall = document.getElementById('courseoverall').value;
});

let coursecomment = '';
document.getElementById('coursecomment').addEventListener('change',()=>{
  coursecomment = document.getElementById('coursecomment').value;
});


async function postAddNewCourse(url = '', courseschoolname, coursesubject, coursenumber, courseinstructor, coursedifficulty, coursetime, courseoverall, userid, username, textcomment) {
  await fetch(url, {
    method: 'POST',  
    headers: {
      'Content-Type': "application/json"
    }, 
    body: JSON.stringify({ "schoolname": courseschoolname, "coursesubject": coursesubject, "coursenumber": coursenumber, "instructor": courseinstructor, "difficulty": coursedifficulty, "time": coursetime, "overall": courseoverall, "userid": userid, "username": username, "textcomment": textcomment})
  });
}

function checkSchoolName(schoolname){
  const schoolnametmp = schoolname.replace(/\s+/g, '');
  if((schoolnametmp.toLowerCase() === 'umass')){
    alert('Please enter full School Name, like Umass Amherst');
    return false;
  }
  return true;
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
      const res_user = await fetch(`/loaduserinfobyemail?email=${sessionEmail}`,{
          method: "GET"
      });
      if (!res_user.ok) {
          console.log(res_user.error);
          return;
      }
      const user = await res_user.json();
      const username = user[0].username;
      const userid = user[0].userid;
      document.getElementById('submit').addEventListener('click', async () => {
        if(!((courseschoolname.length>0)&&(coursesubject.length>0)&&(coursenumber.length>0)&&(courseinstructor.length>0)&&(coursedifficulty.length>0)&&(courseoverall.length>0)&&(coursecomment.length>0))){
          alert("Sorry, you need to enter all fields to add a new course!");
        //}else if(isNaN(Number(coursenumber))){
          //alert("Sorry, you have to enter a number for Course Number!");
        }else{
          const res_course1 = await fetch(`/loadcoursebyschoolsubjectnumberinstructor/?schoolname=${courseschoolname}&coursesubject=${coursesubject}&coursenumber=${coursenumber}&instructor=${courseinstructor}`,{
              method: "GET"
          });
          if (!res_course1.ok) {
              console.log(res_course1.error);
              return;
          }
          const checkcourse = await res_course1.json();
          if(checkcourse.length > 0){
            alert("Sorry, you cannot add an existing course with same School Name, same Course Subject, same Course Number with same Instructor. Please just comment on it! You will be directed to this course.");
            window.location.href = "./coursedetail.html?courseid=" + checkcourse[0].courseid;
          }else if(checkSchoolName(courseschoolname)){
            postAddNewCourse('/addnewcourse', courseschoolname, coursesubject, coursenumber, courseinstructor, coursedifficulty, coursetime, courseoverall, userid, username, coursecomment);
            alert("Well Done! You successfully add a new course with a comment!");
            const res_course2 = await fetch(`/loadcoursebyschoolsubjectnumberinstructor/?schoolname=${courseschoolname}&coursesubject=${coursesubject}&coursenumber=${coursenumber}&instructor=${courseinstructor}`,{
                method: "GET"
            });
            if (!res_course2.ok) {
                console.log(res_course2.error);
                return;
            }
            const course = await res_course2.json();
            const courseid = course[0].courseid;
            window.location.href = "./coursedetail.html?courseid=" + courseid;
          }
        }
      });
  }catch(error){
      alert("Please Login first and then add a new course! If you don't have an account, register one!");
      window.location.href="./login.html";
  }
});
