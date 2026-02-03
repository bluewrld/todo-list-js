const area = document.getElementById('todo-list')
const button = document.getElementById('btn-submit')
const text = document.getElementById('todo-input')

button.addEventListener('click', clicar)

function adicionaTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (!tarefasSalvas) return;
    
    const listaDeTarefas = JSON.parse(tarefasSalvas);

    for (let tarefa of listaDeTarefas) {
        criarTarefaElement(tarefa);
    }
}

function criarTarefaElement(tarefaTexto) {
    const itemLi = document.createElement('li');
    itemLi.classList.add('todo-item');

    const spanTexto = document.createElement('span');
    spanTexto.innerText = tarefaTexto;
    spanTexto.classList.add('task-text');

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '🗑️';
    btnDelete.classList.add('delete-btn');

    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = '✏️';
    btnEdit.classList.add('edit-btn')

    btnDelete.addEventListener('click', function() {
        itemLi.remove();
        salvarTarefas();
    });

    btnEdit.addEventListener('click', function() {
        editarTarefa(itemLi, spanTexto);
    });

    itemLi.appendChild(spanTexto);
    itemLi.appendChild(btnDelete);
    itemLi.appendChild(btnEdit)

    area.appendChild(itemLi);
}

function salvarTarefas() {
    const liTarefas = area.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.querySelector('.task-text').innerText;
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
    console.log('Tarefas salvas:', tarefasJSON);
}

function editarTarefa(itemLi, spanTexto) {
    const tarefaAnterior = spanTexto.innerText;

    // Limpa o conteúdo do li
    itemLi.innerHTML = '';

    // Cria o input para edição
    const inputEditar = document.createElement('input');
    inputEditar.type = 'text';
    inputEditar.value = tarefaAnterior;
    inputEditar.className = 'input-editar';
    inputEditar.style.marginRight = '10px';

    // Botão Salvar
    const btnSalvar = document.createElement('button');
    btnSalvar.innerText = '✅';
    btnSalvar.className = 'btn-salvar';
    btnSalvar.style.marginRight = '5px';

    // Botão Cancelar
    const btnCancelar = document.createElement('button');
    btnCancelar.innerText = '❌';
    btnCancelar.className = 'btn-cancelar';

    itemLi.appendChild(inputEditar);
    itemLi.appendChild(btnSalvar);
    itemLi.appendChild(btnCancelar);

    inputEditar.focus();

    function salvarEdicao() {
        const novoTexto = inputEditar.value.trim();
        if (!novoTexto) {
            itemLi.remove();
        } else {
            spanTexto.innerText = novoTexto;
            itemLi.innerHTML = '';
            itemLi.appendChild(spanTexto);
            
            const btnDelete = document.createElement('button');
            btnDelete.innerHTML = '🗑️';
            btnDelete.classList.add('delete-btn');

            const btnEdit = document.createElement('button');
            btnEdit.innerHTML = '✏️';
            btnEdit.classList.add('edit-btn');

            btnDelete.addEventListener('click', function() {
                itemLi.remove();
                salvarTarefas();
            });

            btnEdit.addEventListener('click', function() {
                editarTarefa(itemLi, spanTexto);
            });

            itemLi.appendChild(btnDelete);
            itemLi.appendChild(btnEdit);
        }
        salvarTarefas();
    }

    function cancelarEdicao() {
        itemLi.innerHTML = '';
        itemLi.appendChild(spanTexto);
        
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = '🗑️';
        btnDelete.classList.add('delete-btn');

        const btnEdit = document.createElement('button');
        btnEdit.innerHTML = '✏️';
        btnEdit.classList.add('edit-btn');

        btnDelete.addEventListener('click', function() {
            itemLi.remove();
            salvarTarefas();
        });

        btnEdit.addEventListener('click', function() {
            editarTarefa(itemLi, spanTexto);
        });

        itemLi.appendChild(btnDelete);
        itemLi.appendChild(btnEdit);
    }

    btnSalvar.addEventListener('click', salvarEdicao);
    btnCancelar.addEventListener('click', cancelarEdicao);

    inputEditar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            salvarEdicao();
        }
        if (e.key === 'Escape') {
            cancelarEdicao();
        }
    });
}

adicionaTarefasSalvas();

function clicar(event) {
    event.preventDefault();

    if (text.value === '') {
        alert("Digite uma tarefa!");
        text.focus();
        return;
    }

    criarTarefaElement(text.value);
    text.value = '';
    text.focus();
    salvarTarefas();
}