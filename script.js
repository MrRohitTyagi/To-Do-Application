
let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");

let mainCont = document.querySelector(".main-cont");

let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1]; // black

let allPriorityColors = document.querySelectorAll(".priority-color");

let addFlag = false;
let TicketNumber = 0
let taskAreaCont = document.querySelector('.textarea-cont')
let toolboxColours = document.querySelectorAll('.color')

let RemoveButton = document.querySelector('.remove-btn')

let removeFlag = false;
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let ticketArr = []

// / local storage get all  tickets

if (localStorage.getItem('tickets')) {
  ticketArr = JSON.parse(localStorage.getItem('tickets'))
  ticketArr.forEach(function (tickObj) {
    createTicket(tickObj.ticketcolor, tickObj.task, tickObj.ticketID)
  })
}


for (let i = 0; i < toolboxColours.length; i++) {
  toolboxColours[i].addEventListener('click', function (e) {
    let CurrToolBoxColor = toolboxColours[i].classList[0]

    let filterTickets = ticketArr.filter(function (ticketObjects) {
      return CurrToolBoxColor === ticketObjects.ticketcolor
    })

    //remove previous tickets

    let allTickets = document.querySelectorAll('.ticket-cont')

    for (let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove()

    }
    filterTickets.forEach(function (filteredObjects) {
      createTicket(filteredObjects.ticketcolor, filteredObjects.task, filteredObjects.ticketID)
    })


  });

  toolboxColours[i].addEventListener('dblclick', function (e) {
    let allTickets = document.querySelectorAll('.ticket-cont')

    for (let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove()

    }

    ticketArr.forEach(function (ticketobj) {
      createTicket(ticketobj.ticketcolor, ticketobj.task, ticketobj.ticketID)

    })
  })


}

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
TicketPlus = document.querySelector('#add')
TicketPlus.addEventListener('click', function () {
  createTicket(modalPriorityColor, taskAreaCont.value); // this function will generate the ticket
  modalCont.style.display = "none";
  addFlag = false;
  taskAreaCont.value = ''
})

function createTicket(ticketcolor, task, ticketID) {
  let id = ticketID || shortid()
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  
  ticketCont.innerHTML = `<div class="ticket-color ${ticketcolor} "></div>
  <div class="ticket-id">Task Number : ${++TicketNumber}</div>
  <div class="task-area">${task}</div>
  <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
    
  </div>`;

  mainCont.appendChild(ticketCont);

  handleRemoval(ticketCont,id)
  // handlecolor(ticketCont,id)
  handleLock(ticketCont,id);

  if (!ticketID) {

    ticketArr.push({ ticketcolor, task, ticketID: id })
    localStorage.setItem('tickets', JSON.stringify(ticketArr))
  }
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
//remover ticket ka funnction
function handleRemoval(ticket, id) {

  ticket.addEventListener('click', function () {
    if (!removeFlag) return
    let idx = getTicketIdx(id)

    // LocalStorang ticket removal

    ticketArr.splice(idx, 1)
    let strTicketARr = JSON.stringify(ticketArr)
    localStorage.setItem('tickets',strTicketARr)

    ticket.remove()


  })
}

let toolboxBtn = document.querySelectorAll('.color')

toolboxBtn.forEach(function (btn) {
  btn.addEventListener('click', function (e) {

  })

})

function handleLock(ticket,id) {
  let TicketIDX = getTicketIdx(id)
  let ticketLockElem = ticket.querySelector(".ticket-lock");

  let ticketLock = ticketLockElem.children[0];

  let ticketTaskArea = ticket.querySelector('.task-area')

  ticketLock.addEventListener("click", function (e) {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute('contenteditable', 'true')
      handlecolor(ticket)

    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute('contenteditable', 'false')
    }
    ticketArr[TicketIDX].task = ticketTaskArea.innerText
    localStorage.setItem('tickets', JSON.stringify(ticketArr))

  });
}

function handlecolor(ticket,id) {
  let ticketColorBand = ticket.querySelector('.ticket-color')

  ticketColorBand.addEventListener('click', function () {
    let currentticketColor = ticketColorBand.classList[1]

    let Ticketidx = getTicketIdx(id)


    let currentticketColorIndex = colors.findIndex(function (color) {
      return currentticketColor === color
    })
    currentticketColorIndex++
    let newTicketColorIndex = currentticketColorIndex % colors.length
    let newTicketColor = colors[newTicketColorIndex]
    ticketColorBand.classList.remove(currentticketColor)
    ticketColorBand.classList.add(newTicketColor)

    ticketArr[Ticketidx].ticketcolor = newTicketColor
    localStorage.setItem('tickets',JSON.stringify(ticketArr))
  })

}


function getTicketIdx(id) {
  let ticketIdx = ticketArr.findIndex(function (ticketObj) {
    return ticketObj.ticketId === id
  })
  return ticketIdx
}
