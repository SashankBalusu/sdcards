function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
function uniq(a) {

  let finalArr = []
  for (let key in a){
    let arr = a[key]
    for (let i = 0; i < arr.length;i++){
      for (let j =0; j < arr.length;j++){
        if (arr[i] == arr[j]){
          if (i != j){
            arr.splice(j, 1)

          }
        }
      }
    }
    a[key] = arr
  }
  return a
}
function uniq2(a) {

  let finalArr = []
  for (let key in a){
    let arr = a[key]
    let count = 0
    for (let i = 0; i < arr.length;i++){
      for (let j =0; j < arr.length;j++){
        if (arr[i] == arr[j]){
          if (i != j){
            count++

          }
          if (count == 2){
            arr.splice(j, 1)

          }
        }
      }
    }
    a[key] = arr
  }
  return a
}
function removeAllChildNodes(selector){
  let a = document.querySelector(selector)
  while (a.lastChild){
    a.removeChild(a.lastChild)
  }
}
function createGraph(selector, labelArr, dataArr, title){
  var ctx2 = document.getElementById(selector).getContext("2d");

  var gradientStroke2 = ctx2.createLinearGradient(500, 0, 100, 0);

  gradientStroke2.addColorStop(0, 'rgba(3, 138, 255, 1)');

  gradientStroke2.addColorStop(1, 'rgba(3, 138, 255, 0.25)');
  let myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labelArr,
      datasets: [{
        label: "Amount of cards",
        fontColor: "white",
        borderColor: gradientStroke2,
        pointBorderColor: gradientStroke2,
        pointBackgroundColor: gradientStroke2,
        pointHoverBackgroundColor: gradientStroke2,
        pointHoverBorderColor: gradientStroke2,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 0.2,
        pointRadius: 0.5,
        borderWidth: 4,
        data: dataArr,
        spanGaps: true,
        lineTension: 0.1,
        backgroundColor: gradientStroke2,


      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "bottom",
        fontColor: "black",
      },
      elements: {
        point: {
          // radius: 0,
          hitRadius: 10
        }
      },
      scales: {
        y: {
          "scaleLabel": {
            "display": true,
            "labelString": "Cards",
            "fontColor": "white"

          },
          gridLines: {
            drawTicks: true,
            display: true,
            zeroLineColor: "rgba(255, 255, 255, 0.25)",
            color: "rgba(255, 255, 255, 0.25)"
          },
          ticks: {
            padding: 20,
            fontColor: "white",
            fontStyle: "bold"
          }
        },
        x: {
          "scaleLabel": {
            "display": true,
            "labelString": "Week",
            "fontColor": "white"

          },
          gridLines: {
            zeroLineColor: "rgba(255, 255, 255, 0.25)",
            color: "rgba(255, 255, 255, 0.25)"
          },
          ticks: {
            padding: 20,
            fontColor: "white",
            fontStyle: "bold"
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: title,
          fontColor: "white"
        }
      }

    }
  })
}
let speechCompetitors = httpGet("https://normalwastefulboards.sashankbalusu.repl.co/speechCompetitors.json")
speechCompetitors = JSON.parse(speechCompetitors)
speechCompetitors = speechCompetitors["speechComp"]
let speechSchools = httpGet("https://normalwastefulboards.sashankbalusu.repl.co/speechSchools.json")
speechSchools = JSON.parse(speechSchools)
speechSchools = speechSchools["speechSchools"]
let debateCompetitors = httpGet("https://normalwastefulboards.sashankbalusu.repl.co/debateComp.json")
debateCompetitors = JSON.parse(debateCompetitors)
debateCompetitors = debateCompetitors["debateComp"]
let debateSchools = httpGet("https://normalwastefulboards.sashankbalusu.repl.co/debateSchools.json")
debateSchools = JSON.parse(debateSchools)
debateSchools = debateSchools["debateSchools"]
let congressCompetitors = httpGet("https://normalwastefulboards.sashankbalusu.repl.co/congressComp.json")
congressCompetitors = JSON.parse(congressCompetitors)
congressCompetitors = congressCompetitors["congressComp"]
let congressSchools = httpGet("https://normalwastefulboards.sashankbalusu.repl.co/congressSchools.json")
congressSchools = JSON.parse(congressSchools)
congressSchools = congressSchools["congressSchools"]

let count = 0
let speechCardsObj = {}
for (let i = 0; i < speechSchools.length;i++){
    if (speechSchools.length <= count){
        break
    }
    
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    if (speechCardsObj[speechSchools[i]] == undefined){
        count += countOccurrences(speechSchools, speechSchools[i])
    }
    speechCardsObj[speechSchools[i]] = countOccurrences(speechSchools, speechSchools[i])
}

count = 0
let debateSchoolsObj = {}
for (let i = 0; i < debateSchools.length;i++){
    if (debateSchools.length <= count){
        break
    }
    
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    if (debateSchoolsObj[debateSchools[i]] == undefined){
        count += countOccurrences(debateSchools, debateSchools[i])
    }
    debateSchoolsObj[debateSchools[i]] = countOccurrences(debateSchools, debateSchools[i])
}

count = 0
let congressSchoolsObj = {}
for (let i = 0; i < congressSchools.length;i++){
  if (congressSchools.length <= count){
      break
  }
  
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  if (congressSchoolsObj[congressSchools[i]] == undefined){
      count += countOccurrences(congressSchools, congressSchools[i])
  }
  congressSchoolsObj[congressSchools[i]] = countOccurrences(congressSchools, congressSchools[i])
}
console.log(congressSchoolsObj)
let carderBySchool = {}
for (let i = 0; i < speechCompetitors.length; i++){
  if (carderBySchool[speechSchools[i]] == undefined){
    carderBySchool[speechSchools[i]] = [speechCompetitors[i]]

  }
  else {
    
    let arr = carderBySchool[speechSchools[i]] 
    arr.push(speechCompetitors[i])
    carderBySchool[speechSchools[i]] = arr
  }
  
}
let speechCardsNoRepeat = {}
let speechCompetitorsNoDuplicatesObj = uniq2(carderBySchool)
let speechCompetitorsNoDuplicates =[]
for (let key in speechCompetitorsNoDuplicatesObj){
  speechCardsNoRepeat[key] = (speechCompetitorsNoDuplicatesObj[key].length)
}
console.log(speechCardsNoRepeat)

let carderBySchoolDebate = {}
for (let i = 0; i < debateCompetitors.length; i++){
  if (carderBySchoolDebate[debateSchools[i]] == undefined){
    carderBySchoolDebate[debateSchools[i]] = [debateSchools[i]]

  }
  else {
    
    let arr = carderBySchoolDebate[debateSchools[i]] 
    arr.push(debateCompetitors[i])
    carderBySchoolDebate[debateSchools[i]] = arr
  }
  
}
let debateCardsNoRepeat = {}
let debateCompetitorsNoDuplicatesObj = uniq(carderBySchoolDebate)
let debateCompetitorsNoDuplicates =[]
for (let key in debateCompetitorsNoDuplicatesObj){
  debateCardsNoRepeat[key] = (debateCompetitorsNoDuplicatesObj[key].length)
}
console.log(debateCardsNoRepeat)

let carderBySchoolCongress = {}
for (let i = 0; i < congressCompetitors.length; i++){
  if (carderBySchoolCongress[congressSchools[i]] == undefined){
    carderBySchoolCongress[congressSchools[i]] = [congressSchools[i]]

  }
  else {
    
    let arr = carderBySchoolCongress[congressSchools[i]] 
    arr.push(congressCompetitors[i])
    carderBySchoolCongress[congressSchools[i]] = arr
  }
  
}
let congressCardsNoRepeat = {}
let congressCompetitorsNoDuplicatesObj = uniq(carderBySchoolCongress)
let congressCompetitorsNoDuplicates =[]
for (let key in congressCompetitorsNoDuplicatesObj){
  congressCardsNoRepeat[key] = (congressCompetitorsNoDuplicatesObj[key].length)
}
console.log(congressCardsNoRepeat)
let congressCardsWithRestraint = {}
for (let key in congressCardsNoRepeat){
  if (congressCardsNoRepeat[key] > 7){
    congressCardsWithRestraint[key] = 7
  }
  else {
    congressCardsWithRestraint[key] = congressCardsNoRepeat[key]
  }
}
console.log(congressCardsWithRestraint)


let totalCardsLabel = []
let totalCardsData = []
let totalCardsObj = {}
for (let key in debateCardsNoRepeat){
  totalCardsObj[key] = debateCardsNoRepeat[key]
}
for (let key in speechCardsNoRepeat){
  if (totalCardsObj[key] != undefined){
    totalCardsObj[key] += speechCardsNoRepeat[key]
  }
  else {
    totalCardsObj[key] = speechCardsNoRepeat[key]
  }
}
for (let key in congressCardsWithRestraint){
  if (totalCardsObj[key] != undefined){
    totalCardsObj[key] += congressCardsWithRestraint[key]
  }
  else {
    totalCardsObj[key] = congressCardsWithRestraint[key]
  }
}
console.log(totalCardsObj)
for (let key in totalCardsObj){
  totalCardsLabel.push(key)
  totalCardsData.push(totalCardsObj[key])
}

createGraph("myChart", totalCardsLabel, totalCardsData, "Total Cards (With Restraints)")

let labelArr = []
let dataArr = []

for (let key in debateCardsNoRepeat){
  labelArr.push(key)
  dataArr.push(debateCardsNoRepeat[key])
}

createGraph("myChart2", labelArr, dataArr, "Debate Cards (Without Repeats)")

let labelArrSpeech = []
let dataArrSpeech = []

for (let key in speechCardsNoRepeat){
  labelArrSpeech.push(key)
  dataArrSpeech.push(speechCardsNoRepeat[key])
}
createGraph("myChart3", labelArrSpeech, dataArrSpeech, "Speech Cards (Without Repeats)")
let labelArrCong = []
let dataArrCong = []

for (let key in congressCardsWithRestraint){
  labelArrCong.push(key)
  dataArrCong.push(congressCardsWithRestraint[key])
}
createGraph("myChart4", labelArrCong, dataArrCong, "Congress Cards (With Restraints)")


const showData = document.querySelector("#showData")
showData.addEventListener("click", function(){
  document.querySelector("#showDataButtons").setAttribute("style", "display:block")
  const showAllSpeech = document.querySelector("#showAllSpeech")
  showAllSpeech.addEventListener("click", function(){
    document.querySelector("#dat").setAttribute("style", "display: block")
    const speechDat = document.querySelector("#speechDat")
    removeAllChildNodes("#debateDat")
    removeAllChildNodes("#speechDat")
    removeAllChildNodes("#congressDat")
    let comp = document.createElement("p")
    comp.textContent = "Speech Competitors: "
    let compReal = document.createElement("p")
    compReal.textContent = speechCompetitors
    let schools = document.createElement("p")
    schools.textContent = "Speech Schools: "
    let schoolsReal = document.createElement("p")
    schoolsReal.textContent =speechSchools
    speechDat.appendChild(comp)
    speechDat.appendChild(compReal)
    speechDat.appendChild(schools)
    speechDat.appendChild(schoolsReal)
  })
  const showAllDebate = document.querySelector("#showAllDebate")
  showAllDebate.addEventListener("click", function(){
    document.querySelector("#dat").setAttribute("style", "display: block")
    const debateDat = document.querySelector("#debateDat")
    removeAllChildNodes("#debateDat")
    removeAllChildNodes("#speechDat")
    removeAllChildNodes("#congressDat")

    let comp = document.createElement("p")
    comp.textContent = "Debate Competitors: "
    let compReal = document.createElement("p")
    compReal.textContent = debateCompetitors
    let schools = document.createElement("p")
    schools.textContent = "Debate Schools: "
    let schoolsReal = document.createElement("p")
    schoolsReal.textContent =debateSchools
    debateDat.appendChild(comp)
    debateDat.appendChild(compReal)
    debateDat.appendChild(schools)
    debateDat.appendChild(schoolsReal)
  })
  const showAllCongress = document.querySelector("#showAllCongress")

  showAllCongress.addEventListener("click", function(){
    document.querySelector("#dat").setAttribute("style", "display: block")
    const congressDat = document.querySelector("#congressDat")
    removeAllChildNodes("#debateDat")
    removeAllChildNodes("#speechDat")
    removeAllChildNodes("#congressDat")

    let comp = document.createElement("p")
    comp.textContent = "Congress Competitors: "
    let compReal = document.createElement("p")
    compReal.textContent = congressCompetitors
    let schools = document.createElement("p")
    schools.textContent = "Congress Schools: "
    let schoolsReal = document.createElement("p")
    schoolsReal.textContent =congressSchools
    congressDat.appendChild(comp)
    congressDat.appendChild(compReal)
    congressDat.appendChild(schools)
    congressDat.appendChild(schoolsReal)
  })
})
const hideData = document.querySelector("#hideData")
hideData.addEventListener("click", function(){
  document.querySelector("#showDataButtons").setAttribute("style", "display:none")
  document.querySelector("#dat").setAttribute("style", "display: none")

})