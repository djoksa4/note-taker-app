import "core-js/stable";
import * as model from "./model.js";
import view from "./view.js";

// Adding new notes
const controlAddNote = function (input) {
  // Push the note from the input into the model.notes array
  model.notes.push(input);

  // Render all notes from the model.notes array
  view.render(model.notes);
};

// Deleting notes
const controlRemoveNote = function (noteNumber) {
  // Remove the note from the model.notes array
  const index = noteNumber - 1;
  model.notes.splice(index, 1);
  // Re-render the notes from model.notes array
  view.render(model.notes);
  if (model.notes.length < 1) {
    view.lastNoteRemoved();
  }
};

const init = function () {
  view.addHandleAddNoteClick(controlAddNote);
  view.addHandleAddNoteEnter(controlAddNote);
  view.addHandleViewDetails();
  view.addHandleCloseModalButton();
  view.addHandleCloseModalOutside();
  view.addHandleCloseModalEscape();
  view.addhandleRemoveNote(controlRemoveNote);
};
init();
