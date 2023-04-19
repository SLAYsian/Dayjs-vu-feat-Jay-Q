// "use strict";

// SECTION: DOM ELEMENTS
let currentDateEl = $("#currentDay");
let timeBlockEl = $(".time-block");
let timeBlockText = $(".description");
let saveBtnEl = $(".saveBtn");
let today = dayjs();

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // SECTION: DISPLAY CURRENT DATE
  currentDateEl.text(today.format("dddd MMMM D, YYYY"));

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

  function getTimeStatus(hour) {
    const currentHour = dayjs().format("hA");
    console.log("currentHour: ", currentHour);
    console.log("hour: ", hour);
    if (hour.localeCompare(currentHour) === -1) {
      return "past";
    } else if (hour.localeCompare(currentHour) === 0) {
      return "present";
    } else {
      return "future";
    }
  }

  $(".time-block").each(function () {
    const hour = $(this).find(".hour").text();
    const status = getTimeStatus(hour);
    $(this)
      .find(".status-color")
      .removeClass("past present future")
      .addClass(status);
  });

  // $(".time-block").each(function () {
  //   // NOTES: getting the hour from each time block
  //   let hour = $(this).attr("id").split("-")[1];
  //   hour = dayjs(hour, "H").format("hA");

  //   if (hour < currentHour) {
  //     $(this)
  //       .find(".status-color")
  //       .addClass("past")
  //       .removeClass("present future");
  //   } else if (hour === currentHour) {
  //     $(this)
  //       .find(".status-color")
  //       .addClass("present")
  //       .removeClass("past future");
  //   } else {
  //     $(this)
  //       .find(".status-color")
  //       .addClass("future")
  //       .removeClass("past present");
  //   }
  // });

  // $(".time-block").each(function () {
  // NOTES: getting the hour from each time block
  //   let hour = $(this).attr("id").split("-")[1];
  //   hour = dayjs(hour, "H").format("hA"); // format hour to 12-hour format with AM/PM

  //   if (hour.localeCompare(currentHour) === -1) {
  //     $(this).addClass("past").removeClass("present future");
  //   } else if (
  //     hour.localeCompare(currentHour) === 0 ||
  //     (hour.localeCompare(nextHour) === -1 &&
  //       hour.localeCompare(currentHour) === 1)
  //   ) {
  //     $(this).addClass("present").removeClass("past future");
  //   } else {
  //     $(this).addClass("future").removeClass("past present");
  //   }
  // });

  // console.log(currentHour);
  // console.log(nextHour);
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
  console.log(this);

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
});
