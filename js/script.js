document.documentElement.lang = "ru";
document.title = "To-Do List";

const viewport = document.createElement("meta");
viewport.name = "viewport";
viewport.content = "width=device-width, initial-scale=1.0";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "css/style.css";

document.head.append(viewport, styleLink);

let tasks = [];
let editingTaskId = null;
let currentFilter = "all";
let searchText = "";
let sortDirection = "asc";

const header = document.createElement("header");
header.className = "header";

const headerContainer = document.createElement("div");
headerContainer.className = "container header__content";

const title = document.createElement("h1");
title.className = "header__title";
title.textContent = "Задачи";

headerContainer.append(title);
header.append(headerContainer);

const main = document.createElement("main");
main.className = "main";

const mainContainer = document.createElement("div");
mainContainer.className = "container";

const taskSection = document.createElement("section");
taskSection.className = "tasks-section";

const sectionTitle = document.createElement("h2");
sectionTitle.className = "tasks-section__title";
sectionTitle.textContent = "Мои задачи";

const taskForm = document.createElement("form");
taskForm.className = "task-form";

const titleLabel = document.createElement("label");
titleLabel.className = "task-form__field";

const titleLabelText = document.createElement("span");
titleLabelText.textContent = "Название задачи";

const titleInput = document.createElement("input");
titleInput.className = "task-form__input";
titleInput.type = "text";
titleInput.name = "title";
titleInput.placeholder = "Например: сделать лабораторную";
titleInput.required = true;

titleLabel.append(titleLabelText, titleInput);

const dateLabel = document.createElement("label");
dateLabel.className = "task-form__field";

const dateLabelText = document.createElement("span");
dateLabelText.textContent = "Дата";

const dateInput = document.createElement("input");
dateInput.className = "task-form__input";
dateInput.type = "date";
dateInput.name = "date";
dateInput.required = true;

dateLabel.append(dateLabelText, dateInput);

const addButton = document.createElement("button");
addButton.className = "task-form__button";
addButton.type = "submit";
addButton.textContent = "Добавить";

taskForm.append(titleLabel, dateLabel, addButton);

const toolsSection = document.createElement("section");
toolsSection.className = "tools";

const searchLabel = document.createElement("label");
searchLabel.className = "tools__search";

const searchLabelText = document.createElement("span");
searchLabelText.textContent = "Поиск";

const searchInput = document.createElement("input");
searchInput.className = "tools__search-input";
searchInput.type = "search";
searchInput.placeholder = "Поиск по названию";

searchLabel.append(searchLabelText, searchInput);

const controls = document.createElement("div");
controls.className = "tools__controls";

const filters = document.createElement("nav");
filters.className = "filters";
filters.setAttribute("aria-label", "Фильтр задач");

const allButton = document.createElement("button");
allButton.className = "filters__button filters__button--active";
allButton.type = "button";
allButton.dataset.filter = "all";
allButton.textContent = "Все";

const activeButton = document.createElement("button");
activeButton.className = "filters__button";
activeButton.type = "button";
activeButton.dataset.filter = "active";
activeButton.textContent = "Активные";

const completedButton = document.createElement("button");
completedButton.className = "filters__button";
completedButton.type = "button";
completedButton.dataset.filter = "completed";
completedButton.textContent = "Выполненные";

filters.append(allButton, activeButton, completedButton);

const sortButton = document.createElement("button");
sortButton.className = "sort-button";
sortButton.type = "button";
sortButton.dataset.sort = "asc";
sortButton.textContent = "По дате ↑";

controls.append(filters, sortButton);

toolsSection.append(searchLabel, controls);

const taskList = document.createElement("ul");
taskList.className = "task-list";

const emptyMessage = document.createElement("p");
emptyMessage.className = "task-list__empty";
emptyMessage.textContent = "Задач пока нет";

taskSection.append(
    sectionTitle,
    taskForm,
    toolsSection,
    taskList,
    emptyMessage
);

mainContainer.append(taskSection);
main.append(mainContainer);

const footer = document.createElement("footer");
footer.className = "footer";

const footerContainer = document.createElement("div");
footerContainer.className = "container";

const footerText = document.createElement("p");
footerText.textContent = "To-Do List";

footerContainer.append(footerText);
footer.append(footerContainer);

document.body.append(header, main, footer);

function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("ru-RU");
}

function createTaskElement(task) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    if (task.completed) {
        taskItem.classList.add("task-item--completed");
    }

    const taskMain = document.createElement("div");
    taskMain.className = "task-item__main";

    const checkbox = document.createElement("input");
    checkbox.className = "task-item__checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const taskContent = document.createElement("div");
    taskContent.className = "task-item__content";

    const actions = document.createElement("div");
    actions.className = "task-item__actions";

    if (editingTaskId === task.id) {
        const editTitleInput = document.createElement("input");
        editTitleInput.className = "task-item__edit-input";
        editTitleInput.type = "text";
        editTitleInput.value = task.title;

        const editDateInput = document.createElement("input");
        editDateInput.className = "task-item__edit-input";
        editDateInput.type = "date";
        editDateInput.value = task.date;

        taskContent.append(editTitleInput, editDateInput);

        const saveButton = document.createElement("button");
        saveButton.className = "task-item__save";
        saveButton.type = "button";
        saveButton.textContent = "Сохранить";

        const cancelButton = document.createElement("button");
        cancelButton.className = "task-item__cancel";
        cancelButton.type = "button";
        cancelButton.textContent = "Отмена";

        actions.append(saveButton, cancelButton);

        saveButton.addEventListener("click", () => {
            saveTaskChanges(
                task.id,
                editTitleInput.value,
                editDateInput.value
            );
        });

        cancelButton.addEventListener("click", cancelEditing);
    } else {
        const taskTitle = document.createElement("p");
        taskTitle.className = "task-item__title";
        taskTitle.textContent = task.title;

        const taskDate = document.createElement("time");
        taskDate.className = "task-item__date";
        taskDate.dateTime = task.date;
        taskDate.textContent = formatDate(task.date);

        taskContent.append(taskTitle, taskDate);

        const editButton = document.createElement("button");
        editButton.className = "task-item__edit";
        editButton.type = "button";
        editButton.textContent = "Изменить";

        const deleteButton = document.createElement("button");
        deleteButton.className = "task-item__delete";
        deleteButton.type = "button";
        deleteButton.textContent = "Удалить";

        actions.append(editButton, deleteButton);

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        editButton.addEventListener("click", () => {
            startEditing(task.id);
        });

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });
    }

    checkbox.disabled = editingTaskId === task.id;

    taskMain.append(checkbox, taskContent);
    taskItem.append(taskMain, actions);

    return taskItem;
}

function getVisibleTasks() {
    let visibleTasks = [...tasks];

    if (currentFilter === "active") {
        visibleTasks = visibleTasks.filter((task) => !task.completed);
    }

    if (currentFilter === "completed") {
        visibleTasks = visibleTasks.filter((task) => task.completed);
    }

    if (searchText) {
        visibleTasks = visibleTasks.filter((task) => {
            return task.title
                .toLowerCase()
                .includes(searchText.toLowerCase());
        });
    }

    visibleTasks.sort((firstTask, secondTask) => {
        const firstDate = new Date(firstTask.date);
        const secondDate = new Date(secondTask.date);

        if (sortDirection === "asc") {
            return firstDate - secondDate;
        }

        return secondDate - firstDate;
    });

    return visibleTasks;
}

function renderTasks() {
    taskList.innerHTML = "";

    const visibleTasks = getVisibleTasks();

    if (tasks.length === 0) {
        emptyMessage.textContent = "Задач пока нет";
        emptyMessage.style.display = "block";
        return;
    }

    if (visibleTasks.length === 0) {
        emptyMessage.textContent = "Ничего не найдено";
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    visibleTasks.forEach((task) => {
        const taskElement = createTaskElement(task);

        taskList.append(taskElement);
    });
}

function addTask(title, date) {
    const task = {
        id: Date.now(),
        title: title,
        date: date,
        completed: false
    };

    tasks.push(task);

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);

    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    renderTasks();
}

function startEditing(id) {
    editingTaskId = id;

    renderTasks();
}

function saveTaskChanges(id, newTitle, newDate) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return;
    }

    const title = newTitle.trim();

    if (!title || !newDate) {
        return;
    }

    task.title = title;
    task.date = newDate;

    editingTaskId = null;

    renderTasks();
}

function cancelEditing() {
    editingTaskId = null;

    renderTasks();
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;

    if (!title || !date) {
        return;
    }

    addTask(title, date);

    taskForm.reset();
    titleInput.focus();
});

const filterButtons = [
    allButton,
    activeButton,
    completedButton
];

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        editingTaskId = null;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("filters__button--active");
        });

        button.classList.add("filters__button--active");

        renderTasks();
    });
});

searchInput.addEventListener("input", () => {
    searchText = searchInput.value.trim();
    editingTaskId = null;

    renderTasks();
});

sortButton.addEventListener("click", () => {
    editingTaskId = null;

    if (sortDirection === "asc") {
        sortDirection = "desc";
        sortButton.textContent = "По дате ↓";
    } else {
        sortDirection = "asc";
        sortButton.textContent = "По дате ↑";
    }

    renderTasks();
});

renderTasks();