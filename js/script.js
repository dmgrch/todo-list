document.documentElement.lang = "ru";
document.title = "To-Do List";

const viewport = document.createElement("meta");
viewport.name = "viewport";
viewport.content = "width=device-width, initial-scale=1.0";
document.head.append(viewport);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "css/style.css";
document.head.append(styleLink);

console.log("To-Do List is running...");