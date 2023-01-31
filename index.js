const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note) => {
  const noteEl = createNoteEl(note);
  appEl.insertBefore(noteEl, btnEl);
});

btnEl.addEventListener("click", addNote);

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteEl = createNoteEl(noteObj);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNote(notes);
}

function createNoteEl(noteObj) {
  console.log(noteObj.id, noteObj.content);
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = noteObj.content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(noteObj.id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(noteObj.id, noteObj.content);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}

function updateNote(id, value) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = value;
  saveNote(notes);
}

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
