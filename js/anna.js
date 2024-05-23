const pages = document.querySelector('.pages');
const locale = window.navigator.language || 'en-us';
const list = document.querySelector('.js-todo-list');
const form = document.querySelector('.flex-form-item');
const formPencil = document.querySelector('.flex-form-pencil');

let todoItems = [];

function renderTodo(todo) {
    const item = document.querySelector(`[data-key='${todo.id}']`);
    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
        <div >
            <input id="${todo.id}" type="checkbox" />
            <label for="${todo.id}" class="tick js-tick" onclick="chekedClick(this)"></label>       
            <span>${todo.text}</span>     
        </div>`;
  
    if (item) {
      list.replaceChild(node, item);
    } else {
      list.append(node);
    }    
}


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
formPencil.addEventListener('click', event=>{
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
  
    const text = input.value.trim();
    if (text !== '') {
      addTodo(text);
      input.value = '';
      input.focus();
    }
});



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

function chekedClick(event){
    const itemKey = event.control.id;
    toggleDone(itemKey);
}

  //Calendar

  let date = new Date();
  let dayNum = date.getDate();
  let month = date.getMonth();
  let dayName = date.toLocaleString(locale, { weekday: 'long' });
  let monthName = date.toLocaleString(locale, { month: 'long' });
  let year = date.getFullYear();

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
  }
  
  function updateCalendar(target) {
    let e = document.getElementById("page");
    e.classList.add('tear');
    setTimeout(() => {
    pages.removeChild(e);
    }, 800);
    renderPage();
  }  
  function renderPage() {
    const newPage = document.createElement('div');
    newPage.classList.add('page');
    newPage.innerHTML = `
        <div class="flex-container">
            <div class="flex-item flex-block">
                <ul class="todo-list js-todo-list"></ul>      
            </div>
            <div class="flex-item flex-form-container">
                <form class="flex-form-item">
                    <input class="js-todo-input" autofocus type="text" aria-label="Enter a new todo item" placeholder="E.g. Build a web app">
                </form>
                <div class="flex-form-pencil">
                    <svg class="icon pencil-icon">
                        <use xlink:href="#pencil-icon"></use>
                    </svg>
                </div>
            </div>       
        </div>    
    `;
    pages.appendChild(newPage);
    //updateCalendar(newPage);
}
const draggable = document.getElementById("page");
draggable.addEventListener('dragend', (e) => {
  draggable.style.opacity = '1';
  handleClick(e);
});



