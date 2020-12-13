var workDay = {
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