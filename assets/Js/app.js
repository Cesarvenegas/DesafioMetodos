const taskInput = document.getElementById('taskInput'); 
const addButton = document.getElementById('addtask'); 
const body = document.getElementById('tableBody');
const total = document.getElementById('total');
const realizado = document.getElementById('realizado');

let task_array = [
];

const deleteTask = (id) => {
    task_array = task_array.filter((item) => item.id !== id);
    writheDate();
    countTasks();
    countProgress();
};

const actualizarTarea = (id) => {
    let tarea = task_array.find((item) => item.id === id);
    tarea.checked = !tarea.checked;
    countProgress();
};

const writheDate = () => {
    let row = '';
    task_array.forEach((item) => {
        row += `
            <tr>
                <td>${item.id}</td>
                <td>${item.descripcion}</td>
                <td>
                    <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="actualizarTarea(${item.id})">
                </td>
                <td>
                    <button onclick="deleteTask(${item.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    body.innerHTML = row;
};

const addTask = () => {
    const descripcion = taskInput.value.trim(); 
    if (descripcion !== '') {
        const id = task_array.length + 1;
        let new_task = {
            id,
            descripcion,
            checked: false,
        };
        task_array.push(new_task);
        taskInput.value = ''; 
        writheDate();
        countTasks();
    } else {
        alert('Por favor, ingrese una tarea.');
    }
    countProgress();
};

const countTasks = () => {
    total.textContent = task_array.length;
};

const countProgress = () => {
    const tasksDone = task_array.filter((item) => item.checked).length;
    realizado.textContent = tasksDone;
};


writheDate();
countTasks();
countProgress();


addButton.addEventListener('click', addTask);
