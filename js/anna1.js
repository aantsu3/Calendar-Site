const locale = window.navigator.language || 'en-us';
const list = document.querySelector('.todo-list');
let todoItems = [];

let date = new Date();
let dayNum = date.getDate();
let month = date.getMonth();
let dayName = date.toLocaleString(locale, { weekday: 'long' });
let monthName = date.toLocaleString(locale, { month: 'long' });
let year = date.getFullYear();

let id = +localStorage.getItem('Id');
if(id === null){
    localStorage.setItem('Id', 0);   
    id = 0; 
}
// Yes = 0, No = 1
let initDays = localStorage.getItem('dayCount');
if(initDays === null){
    localStorage.setItem('dayCount', 0);
}

//TODO: Не работает
todoItems = localStorage.getItem('todos');
 if(todoItems === null){
     todoItems = [];
}
 else{
    todoItems=[];
    let a = localStorage.getItem('todos');
    const todos = JSON.parse(a);
    todos.forEach(item=>{
        todoItems.push(item);
        renderTodo(item);        
    });
    
    // for(i=0;i<todos.length;i++){
    //     addTodo(todos[i].text);
    //     let todo = todos[i];
    // }
}


function clearTodo(){
    todoItems = [];
    let listItems = document.querySelectorAll('#todo li');
    listItems.forEach(item =>{
        if(item != undefined)
            item.parentNode.removeChild(item);
    });    
}
function renderTodo(todo){
    const item = document.querySelector(`[data-key='${todo.id}']`);
    const isChecked = todo.checked ? 'done' : ''
    const textDecoration = todo.checked ? 'text-decoration: line-through' : 'text-decoration: none'
    const node = document.createElement('li');
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <div class="liCheckbox">
        <input id="${todo.id}" type="checkbox" />
        <label for="${todo.id}" class="tick js-tick" onclick="chekedClick(this)"></label>       
        <span style="${textDecoration}; margin: 0 0 0 10px;">${todo.text}</span>
        <div id="${todo.id}" class="batsu" onclick="deleteTodo(this)">×</div>
    </div>`;

    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    } 
}


function addTodo(text){
    let todos = localStorage.getItem('todos');
    id++;
    const todo = {
        text,
        checked: false,
        //id: Date.now(),
        id
      };
      
      localStorage.setItem('Id', id);
      if(todoItems.length>2) return;            
      todoItems.push(todo);
      localStorage.setItem('todos', JSON.stringify(todoItems));
      renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function chekedClick(event){
    //const itemKey = event.control.id;
    toggleDone(event.htmlFor);
}

function deleteTodo(e){
    let listItems = document.querySelectorAll('#todo li');
    // let index = -1;
    // for(let i = 0; i<listItems.length; i++){
    //     index = i;        
    //     if(listItems[i].id===+e.id) {
    //         break;
    //     }
        
    // }    
    const todos = JSON.parse(localStorage.getItem('todos'));
    const index = todoItems.findIndex(item => item.id === +e.id);
    listItems[index].remove();
    //todoItems.pop(todoItems[index]);
    todoItems.splice(index,1);
    //Удалить из localStorage
    todos.splice(index,1)
    let newTodoList = JSON.stringify(todoItems);
    localStorage.setItem('todos', newTodoList);
    console.log(listItems);
}

document.addEventListener('submit', event=>{
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    let text = input.value.trim();
    if(text!==''){
        addTodo(text);
        input.value='';
        input.focus();
    }
});

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getNewDate(state) {
    if(state === 1){
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
    }
    else {
        if(dayNum===1 && month > 0)
        {
            month--;
        } else if (dayNum === 1 && month === 0) {
            month = 11;
        }
        if(dayNum === 1 && month === 11)
        {
            year--;
        }
        if(dayNum===1){
            dayNum = daysInMonth(month,year);
        }        
        else{
            dayNum--;
        }
    }
    const newDate = new Date(year, month, dayNum);
    dayName = newDate.toLocaleString('en-us', { weekday: 'long' });
    monthName = newDate.toLocaleString('en-us', { month: 'long' });
}

const Cal = function(divId){
    this.divId = divId;    
    const newDate = new Date(year, month, dayNum);
    dayName = newDate.toLocaleString('en-us', { weekday: 'long' });
    monthName = newDate.toLocaleString('en-us', { month: 'long' });
    this.showMonth();
}

Cal.prototype.nextMonth = function() {
    getNewDate(1);
    this.showMonth();
};

Cal.prototype.previousMonth = function() {
    getNewDate(0);
    this.showMonth();
};

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Cal.prototype.showMonth = function(date) {
    let html1 = `
    <div class="data">
        <div class="month">
            <p>${monthName}</p>
        </div>
        <div class="day">
            <p>${dayNum}</p>
        </div>
        <div class="weekday">
            <p>${dayName}</p>
        </div>
    </div>
    <div class="year">
        <p>${year}</p>
    </div>    
    `;  
    document.getElementById(this.divId).innerHTML = html1;
}

window.onload = function(){
    
    let c = new Cal("divCal");

    getId("btnNext").onclick = function(e){
        if(todoItems.length===0){
            e.preventDefault();
            return;
        }
        let result = todoItems.find((o)=>{
            if(o.checked === false) return true;
        });
        // if(result!==undefined){
        //     e.preventDefault();
        //     return;
        // }
        if(result === undefined){
            let days = localStorage.getItem('dayCount');
            days++;
            localStorage.setItem('dayCount', days);
            clearTodo();
            c.nextMonth();
            localStorage.removeItem('todos');
            e.preventDefault();
        }
    }
    // getId("btnPrev").onclick = function(){
    //     c.previousMonth();
    // }
}

function getId(id){
    return document.getElementById(id);
}