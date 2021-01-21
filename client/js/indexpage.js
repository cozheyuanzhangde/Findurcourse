const optionList = document.getElementById('subjectsdatalist');

window.addEventListener("load", async function() {
  const response = await fetch("./data/umass-amherst-coursesubjects.json");
    if (!response.ok) {
      console.log(response.error);
      return;
    }

    const options = await response.json();

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
      }else{
        optionList.innerHTML = '';
      }
    });
});