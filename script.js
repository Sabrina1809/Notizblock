let noteTitleInput = document.getElementById("note_title_input");
let noteTextInput = document.getElementById("note_text_input");
let titleArray = [];
let noteArray = [];
let titleArrayDone = [];
let noteArrayDone = [];
let notesCtn = document.getElementById("note_ctn");
let notesCtnDone = document.getElementById("note_ctn_done");

function init() {
    getItemFromLocalStorage();
    getItemDoneFromLocalStorage();
    render();
    renderDone();
}

function setItemToLocalStorage() {
    localStorage.setItem("titleArray", JSON.stringify(titleArray));
    localStorage.setItem("noteArray", JSON.stringify(noteArray));
    localStorage.setItem("titleArrayDone", JSON.stringify(titleArrayDone));
    localStorage.setItem("noteArrayDone", JSON.stringify(noteArrayDone));
}

function getItemFromLocalStorage() {
    let myTitleArray = JSON.parse(localStorage.getItem("titleArray"));
    let myNoteArray = JSON.parse(localStorage.getItem("noteArray"));
    if (myTitleArray !== null) {
        titleArray = myTitleArray
    }
    if (myNoteArray !== null) {
        noteArray = myNoteArray
    }
}

function getItemDoneFromLocalStorage() {
    let myTitleArrayDone = JSON.parse(localStorage.getItem("titleArrayDone"));
    let myNoteArrayDone = JSON.parse(localStorage.getItem("noteArrayDone"));
    if (myTitleArrayDone !== null) {
        titleArrayDone = myTitleArrayDone
    }
    if (myNoteArrayDone !== null) {
        noteArrayDone = myNoteArrayDone
    }
}

function saveInput() {
    if (noteTitleInput.value == "" || noteTextInput.value == "") {
        document.getElementById("error_text").innerHTML = "Titel und Notiz ausfüllen."
    } else {
        titleArray.push(noteTitleInput.value);
        noteArray.push(noteTextInput.value);
    
        setItemToLocalStorage();
        render();
    
        noteTitleInput.value = "";
        noteTextInput.value = "";
        document.getElementById("error_text").innerHTML = "";
    }
}

function render() {
    notesCtn.innerHTML = "";
    for (let i = 0; i < titleArray.length; i++) {
        notesCtn.innerHTML += `<div class="single_note"> <button class="button button_to_delete"><img onclick="deleteOpenNote(${i})" src="./assets/icon/icons8-müll-löschen-32.png" alt="Icon Mülleimer - löschen"></button>
                <div class="single_note_text"><span class="note_title">${titleArray[i]}: </span><span class="note_text">${noteArray[i]}</span></div>
                <button class="button"><img onclick="noteIsDone(${i})" src="./assets/icon/icons8-aufgabe-abgeschlossen-32.png" alt="Icon Häkchen - erledigt"></button></div>`
    }
    setHeightToBackground()  
} 

function renderDone() {
    notesCtnDone.innerHTML = "";
    for (let i = 0; i < titleArrayDone.length; i++) {
        notesCtnDone.innerHTML += `<div class="single_note"><button class="button button_to_delete"><img onclick="deleteDoneNote(${i})" src="./assets/icon/icons8-müll-löschen-32.png" alt="Icon Mülleimer - löschen"></button>
                <div class="single_note_text"><span class="note_title">${titleArrayDone[i]}: </span><span class="note_text">${noteArrayDone[i]}</span></div>
                <button class="button button_to_top"><img onclick="bringNoteBack(${i})" src="./assets/icon/icons8-eingekreist-oben-2-32.png" alt="Icon Pfeil hoch - zurückholen"></button><div>`
    }
    setHeightToBackground()  
}

function noteIsDone(i) {
    let doneNoteTitle = titleArray.splice(i, 1);
    let doneNoteText = noteArray.splice(i, 1);
    titleArrayDone.push(doneNoteTitle[0]);
    noteArrayDone.push(doneNoteText[0]);

    setItemToLocalStorage();
    render();
    renderDone();
}

function bringNoteBack(i) {
    let bringBackNoteTitle = titleArrayDone.splice(i, 1);
    let bringBackNoteText = noteArrayDone.splice(i, 1);
    titleArray.push(bringBackNoteTitle[0])
    noteArray.push(bringBackNoteText[0])

    setItemToLocalStorage();
    render();
    renderDone();
}

function deleteOpenNote(i) {
    let noteTitleOpenToDelete = titleArray.splice(i, 1);
    let noteTextOpenToDelete = noteArray.splice(i, 1);
    setItemToLocalStorage();
    render();
}

function deleteDoneNote(i) {
    let noteTitleDoneToDelete = titleArrayDone.splice(i, 1);
    let noteTextDoneToDelete = noteArrayDone.splice(i, 1);
    setItemToLocalStorage();
    renderDone();
}

function setHeightToBackground() {
    let backgroundTopHeight = document.getElementById("ctn_background_pages_top").offsetHeight;
    document.getElementById("ctn_background_pages_middle").style.height = `${backgroundTopHeight}px`;
    document.getElementById("ctn_background_pages_bottom").style.height = `${backgroundTopHeight}px`;
}