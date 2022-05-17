// <!-- The beginning of our Javascrpt -->
{/* <script> */ }
////
// Some global variables
// Arrays to store each of our three lists (as mentioned above)
const taskArray = []; // Master
const red = []; // Incompleted tasks
const green = []; // Completed tasks

completed = false; // A boolean to let us know when an item on the master list has been selected
remove = false; // A boolean to let us know when the remove function is active, changing the header
// and removing the next selected item from all 3 lists
////

////
// The function that adds tasks to the main list, or TASK ARRAY
function addTask() {
    let eventName = document.getElementById("taskTitle").value; // Takes the inputted name of a task
    if (eventName == "") { // Makes sure the task name is not empty
        alert("Task Cannot Be Empty")
        return;
    }
    for (let i = 0; i < taskArray.length; ++i) { // Makes sure the task name is not a duplicate
        if (taskArray[i] == eventName) {
            alert("Cannot add duplicates to list");
            return;
        }
    }
    taskArray.push(eventName); // Push the name of the task to the array
    addTaskToRed(eventName); // Since this is an incomplete task, also push this to the incomplete list

    let li = document.createElement("li"); // Then, create a list element
    let tag = document.createTextNode(eventName); // Create a text node for the event name 
    li.id = eventName; // Give the list tag some other attributes such as id and class name
    li.className = "red";
    li.appendChild(tag); // And attach the element Name to this list tag element
    document.getElementById("list").append(li); // Append this list tag with its attributes to the master "list"
    document.getElementById(li.id).addEventListener("click", clicked); // Finally, add an event listener for a click on the list  
    // node which will be managed by the "clicked" function below
    // Recount the values for the red array, since we added to it
    document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
    // Clear the input text box
    document.getElementById("taskTitle").value = '';
}
////

////
// This function replicates what is done in addTask, but adds it specifically to the Red array
function addTaskToRed(eventName) {
    red.push(eventName);
    let li = document.createElement("li");
    let tag = document.createTextNode(eventName);
    li.id = eventName + "r";
    li.className = "red";
    li.appendChild(tag);
    document.getElementById("red").append(li);
}
////

////
// This function replicates what is done in addTask, but adds it specifically to the Green array
function addTaskToGreen(eventName) {
    green.push(eventName);
    let li = document.createElement("li");
    let tag = document.createTextNode(eventName);
    li.id = eventName + "g";
    li.className = "green";
    li.appendChild(tag);
    document.getElementById("green").append(li);
}
////

////
// This removes an element from the red array - which is helpful when switching an element between R & G
function removeFromRed(eventName) {
    if (red.length > 0) { // Ensures the length of the array is > 0
        const element = document.getElementById(eventName + "r"); // Since red elements were given specific id's, we can remove them using them
        element.remove();
        red.length -= 1; // Subtract 1 from the length to ensure the size & count is correct
    }
    // Update our counter
    document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
}
////

////
// This removes an element from the green array - which is helpful when switching an element between R & G
// Functionality and process is the exact same as the removeFromRed above
function removeFromGreen(eventName) {
    if (green.length > 0) {
        const element = document.getElementById(eventName + "g");
        element.remove();
        green.length -= 1;
    }
    // Update our counter
    document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
}
////

////
// This is used whenever a list node is clicked, so basically this is the main functionality
function clicked() {
    name = this.id;
    classs = this.className;
    // Set the boolean value of "completed"
    // Completed means if the task was completed, so if it is green it is true
    // Else the task is incomplete, thus red
    if (this.className == "green") {
        completed = true;
    }
    else {
        completed = false;
    }
    //
    // The following if statement will check if the remove boolean is true
    // If it is true, the next click will be removed
    // The if statement that checks if (completed) is to check if
    // The element should be removed from the Green list or Red List
    // And then the item will be removed from the Master List
    if (remove) {
        if (completed) {
            removeFromGreen(name);
        }
        else {
            removeFromRed(name);
        }
        removeFromTaskArray(name);
        checkRemove();
    }
    else {
        if (completed) {
            //True
            //This.className = red
            this.className = "red";
            // Add the task to red and remove from Green, as you 
            // can tell by these creative function names
            addTaskToRed(name);
            removeFromGreen(name);
            // Reset the styling for the incomplete list items
            document.getElementById(name).style.color = "#cd0000";
            document.getElementById(name).style.textDecoration = "none";
            // Update our counter
            document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
        }
        else {
            // False
            //This.className = green
            this.className = "green";
            // Add the task to green and remove from red
            addTaskToGreen(name);
            removeFromRed(name);
            // Set the styling for the completed list items
            document.getElementById(name).style.color = "#6acd00";
            document.getElementById(name).style.textDecoration = "line-through";
            // Update our counter
            document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
        }
    }
}
////

////
// This function clears the entire list, clearing the taskArray, Red array, and Green Array
function clearList() {
    if (taskArray.length > 0) { // Ensuring the taskArray length is not less than 0
        // Using the splice function, start at 0 and get rid of everything in the function
        // repeat for Red, Green arrays
        taskArray.splice(0, taskArray.length);
        document.getElementById("list").innerHTML = "";
        taskArray.splice(0, red.length);
        document.getElementById("red").innerHTML = "";
        taskArray.splice(0, green.length);
        document.getElementById("green").innerHTML = "";
        // Ensure the length is reset to 0
        red.length = 0;
        green.length = 0;
        // Update our counter
        document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
    }
    else { // If there are no elements in the array, you will not be able to clear the array
        alert("Cannot clear an empty list");
        return;
    }
}
////

////
// This function sets the BOOLEAN remove to the opposite of whatever it is
// i.e. Since it starts at false, it will then be true once selected
// it will then be reset to false at the end of the removeFromTaskArray function
function removeItem() {
    console.log("remove");
    remove = !remove;
    checkRemove(); // Calls to the subsequent function
}
////

////
// This function checks the status of the remove boolean, alerting the 
// user of this change at the top of the document if so
function checkRemove() {
    if (taskArray.length > 0) {
        if (remove) {
            document.getElementById("rio").style.display = "block";
        }
        else {
            document.getElementById("rio").style.display = "none";
        }
    }
    else {
        alert("No tasks to remove");
        remove = false;
        return;
    }
}
////

////
// This function removes an individual task from the list
function removeFromTaskArray(eventName) {
    if (taskArray.length >= 1) { // Ensuring there are elements in the array to remove
        // This uses the same functionality as the removeFromRed & removeFromGreen functions above
        const element = document.getElementById(eventName);
        element.remove();
        taskArray.length -= 1; // Update the task array length
    }
    remove = false; // Resets the remove variable (as mentioned above) which allows
    // users to continue using the to do list seemlessly after a removal
    // Update our counter
    document.getElementById("stats").innerHTML = "Incomplete: " + red.length + " | Complete: " + green.length;
}
////

////
// This function sets the page view for the Show All Tasks Button
function showAllTasks() {
    document.getElementById("list").style.display = "block";
    document.getElementById("red").style.display = "none";
    document.getElementById("green").style.display = "none";
    document.getElementById("td").style.display = "block";
    document.getElementById("ct").style.display = "none";
    document.getElementById("ict").style.display = "none";
}
// This function sets the page view for the Show Incomplete Tasks Button
function showRed() {
    document.getElementById("list").style.display = "none";
    document.getElementById("red").style.display = "block";
    document.getElementById("green").style.display = "none";
    document.getElementById("td").style.display = "none";
    document.getElementById("ict").style.display = "block";
    document.getElementById("ct").style.display = "none";
}
// This function sets the page view for the Show Complete Tasks Button
function showGreen() {
    document.getElementById("list").style.display = "none";
    document.getElementById("red").style.display = "none";
    document.getElementById("green").style.display = "block";
    document.getElementById("td").style.display = "none";
    document.getElementById("ict").style.display = "none";
    document.getElementById("ct").style.display = "block";
}
////

////
// Here are various event listeners for the buttons we created at the top, linking to their respective functions
document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("clear").addEventListener("click", clearList);
document.getElementById("showAllTasks").addEventListener("click", showAllTasks);
document.getElementById("showRed").addEventListener("click", showRed);
document.getElementById("showGreen").addEventListener("click", showGreen);
document.getElementById("removeItem").addEventListener("click", removeItem);
// Here are the default styling displays, which are changed depending on the button / function
document.getElementById("green").style.display = "none";
document.getElementById("red").style.display = "none";
document.getElementById("list").style.display = "block";
document.getElementById("td").style.display = "block";
document.getElementById("ct").style.display = "none";
document.getElementById("ict").style.display = "none";
document.getElementById("rio").style.display = "none";
    ////
// </script>