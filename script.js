// ==================================================
// DOM Elements
// ==================================================
var timeblockContainer = $(".container");


// ==================================================
// Variables
// ==================================================

var currMilitaryHour = moment().format("H");
console.log(currMilitaryHour);

// Show time on top of calendar using moment. Set the text of the p tag to be the current time 
var currentDayEl = $("#currentDay")
currentDayEl.text(moment().format("dddd, MMMM Do"));

// TODO: Create an array to hold the holes that I need (9AM - 5PM)
var plannerContent = [
    {
        "time": "9AM",
        "content": ""
    },
    {
        "time": "10AM",
        "content": ""
    },
    {
        "time": "11AM",
        "content": ""
    },
    {
        "time": "12PM",
        "content": ""
    },
    {
        "time": "1PM",
        "content": ""
    },
    {
        "time": "2PM",
        "content": ""
    },
    {
        "time": "3PM",
        "content": ""
    },
    {
        "time": "4PM",
        "content": ""
    },
    {
        "time": "5PM",
        "content": ""
    }
];

// ==================================================
// Page Load
// ==================================================
storedPlannerContent = JSON.parse(localStorage.getItem("plannerContent")) || plannerContent;
console.log(storedPlannerContent)
renderPlanner()


// ==================================================
// Functions
// ==================================================

function renderPlanner(){
    // for loop to go through the array of times to create blocks for each
    for (let index = 0; index < storedPlannerContent.length; index++) {
    
        // TODO: create elements for timeblocks and assign classes. CompareTime computes the time on the row against the current time and returns the class of past, present, or future to give formatting to each of the rows
        var newTimeblock = $("<div>", {
            "class": `row time-block ${compareTime(index)}`,
            "IndexVal": index
            })
        var newHourCol = $("<div>", {
            "class": 'col-md-1 hour',
            "text": storedPlannerContent[index].time,
        })
        var newTextArea = $("<textarea>", {
            "class": 'col-md-10 description',
            "text": storedPlannerContent[index].content
        })
        var newSaveBtn = $("<button>", {
            "class": 'col-md-1 saveBtn',
            "text": "SAVE" 
        })
    
        // Append new elements to the new time block
        newTimeblock.append(newHourCol,newTextArea,newSaveBtn);
    
        // Append the new time block to the time block container
        timeblockContainer.append(newTimeblock);
    }
}

// Compare current time on row to current time (hint: could grab in military time and then compare to index+9)
function compareTime(index) {
    switch(true) {
        case (parseInt(index+9) > parseInt(currMilitaryHour)):
            // FUTURE
            return "future";
        case (parseInt(index+9) < parseInt(currMilitaryHour)):
            // PAST
            return "past";
        case (parseInt(index+9) === parseInt(currMilitaryHour)):
            // PRESENT
            return "present";
        default:
            break;
    }

}

// save / load 
// use "this" to figure out which row was clicked


// ==================================================
// Click Events
// ==================================================

// TODO: add click event to for button
$(document).on("click",".time-block", function(e) {
    if(e.target.matches("button")){
        // console.log("click on button")
        // console.log($(this));
        // Grab the value of the text area and save to a var (need to be able to save the text from the text area that is in the same row as button)
        var rowContent = ($(this)[0].children[1].value);
        // console.log(rowContent);
        var rowIndex = ($(this)[0].attributes[1].value);
        // console.log(rowIndex);

        storedPlannerContent[rowIndex].content = rowContent;
        // console.log(plannerContent);

        localStorage.setItem("plannerContent", JSON.stringify(storedPlannerContent))
    }
})



// TODO: save the information for that row to local storage (localStorage.setItem)
// localStorage.setItem("test1","first item")
// localStorage.setItem("test2","second item")

// var test = localStorage.getItem("test1")


// ==================================================
// TODO LIST
// ==================================================

// TODO: Create One Row with time, text area, and button using jQuery
// Here is the layout of what we need to make using jQuery
{/* <div class="row time-block">
<div class="col-md-1 hour">
  9AM
</div>
<textarea class="col-md-10"></textarea>
<button class="col-md-1 saveBtn">Save</button>
</div> */}