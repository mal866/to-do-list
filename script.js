
const inputBox = document.getElementById("input-box"); //name of input element from html
const listContainer = document.getElementById("list-container"); //

const form = document.getElementById('todo-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();   // stop page reload
  addTask();
});


function addTask(){
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please enter a task");
        return;
    }
    
    const li = document.createElement("li");

    li.innerHTML = `
      <label class="task-label">
         <input type ="checkbox">
         <span> ${task} </span>
     </label>
     <div class="actions">
        <button class="edit-button"> Edit </span>
        <button class="delete-button"> Delete </span>
     </div>
     `;
    listContainer.appendChild(li);
    inputBox.value = "";
    
    const checkbox = li.querySelector("input"); // 1
    const editButton = li.querySelector(".edit-button"); // 2
    const deleteButton = li.querySelector(".delete-button"); // 3
    const taskSpan = li.querySelector("span"); // 4

    //using checkbox element from above - 1
    checkbox.addEventListener("click", function(){
        li.classList.toggle("completed", checkbox.checked);

        updateCounters();
    })

    //using editButton element from above - 2
    editButton.addEventListener("click", function() {
        const update = prompt("Edit Task:", taskSpan.textContent);
        if (update!=null){
            taskSpan.textContent = update;
            li.classList.remove("completed");

            checkbox.checked = false;
            updateCounters();
        }
    })

    //using deleteButton element from above - 3
    deleteButton.addEventListener("click", function(){
        if(confirm("Are you sure you wanna delete this task?")){
            li.remove();
            updateCounters();
        }
    })

    const completedCounter = document.getElementById("completed-counter");
    const uncompletedCounter = document.getElementById("uncompleted-counter");

    //shows the num of completed & uncompleted tasks
    function updateCounters(){
        const completedTasks = listContainer.querySelectorAll(".completed").length;
        const uncompletedTasks = listContainer.querySelectorAll("li:not(.completed)").length;

        completedCounter.textContent = completedTasks;
        uncompletedCounter.textContent = uncompletedTasks;
    }

    updateCounters(); //runs at the end of addTask() function!
}

