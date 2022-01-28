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
  