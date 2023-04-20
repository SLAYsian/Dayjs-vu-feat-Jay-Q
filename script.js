// "use strict";

// SECTION: DOM ELEMENTS
let currentDateEl = $("#current-day");
let timeBlockEl = $(".time-block");
let saveBtnEl = $(".saveBtn");
let timeBlockText = $(".description");
let today = dayjs();

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // SECTION: SET TIMEBLOCK TO PAST PRESENT FUTURE
  // let currentHour = dayjs().hour();
  // let currentHour = dayjs().format("hA");
  // let nextHour = dayjs().add(1, "hour").startOf("hour").format("hA");
  // let currentHour = dayjs().format("H");
  // let nextHour = dayjs().add(1, "hour").startOf("hour").format("H");
  // let currentHour = dayjs().format("H");
  // let calendarStartHour = 9; // 9am
  // let calendarEndHour = 21; // 9pm

  // NOTES: 1st block keeps showing future
  // function getTimeStatus(hour) {
  //   let currentHour = dayjs().format("hA");
  //   console.log("currentHour: ", currentHour);
  //   console.log("hour: ", hour);
  //   if (hour.localeCompare(currentHour) === -1) {
  //     return "past";
  //   } else if (hour.localeCompare(currentHour) === 0) {
  //     return "present";
  //   } else {
  //     return "future";
  //   }
  // }

  // $(".time-block").each(function () {
  //   let hour = $(this).find(".hour").text();
  //   let status = getTimeStatus(hour);
  //   $(this)
  //     .find(".status-color")
  //     .removeClass("past present future")
  //     .addClass(status);
  // });

  currentDateEl.text(today.format("dddd MMMM D, YYYY"));

  function getTimeStatus(hour) {
    // NOTES: getting the hour from each time block
    let currentHour = dayjs().format("hA");
    console.log("currentHour: ", currentHour);

    if (hour.localeCompare(currentHour) === -1) {
      return "past";
    } else if (hour.localeCompare(currentHour) === 0) {
      return "present";
    } else if (hour === "9AM" && currentHour.localeCompare("9AM") === -1) {
      return "past";
    } else {
      return "future";
    }
  }

  // Loop through each time block and set the status
  $(".time-block").each(function () {
    let hour = $(this).find(".hour").text();
    let status = getTimeStatus(hour);
    console.log("hour: ", hour);
    $(this)
      .find(".status-color")
      .removeClass("past present future")
      .addClass(status);
  });

  // Set status of time blocks after the final hour of the day to "past"
  let finalHour = dayjs("8PM", "hA");
  let currentHour = dayjs();
  console.log("currentHour: ", currentHour);
  if (currentHour.isAfter(finalHour)) {
    $(".time-block")
      .find(".status-color")
      .removeClass("present future")
      .addClass("past");
  }

  // Set status of time blocks before the first hour of the day to "future"
  let firstHour = dayjs("9AM", "hA");
  if (currentHour.isBefore(firstHour)) {
    $(".time-block")
      .find(".status-color")
      .removeClass("past present")
      .addClass("future");
  }

  // NOTES: Fixes 9am incorrect class
  // function getTimeStatus(hour) {
  //   // NOTES: getting the hour from each time block
  //   let currentHour = dayjs().format("hA");
  //   console.log("currentHour: ", currentHour);

  //   if (hour.localeCompare(currentHour) === -1) {
  //     return "past";
  //   } else if (hour.localeCompare(currentHour) === 0) {
  //     return "present";
  //   } else if (hour === "9AM" && currentHour.localeCompare("9AM") === -1) {
  //     return "past";
  //   } else {
  //     return "future";
  //   }
  // }

  // $(".time-block").each(function () {
  //   let hour = $(this).find(".hour").text();
  //   console.log("hour: ", hour);
  //   let status = getTimeStatus(hour);
  //   $(this)
  //     .find(".status-color")
  //     .removeClass("past present future")
  //     .addClass(status);
  // });

  console.log($(".time-block"));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // SECTION: SAVE BUTTON EVENT LISTENER
  saveBtnEl.on("click", function () {
    let textAreaEl = $(this).siblings(".description");
    let timeBlockId = $(this).parent().attr("id");
    let description = textAreaEl.val();
    localStorage.setItem(timeBlockId, description);
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  timeBlockText.each(function () {
    let timeBlockId = $(this).parent().attr("id");
    let savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription) {
      $(this).val(savedDescription);
    }
  });
  // TODO: Add code to display the current date in the header of the page.

  currentDateEl.text(today.format("dddd MMMM D, YYYY"));
});
