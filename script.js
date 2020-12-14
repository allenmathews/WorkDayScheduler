var dayScheduler = {
    "07:00": "",
    "08:00": "",
    "10:00": "",
    "11:00": "",
    "12:00": "",
    "13:00": "",
    "14:00": "",
    "15:00": "",
    "16:00": "",
    "17:00": "",
    "18:00": "",
    "19:00": "",
  };

  $(document).ready(function(){
    if(!localStorage.getItem('dayScheduler')) {
      updateCalendarTasks(dayScheduler);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('dayScheduler')));
    }
  })
  
  $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

  var counter = 1;
for(const property in dayScheduler) {
  var textEntry = "#text-entry" + counter;
  $(textEntry).text(dayScheduler[property]);
  var timeId = "#time" + counter;
  var presentHour = moment().hour();
  var timeString = $(timeId).text();
  var timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past-hour");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future-hour");
  } else {
    $(textEntry).addClass("present-hour");
  }
  counter ++;
}
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });
  
  function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "07:00": return 7;
      case "08:00": return 8;
      case "09:00": return 9;
      case "10:00": return 10;
      case "11:00": return 11;
      case "12:00": return 12;
      case "13:00": return 13;
      case "14:00": return 14;
      case "15:00": return 15;
      case "16:00": return 16;
      case "17:00": return 17;
      case "18:00": return 18;
      case "19:00": return 19;
    }
  }
  
  function loadCorrectDataset() {
    result = localStorage.getItem('dayScheduler')
    return (result ? result : dayScheduler);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('dayScheduler', JSON.stringify(dayScheduler));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('dayScheduler', JSON.stringify(dayObj));
  }

function saveSchedule(hourString, val) {
    if(!localStorage.getItem('dayScheduler')) {
      initializeLocalStorage();
    }
  
    var workHours = JSON.parse(localStorage.getItem('dayScheduler'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }
  