// format current date and time
var currentDay = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentDay);
var currentHour = moment().format('h A');
// change to test class conditions for hour block color
//var currentHour = "10 AM";
console.log("currentHour: " + currentHour);
 
// create array of work times
var allTimes = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"];
var currentTimeIndex = allTimes.indexOf(currentHour);
console.log("currentIndex: " + currentTimeIndex)
 
var workTimes = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

for (let i = 0; i < workTimes.length; i++) {
    var time = workTimes[i];
    var currentTimeBlockIndex = allTimes.indexOf(time);
    console.log("currentBlockIndex: " + currentTimeBlockIndex)
    var blockClass = "";
    if (currentTimeIndex == currentTimeBlockIndex) {
        blockClass = "present";
    } else if (currentTimeIndex < currentTimeBlockIndex) {
        blockClass = "future";
    } else {
        blockClass = "past";
    };
    console.log(time + " " + blockClass);
    // remove spaces
    time = time.replace(/\s/g, '');
    // create row
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", "row" + time);
    document.querySelector(".container").appendChild(row);
  
    // create and append div for each column
    var hourDiv = document.createElement("div");
    hourDiv.setAttribute("class", "col-md-4");
    hourDiv.setAttribute("id", "hourDiv" + time);
    document.querySelector("#row" + time).appendChild(hourDiv);
  
    var textareaDiv = document.createElement("div");
    textareaDiv.setAttribute("class", "col-md-4");
    textareaDiv.setAttribute("id", "textareaDiv" + time);
    document.querySelector("#row" + time).appendChild(textareaDiv);
  
  
    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "col-md-4");
    buttonDiv.setAttribute("id", "buttonDiv" + time);
    document.querySelector("#row" + time).appendChild(buttonDiv);
  
    // create hour block?
  
    // create text area
    var textarea = document.createElement("textarea");
    textarea.setAttribute("class", "textarea " + blockClass);
    document.querySelector("#textareaDiv" + time).appendChild(textarea);
  
    //create save button
    var button = document.createElement("button");
    button.setAttribute("class", "saveBtn");
    document.querySelector("#buttonDiv" + time).appendChild(button);
  
  
  
 }
 
 