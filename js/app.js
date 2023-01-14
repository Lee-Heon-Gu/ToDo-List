let addBtn = document.getElementById('add-btn');
let removeAll = document.getElementById('remove-all');
let removeBtn = document.querySelector('.remove');
let modifyBtn = document.querySelector('.modify');
let removeSelected = document.getElementById('remove-selected');
let inputBox = document.getElementById('input-box');
let checkBox = document.querySelector('.chk');
let todoList = document.getElementById('todo-list');
inputBox.focus();

addBtn.addEventListener('click', addTodo);

function addTodo() {
    alert('추가!');
    let li = document.createElement('li');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.classList.add('chk');
    input.addEventListener('click', completeTodo);
    li.appendChild(input);

    let span = document.createElement('span');
    span.textContent = inputBox.value;
    span.style.marginLeft = '5px';
    li.appendChild(span);

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
    let chkList = document.getElementsByClassName('chk');
    for (let i = (chkList.length - 1); i >= 0; i--)
    {
        if (chkList[i].checked === true)
        {
            chkList[i].parentNode.remove();
        }
    }
    inputBox.focus();
});

removeAll.addEventListener('click', function () {
    alert('전체삭제!');
    let liList = document.querySelectorAll('li');
    for (let i = 0; i <= liList.length; i++)
    {
        todoList.removeChild(todoList.lastChild);
    }
    inputBox.focus();
});

removeBtn.addEventListener('click', removeParentNode);
modifyBtn.addEventListener('click', modifyText);

function modifyText(event) {
    alert('수정!');
    let textInput = prompt('수정할 텍스트 입력');

    if (textInput !== null)
    {
        event.currentTarget.previousElementSibling.textContent = textInput;
    }
};

function removeParentNode(event) {
    alert('삭제!');
    event.currentTarget.parentNode.remove();
    inputBox.focus();
};

// enter 이벤트
inputBox.addEventListener('keyup', function (event) {
    if (event.keyCode === 13)
    {
        alert('Enter!');
        addTodo();
    }
});

checkBox.addEventListener('click', completeTodo);

function completeTodo(event) {
    console.log(event.target.checked);
    if (event.target.checked === true)
    {
        alert('complete!');
        event.target.nextElementSibling.classList.add('complete');
    }
    else
    {
        event.target.nextElementSibling.classList.remove('complete');
    }
};