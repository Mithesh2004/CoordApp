const url = "https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-04-10&end_date=2023-04-15&daily=temperature_2m_max&timezone=GMT";

async function fetchData(url) {
  const response = await fetch(url);
  const jsonFile = await response.json();
  return jsonFile; // Return the datas as jsonFile
}

async function getDates() {
  let jsonFile = await fetchData(url);
  const dateArr = jsonFile.daily.time
  return dateArr      //getting the date array from the json file

}
async function getTemp() {
  let jsonFile = await fetchData(url);
  const tempAarr = jsonFile.daily.temperature_2m_max
  return tempAarr     // getting the temp array from the json file
}
getDates().then(dateArr => {
  getTemp().then(tempArr => {
    const DateToTemp = dateArr.reduce((obj, key, index) => {    //using the reduce funtion to define a object(DateToTemp) having dates as key
      obj[key] = tempArr[index]                                 // and repective temp as values
      return obj
    }, {})

    console.log(DateToTemp)
    let dropDown = document.getElementById("datesId")
    for (let date of dateArr) {
      let option = document.createElement("option");
      option.text = date;
      dropDown.options.add(option);          //adding the dates as options in the dropdown
    }
    dropDown.addEventListener("change", () => {   //notice if there is any change in the dropdown
      let selectedDate = dropDown.value;          //getting the date from dropdown
      let temperatureText = document.getElementById("temperatureText");
      let temperature = DateToTemp[selectedDate];
      temperatureText.textContent = "Temperature: " + temperature + "°C";  //displaying the temp
    })


  })

})


