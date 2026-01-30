const area = document.getElementById('todo-list')
const button = document.getElementById('btn-submit')
const text = document.getElementById('todo-input')

button.addEventListener('click', clicar)

function clicar(event) {
    event.preventDefault();

    if (text.value === '') {
        alert("Digite uma tarefa!");
        text.focus();
        return;
    }

    const itemLi = document.createElement('li');
    itemLi.classList.add('todo-item');

    const spanTexto = document.createElement('span');
    spanTexto.innerText = text.value;
    spanTexto.classList.add('task-text');

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '🗑️';
    btnDelete.classList.add('delete-btn');

    btnDelete.addEventListener('click', function() {
        itemLi.remove();
    });

    itemLi.appendChild(spanTexto);
    itemLi.appendChild(btnDelete);

    area.appendChild(itemLi);

    text.value = '';
    text.focus();
}