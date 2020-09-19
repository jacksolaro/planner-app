// ==================================================
// DOM Elements
// ==================================================
var timeblockContainer = $(".container");



// ==================================================
// Variables
// ==================================================

// Grab the current hour (in military time) using moment.js
var currMilitaryHour = moment().format("H");

// Show time on top of calendar using moment. Set the text of the p tag to be the current time 
var currentDayEl = $("#currentDay")
currentDayEl.text(moment().format("dddd, MMMM Do"));

// Create an array to hold the Work Hours and Content of the Planner
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

// If there is data from local storage, grab that
var storedPlannerContent = JSON.parse(localStorage.getItem("plannerContent")) || plannerContent;



// ==================================================
// Page Load
// ==================================================

// Render the planner
renderPlanner()


// ==================================================
// Functions
// ==================================================

function renderPlanner() {
    // for loop to go through the storedPlannerContent and create planner rows for each time block
    for (let index = 0; index < storedPlannerContent.length; index++) {

        // create elements for timeblocks, assign classes, and fill with data from storedPlannerContent. Call compareTime() to add class for Past, Present, Future
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
        newTimeblock.append(newHourCol, newTextArea, newSaveBtn);

        // Append the new time block to the time block container
        timeblockContainer.append(newTimeblock);
    }
}

// Returns Past, Present, or Future to be added to newTimeBlocks for styling. Compares the index+9 to the current military hour to determine if past, present, or future
function compareTime(index) {
    switch (true) {
        case (parseInt(index + 9) > parseInt(currMilitaryHour)):
            // FUTURE
            return "future";
        case (parseInt(index + 9) < parseInt(currMilitaryHour)):
            // PAST
            return "past";
        case (parseInt(index + 9) === parseInt(currMilitaryHour)):
            // PRESENT
            return "present";
        default:
            break;
    }
}


// ==================================================
// Click Events
// ==================================================

// Click Event for Save Button
$(document).on("click", ".time-block", function (e) {
    if (e.target.matches("button")) {
        // Grab the value of the text area and save to a var
        var rowContent = ($(this)[0].children[1].value);

        // Grab the value of the row that is being saved
        var rowIndex = ($(this)[0].attributes[1].value);

        // Update the storedPlannerContent variable
        storedPlannerContent[rowIndex].content = rowContent;

        // Update Local Storage
        localStorage.setItem("plannerContent", JSON.stringify(storedPlannerContent))
    }
})
