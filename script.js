// Select the Elements

const clear = document.querySelector(".clear");
const date = document.querySelector(".date");
const list = document.querySelector(".list");
const input = document.querySelector(".input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables

let LIST,id;

// Data

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

// Load item

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
};

// Clear to do list

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Date

const options = {weekday: "long", month: "long", day:"numeric"};
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);

// Add function

function addToDo(toDo, id, done, trash){
    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = `
        <li class="item">
            <i class="far ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fas fa-trash-alt de" job="delete" id="${id}"></i>
        </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
};

// Icon to click

const plusIcon = document.querySelector(".fa-plus-circle");

plusIcon.addEventListener("click", function() {
  const toDo = input.value.trim();

  if (toDo !== "") {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });

    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;

    input.value = "";
  }
});

//  Confirm with enter
 
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const  toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

// Complete function

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};

// Remove function

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
};

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

