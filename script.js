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
  let speechCompetitorsNoDuplicatesObj = uniq(carderBySchool)
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
  console.log(totalCardsObj)
  for (let key in totalCardsObj){
    totalCardsLabel.push(key)
    totalCardsData.push(totalCardsObj[key])
  }

  
  var ctx1 = document.getElementById("myChart").getContext("2d");

  var gradientStroke1 = ctx1.createLinearGradient(500, 0, 100, 0);

  gradientStroke1.addColorStop(0, 'rgba(3, 138, 255, 1)');

  gradientStroke1.addColorStop(1, 'rgba(3, 138, 255, 0.25)');
  let myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: totalCardsLabel,
      datasets: [{
        label: "Amount of cards",
        fontColor: "white",
        borderColor: gradientStroke1,
        pointBorderColor: gradientStroke1,
        pointBackgroundColor: gradientStroke1,
        pointHoverBackgroundColor: gradientStroke1,
        pointHoverBorderColor: gradientStroke1,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 0.2,
        pointRadius: 0.5,
        borderWidth: 4,
        data: totalCardsData,
        spanGaps: true,
        lineTension: 0.1,
        backgroundColor: gradientStroke1,


      }]
    },
    options: {
      legend: {
        position: "bottom",
        fontColor: "black",
        maintainAspectRatio: false
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
          text: `Total Cards (without repeats)`,
          fontColor: "white"
        }
      }

    }
  })

  let labelArr = []
  let dataArr = []
  
  for (let key in debateCardsNoRepeat){
    labelArr.push(key)
    dataArr.push(debateCardsNoRepeat[key])
  }

  var ctx = document.getElementById("myChart2").getContext("2d");

  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);

  gradientStroke.addColorStop(0, 'rgba(3, 138, 255, 1)');

  gradientStroke.addColorStop(1, 'rgba(3, 138, 255, 0.25)');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArr,
      datasets: [{
        label: "Amount of cards",
        fontColor: "white",
        borderColor: gradientStroke,
        pointBorderColor: gradientStroke,
        pointBackgroundColor: gradientStroke,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 0.2,
        pointRadius: 0.5,
        borderWidth: 4,
        data: dataArr,
        spanGaps: true,
        lineTension: 0.1,
        backgroundColor: gradientStroke,


      }]
    },
    options: {
      legend: {
        position: "bottom",
        fontColor: "black",
        maintainAspectRatio: false
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
          text: `Debate Cards (without repeats)`,
          fontColor: "white"
        }
      }

    }
  })

  let labelArrSpeech = []
  let dataArrSpeech = []
  
  for (let key in speechCardsNoRepeat){
    labelArrSpeech.push(key)
    dataArrSpeech.push(speechCardsNoRepeat[key])
  }

  var ctx2 = document.getElementById("myChart3").getContext("2d");

  var gradientStroke2 = ctx2.createLinearGradient(500, 0, 100, 0);

  gradientStroke2.addColorStop(0, 'rgba(3, 138, 255, 1)');

  gradientStroke2.addColorStop(1, 'rgba(3, 138, 255, 0.25)');
  let myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labelArrSpeech,
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
        data: dataArrSpeech,
        spanGaps: true,
        lineTension: 0.1,
        backgroundColor: gradientStroke2,


      }]
    },
    options: {
      legend: {
        position: "bottom",
        fontColor: "black",
        maintainAspectRatio: false
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
          text: `Speech Cards (without repeats)`,
          fontColor: "white"
        }
      }

    }
  })
  