let addBtn = document.getElementById('add-btn');
let removeAll = document.getElementById('remove-all');
let removeBtn = document.querySelector('.remove');
let modifyBtn = document.querySelector('.modify');
let removeSelected = document.getElementById('remove-selected');
let inputBox = document.getElementById('input-box');
let checkBox = document.querySelector('.chk');
let chkList = document.getElementsByClassName('chk');
let todoList = document.getElementById('todo-list');
inputBox.focus();

addBtn.addEventListener('click', addTodo);

function addTodo() {
    // alert('추가!');
    let li = document.createElement('li');
    li.setAttribute('data-text', inputBox.value);

    let label = document.createElement('label');
    label.classList.add('checkbox');

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.classList.add('chk');
    input.addEventListener('click', completeTodo);
    label.appendChild(input);

    let span1 = document.createElement('span');
    span1.classList.add('checkbox_icon');
    label.appendChild(span1);
    li.appendChild(label);

    let span2 = document.createElement('span');
    span2.textContent = inputBox.value;
    span2.style.marginLeft = '5px';
    li.appendChild(span2);

    let i1 = document.createElement('i');
    i1.classList.add('fa-solid', 'fa-pencil', 'fa-2x');

    let button1 = document.createElement('button');
    button1.appendChild(i1);
    button1.classList.add('modify');
    button1.addEventListener('click', modifyText);
    li.appendChild(button1);

    let i2 = document.createElement('i');
    i2.classList.add('fa-solid', 'fa-trash-can', 'fa-2x');

    let button2 = document.createElement('button');
    button2.appendChild(i2);
    button2.classList.add('remove');
    button2.addEventListener('click', removeParentNode);
    li.appendChild(button2);

    todoList.appendChild(li);

    inputBox.value = '';
    inputBox.focus();
};

removeSelected.addEventListener('click', function () {
    alert('선택삭제!');
    for (let i = (chkList.length - 1); i >= 0; i--)
    {
        if (chkList[i].checked === true)
        {
            chkList[i].parentNode.parentNode.remove();
        }
    }
    inputBox.focus();
});

removeAll.addEventListener('click', function () {
    alert('전체삭제!');
    let liList = todoList.children;
    let len = liList.length
    for (let i = 0; i < len; i++)
    { 
        todoList.removeChild(todoList.lastChild);  
    }
   
    inputBox.focus();
});

removeBtn.addEventListener('click', removeParentNode);
modifyBtn.addEventListener('click', modifyText);

function modifyText(event) {
    // alert('수정!');
    let textInput = prompt('수정할 텍스트 입력');
    let targetSpan = event.currentTarget.previousElementSibling;

    if (textInput !== null)
    {
        targetSpan.textContent = textInput;
    }
};

function removeParentNode(event) {
    // alert('삭제!');
    event.currentTarget.parentNode.remove();
    inputBox.focus();
};

// enter 이벤트
inputBox.addEventListener('keyup', function (event) {
    if (event.keyCode === 13)
    {
        // alert('Enter!');
        addTodo();
    }
});

checkBox.addEventListener('click', completeTodo);

function completeTodo(event) {
    console.log(event.target.checked);
    let targetSpan = event.target.parentNode.nextElementSibling;
    if (event.target.checked === true)
    {
        alert('complete!');
        targetSpan.classList.add('complete');
    }
    else
    {
        targetSpan.classList.remove('complete');
    }
};

// 브라우저 종료 전에 저장
window.addEventListener('beforeunload', function () {
    let dataSave = new Array();
    let liList = todoList.children;
    for (let i = 0; i < liList.length; i++)
    {
        dataSave.push({text: liList[i].dataset.text, 
                      check: chkList[i].checked});
    }
    let stringArr = JSON.stringify(dataSave);
    localStorage.setItem('todo', stringArr);
});

// 브라우저 시작 시 불러오기
function getTodo() {
    let dataSave = JSON.parse(localStorage.getItem('todo'));
    if (dataSave.length > 0)
    {
        console.log(todoList.firstElementChild);
        todoList.firstElementChild.remove();
        for (let i = 0; i < dataSave.length; i++)
        {
            inputBox.value = dataSave[i].text;
            addTodo();
            chkList[i].checked = dataSave[i].check;
            if (chkList[i].checked === true)
            {
                chkList[i].parentNode.nextElementSibling.classList.add('complete');
            }
        }
    }
};

getTodo();

function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateFormat = year+"-"+month.toString().padStart(2, '0')+"-"+day.toString().padStart(2, '0');
    
    let div = document.getElementById('date');
    div.textContent = dateFormat; 
};

getToday();