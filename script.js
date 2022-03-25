let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");

let mainCont = document.querySelector(".main-cont");

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1]; // black

let allPriorityColors = document.querySelectorAll(".priority-color");

let addFlag = false;

let taskAreaCont = document.querySelector('.textarea-cont')

let RemoveButton = document.querySelector('.remove-btn')

let removeFlag = false;

addBtn.addEventListener("click", function (e) {
  //Display the Modal

  // addFlag , true - Modal Display
  //addFlag , false - Modal Hide

  addFlag = !addFlag;
  removeFlag = false;
  RemoveButton.style.color = 'white'
  addBtn.style.color = 'green'

  if (addFlag == true) {
    modalCont.style.display = "flex";
    addBtn.style.color = 'white'
  } else {
    modalCont.style.display = "none";
    addBtn.style.color = 'white'
  }
});

//Changing Priority Colors

allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener("click", function (e) {
    allPriorityColors.forEach(function (priorityColorElem) {
      priorityColorElem.classList.remove("active");
    });
    colorElem.classList.add("active");

    modalPriorityColor = colorElem.classList[0];
  });
});

// Generating a Ticket

modalCont.addEventListener("keydown", function (e) {
  let key = e.key;

  if (key == "Shift") {
    createTicket(modalPriorityColor, taskAreaCont.value); // this function will generate the ticket
    modalCont.style.display = "none";
    addFlag = false;
    taskAreaCont.value = ''
  }
});

function createTicket(ticketKaColorClass, task) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");

  ticketCont.innerHTML = `<div class="ticket-color ${ticketKaColorClass} "></div>
  <div class="ticket-id"></div>
  <div class="task-area">${task}</div>`;

  mainCont.appendChild(ticketCont);

  handleRemoval(ticketCont)
}

RemoveButton.addEventListener('click', function () {


  mainCont.classList.add('floatclass')
  removeFlag = !removeFlag
  if (removeFlag == true) {
    RemoveButton.style.color = 'red'
  }
  else {
    RemoveButton.style.color = 'white'
  }
})

function handleRemoval(ticket) {


  ticket.addEventListener('click', function () {
    if (removeFlag == true) {

      ticket.remove()
    }
  })
}

