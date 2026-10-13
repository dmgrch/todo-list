document.documentElement.lang = "ru";
document.title = "To-Do List";

const viewport = document.createElement("meta");
viewport.name = "viewport";
viewport.content = "width=device-width, initial-scale=1.0";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "css/style.css";

document.head.append(viewport, styleLink);

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