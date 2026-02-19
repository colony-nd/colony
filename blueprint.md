# Project Blueprint: Schedule Management App

## Overview

This document outlines the design and implementation of a simple, framework-less schedule management web application. The application allows users to manage their schedules through a calendar interface.

## Project Structure

The project consists of the following files:

*   `index.html`: The main HTML file that defines the structure of the application.
*   `style.css`: The CSS file for styling the application.
*   `main.js`: The JavaScript file that contains the application logic.
*   `blueprint.md`: This document.

## Features

*   **Calendar View:** Displays a monthly calendar.
*   **Month Navigation:** Users can navigate to the previous and next months.
*   **Date Selection:** Users can select a date from the calendar.
*   **Time Slot View:** Displays a list of time slots for the selected date.
*   **Schedule Management:** Users can add, edit, and delete schedules for specific time slots.
*   **Modal Interface:** A modal dialog is used for adding, editing, and deleting schedules.
*   **Data Persistence (in-memory):** Schedule data is stored in a JavaScript object in memory.

## Implementation Details

### HTML (`index.html`)

*   The HTML is structured with a calendar container, a schedule container, and a modal for schedule management.
*   The calendar is dynamically generated using JavaScript.
*   The time slots are also dynamically generated based on the selected date.

### CSS (`style.css`)

*   The CSS provides basic styling for the calendar, time slots, and modal.
*   Flexbox and Grid are used for layout.
*   A `has-schedule` class is used to indicate time slots with existing schedules.

### JavaScript (`main.js`)

*   **Date and Time:** The application uses the `Date` object to manage dates and times.
*   **Calendar Rendering:** The `renderCalendar` function dynamically generates the calendar for the current month.
*   **Time Slot Rendering:** The `renderTimeSlots` function generates the time slots for the selected date and highlights any existing schedules.
*   **Schedule Data:** Schedule data is stored in a simple JavaScript object (`scheduleData`). The keys are dates in "YYYY-MM-DD" format, and the values are objects where keys are times and values are the schedule text.
*   **Modal Handling:** The application uses a modal to get user input for schedules.
*   **Event Handling:** Event listeners are used to handle user interactions like clicking on dates, time slots, and buttons.

## Current Task

The current task was to create a schedule management site.

### Plan

1.  **Create `index.html`:** Set up the basic HTML structure with containers for the calendar, schedule, and a modal for editing.
2.  **Create `style.css`:** Add CSS to style the calendar, time slots, and modal to be functional and visually appealing.
3.  **Create `main.js`:** Implement the core logic:
    *   Dynamically generate the calendar.
    *   Handle date selection.
    *   Generate time slots for the selected date.
    *   Implement the modal for adding/editing schedules.
    *   Store schedule data in a JavaScript object.
    *   Add event listeners for all interactive elements.
4.  **Create `blueprint.md`:** Document the project's features, structure, and implementation.
