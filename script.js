// format current date and time
var currentDay = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentDay);
var currentHour = moment().format('h A');
// change to test class conditions for hour block color
// var currentHour = "12 PM";
console.log("currentHour: " + currentHour);
 
// create array of all times
var allTimes = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"];
// get index of current hour
var currentTimeIndex = allTimes.indexOf(currentHour);
console.log("currentIndex: " + currentTimeIndex);
// create array of work times
var workTimes = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
 
for (let i = 0; i < workTimes.length; i++) {
   var time = workTimes[i];
   // get index of current time block
   var currentTimeBlockIndex = allTimes.indexOf(time);
   console.log("currentBlockIndex: " + currentTimeBlockIndex);
   // compare index of current hour and current time block
   var blockClass = "";
   if (currentTimeIndex == currentTimeBlockIndex) {
       blockClass = "present";
   } else if (currentTimeIndex < currentTimeBlockIndex) {
       blockClass = "future";
   } else {
       blockClass = "past";
   };
   console.log(time + " " + blockClass);
   // remove spaces (for setting ids below)
   time = time.replace(/\s/g, '');
 
   // create row
   var row = document.createElement("div");
   row.setAttribute("class", "row");
   row.setAttribute("id", "row" + time);
   document.querySelector(".container").appendChild(row);
 
   // create time block and append to current row
   var timeBlock = document.createElement("p");
   timeBlock.setAttribute("class", "hour col-md-1");
   timeBlock.setAttribute("id", "timeBlock" + time);
   timeBlock.textContent = time;
   //document.querySelector("#timeDiv" + time).appendChild(timeBlock);
   document.querySelector("#row" + time).appendChild(timeBlock);
 
   // create textarea and append to current row
   var textarea = document.createElement("textarea");
   textarea.setAttribute("class", "textarea col-md-10 " + blockClass);
   textarea.setAttribute("id", "textarea" + time);
   // set text content of textareas based on current hour
   if (blockClass == "present") {
       textarea.textContent = "Current hour";
       var currentHourIndex = 9;
   };
   // if future and current time block is last in workTimes array
   if (blockClass == "future" && i == workTimes.length - 1) {
       textarea.textContent = "New event";
   };
   // if past and current time block is before current hour (must remove space from current hour to compare with current time block)
   if (blockClass == "past" && time == allTimes[currentTimeIndex - 1].replace(/\s/g, '')) {
       textarea.textContent = "Event that already happened";
   };
   document.querySelector("#row" + time).appendChild(textarea);
 
   //create save button and append to current row
   var button = document.createElement("button");
   button.setAttribute("class", "saveBtn btn col-md-1");
   button.setAttribute("id", "button" + time);
   // font awesome saveIcon html
   var saveIcon = '<i style="font-size:24px;text-align:center" class="fa fa-save"></i>';
   button.innerHTML = saveIcon;
   document.querySelector("#row" + time).appendChild(button);
 
}
 
// get all inputs
var allInputs = JSON.parse(localStorage.getItem("allInputs") || "[]");
console.log("# of inputs: " + allInputs.length);
// for each input, set textarea val using id
allInputs.forEach(function(input, index) {
   console.log("[" + index + "]: " + input.id + " " + input.val);
   document.getElementById(input.id).value = input.val;
});
 
// on click, get input val/id and save object to local storage array
$(".saveBtn").on("click ", function() {
   var currentButtonId = this.id;
   console.log("currentBtnID: " + currentButtonId);
   // get val of current text area
   var currentTextAreaVal = document.getElementById(currentButtonId).previousSibling.value;
   console.log("textareaVal: " + currentTextAreaVal);
   // get id of current text area
   var currentTextAreaId = document.getElementById(currentButtonId).previousSibling.id;
   console.log("textareaID: " + currentTextAreaId);
   // get val of corresponding time block (using id of current text area )
   var currentTimeBlockVal = document.getElementById(currentTextAreaId).previousSibling.innerHTML;
   console.log("timeblockVal: " + currentTimeBlockVal);
   // create current object of textarea id and val
   var currentInput = {
       id: currentTextAreaId,
       val: currentTextAreaVal
   };
   console.log(currentInput);
   // add object to arary of all inputs and save to local storage array
   allInputs.push(currentInput);
   localStorage.setItem("allInputs", JSON.stringify(allInputs));
 
});
