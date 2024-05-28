// Get the display element from the HTML document
const display = document.getElementById("display");

// Initialize the timer variable
let timer = null;

// Store the start time of the timer
let startTime = 0;

// Store the elapsed time
let elapsedTime = 0;

// Flag to indicate if the timer is running
let isRunning = false;

// Get the laps element from the HTML document
const laps = document.getElementById("laps");

// Get the start button element from the HTML document
const startBtn = document.getElementById("startBtn");

/**
 * Format the time in hours, minutes, seconds, and milliseconds
 * @param {number} time The time in milliseconds
 * @returns {string} The formatted time string
 */
function formatTime(time) {
    // Calculate hours, minutes, seconds, and milliseconds from the given time
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor(time / (1000 * 60) % 60);
    const seconds = Math.floor(time / 1000 % 60);
    const milliseconds = Math.floor(time % 1000 / 10);

    // Return the formatted time string
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
}

/**
 * Start or stop the timer
 */
function start() {
    // If the timer is not running, start it
    if (!isRunning) {
        // Set the start time to the current time minus the elapsed time
        startTime = Date.now() - elapsedTime;

        // Set the timer interval to update every 10 milliseconds
        timer = setInterval(update, 10);

        // Set the flag to indicate the timer is running
        isRunning = true;

        // Update the start button text and style
        startBtn.textContent = 'Stop';
        startBtn.style.backgroundColor = 'rgb(242, 51, 13)';
        startBtn.style.hoverBackgroundColor = 'hsl(10, 90%, 40%)';
    }
    // If the timer is running, stop it
    else {
        // Clear the timer interval
        clearInterval(timer);

        // Update the elapsed time
        elapsedTime = Date.now() - startTime;

        // Set the flag to indicate the timer is not running
        isRunning = false;

        // Update the start button text and style
        startBtn.textContent = 'Start';
        startBtn.style.backgroundColor = 'rgb(17, 204, 0)';
        startBtn.style.hoverBackgroundColor = 'rgb(13, 153, 0)';
    }
}

/**
 * Record a lap time
 */
function lap() {
    // If the timer is running, record a lap time
    if (isRunning) {
        // Create a new list item element
        const li = document.createElement("li");

        // Set the list item text to the current elapsed time
        li.textContent = formatTime(elapsedTime);

        // Add the list item to the laps element
        laps.appendChild(li);
    }
}

/**
 * Reset the timer
 */
function reset() {
    // Clear the timer interval
    clearInterval(timer);

    // Reset the start time, elapsed time, and flag
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    // Clear the laps element
    laps.innerHTML = '';

    // Reset the display text
    display.textContent = "00:00:00:00";

    // Reset the start button text and style
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = 'rgb(17, 204, 0)';
    startBtn.style.hoverBackgroundColor = 'rgb(13, 153, 0)';
}

/**
 * Update the display with the current elapsed time
 */
function update() {
    // Update the elapsed time
    elapsedTime = Date.now() - startTime;

    // Update the display text with the formatted elapsed time
    display.textContent = formatTime(elapsedTime);
}