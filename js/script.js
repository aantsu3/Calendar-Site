const pages = document.querySelector('.pages');
const locale = window.navigator.language || 'en-us';
const list = document.querySelector('.js-todo-list');


/* TODO */
const todo = {
  action(e) { },
  add() { },
  create(text) { },
  init() { },
  update() { },
  save() { }
};
let todoItems = [];

function renderTodo(todo) {
  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  if (todo.deleted) {
    item.remove();
    return
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick" onclick="chekedClick(this)"></label>
    <span>${todo.text}</span>`;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}



function deleteClick(event){
  const itemKey = event.id;
  deleteTodo(itemKey);
};

function chekedClick(event){
    const itemKey = event.control.id;
    toggleDone(itemKey);
  };
/************************************************************/

let date = new Date();
let dayNum = date.getDate();
let month = date.getMonth();
let dayName = date.toLocaleString(locale, { weekday: 'long' });
let monthName = date.toLocaleString(locale, { month: 'long' });
let year = date.getFullYear();
const draggable = document.getElementById("page");
const droppable = document.getElementById('droppable');

draggable.addEventListener('dragend', (e) => {
  draggable.style.opacity = '1';
  handleClick(e);
});

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getNewDate() {
  if (dayNum < daysInMonth(month, year)) {
    dayNum++;
  } else {
    dayNum = 1;
  }
  if (dayNum === 1 && month < 11) {
    month++;
  } else if (dayNum === 1 && month === 11) {
    month = 0;
  }
  if (dayNum === 1 && month === 0) {
    year++;
  }
  const newDate = new Date(year, month, dayNum);
  dayName = newDate.toLocaleString('en-us', { weekday: 'long' });
  monthName = newDate.toLocaleString('en-us', { month: 'long' });
}

function handleClick(e) {
  getNewDate();
  const p = document.getElementById("page");
  updateCalendar(p.childNodes[0]);
  //updateCalendar(e.target);
}

function updateCalendar(target) {
  let e = document.querySelector('div.page');
    e.classList.add('tear');
    setTimeout(() => {
      pages.removeChild(e);
    }, 800);

  //renderPage();
  //renderPage1();
}

function renderPage() {
  const newPage = document.createElement('div');
  newPage.classList.add('page');
  newPage.innerHTML = `
    <table width="300px" class="fixed">
      <tr>
        <td>
          <ul class="todo-list js-todo-list"></ul>
        </td>
      </tr>
      <tr>
        <td>
          <form class="js-form">
            <input autofocus type="text" aria-label="Enter a new todo item" placeholder="E.g. Build a web app" class="js-todo-input">
          </form>      
        </td>
        <td style="text-align:right; padding: 10px;">
          <svg class="icon pencil-icon">
            <use xlink:href="#pencil-icon"></use>
          </svg>
        </td>
      </tr>
      <tr style='vertical-align:top'>
        <td width="280px">
          <p class="month">${monthName}</p>
          <p class="day">${dayNum}</p>
          <p class="day-name">${dayName}</p>
        </td>
        <td>
          <p class="year">${year}</p>
        </td>
      </tr>
    </table>      

   
  `;
  pages.appendChild(newPage);
}

function renderPage1(){
  const newPage = document.createElement('div');
  newPage.classList.add('page');
  newPage.innerHTML = `
  <div class="flex-container">
    <div class="flex-calendar">
      <div class="flex-item1">
        <div class="flex-container-todo">
          <div class="flex-block">
            <ul class="todo-list js-todo-list"></ul>
            <form class="js-form">
              <input autofocus type="text" aria-label="Enter a new todo item" placeholder="E.g. Build a web app" class="js-todo-input">
            </form> 
          </div>
        </div>
      </div>
    </div>

</div>
  `;
  pages.appendChild(newPage);
}

renderPage1();

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});