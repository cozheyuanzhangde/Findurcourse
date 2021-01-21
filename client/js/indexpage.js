const optionList = document.getElementById('subjectsdatalist');

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

let schoolname = '';
document.getElementById('schoolName').addEventListener('change',()=>{
  schoolname = document.getElementById('schoolName').value;
  if(schoolname.toUpperCase() === "UMASS AMHERST"){
    options.forEach(option => {
        const newOptionElement = document.createElement("option");
        newOptionElement.text = option.text;
        newOptionElement.value = option.value;
        optionList.appendChild(newOptionElement);
    });
  }
});