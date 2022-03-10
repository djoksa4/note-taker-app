class View {
  // DOM selectors
  #textAreaElement = document.querySelector("#note__textarea");
  #addNoteButton = document.querySelector(".btn--add__note");
  #noteAreaElement = document.querySelector(".note__area");
  #modal = document.querySelector(".modal");
  #overlay = document.querySelector(".overlay");
  #closeModalBtn = document.querySelector(".close-modal");

  #data;
  #noNotes = "<p>No notes added yet!</p>";

  // Subsriber Publisher handlers
  addHandleAddNoteClick(handler) {
    this.#addNoteButton.addEventListener(
      "click",
      function () {
        const input = this.#textAreaElement.value;
        this.#textAreaElement.value = "";
        this.#textAreaElement.focus();
        if (input.trim() === "") return;
        handler(input);
      }.bind(this)
    );
  }

  addHandleAddNoteEnter(handler) {
    document.addEventListener(
      "keydown",
      function (e) {
        if (
          this.#textAreaElement !== document.activeElement ||
          e.key !== "Enter"
        )
          return;
        const input = this.#textAreaElement.value;
        e.preventDefault();
        this.#textAreaElement.value = "";
        this.#textAreaElement.focus();
        if (input.trim() === "") return;
        handler(input);
      }.bind(this)
    );
  }

  addHandleViewDetails() {
    this.#noteAreaElement.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".btn--view__details");
        if (!btn) return;
        const noteEl = btn.parentElement;

        const title = noteEl.querySelector("h3").textContent;
        const note = noteEl.querySelector("p").textContent;
        this.#modal.querySelector("h1").textContent = title;
        this.#modal.querySelector("p").textContent = note;

        this.#openModal();
      }.bind(this)
    );
  }

  addHandleCloseModalButton() {
    this.#closeModalBtn.addEventListener(
      "click",
      function () {
        this.#closeModal();
      }.bind(this)
    );
  }

  addHandleCloseModalOutside() {
    this.#overlay.addEventListener("click", this.#closeModal.bind(this));
  }

  addHandleCloseModalEscape() {
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Escape" && !this.#modal.classList.contains("hidden")) {
          this.#closeModal();
        }
      }.bind(this)
    );
  }

  addhandleRemoveNote(handler) {
    this.#noteAreaElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--delete");
      if (!btn) return;
      const noteEl = btn.parentElement;
      handler(+noteEl.dataset.noteNumber);
    });
  }

  // Rendering methods
  render(data) {
    this.#data = data;
    this.#noteAreaElement.innerHTML = "";

    const markup = this.#generateMarkup();
    this.#noteAreaElement.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    let markup = "";
    this.#data.forEach((cur, i) => {
      markup += `
            <div class="note" data-note-number="${i + 1}">
                <h3>Note ${i + 1}</h3>
                <p>${cur}</p>
                <button class="btn--view__details">View Details</button>
                <button class="btn--delete">Delete</button>
            </div>
            `;
    });
    return markup;
  }

  lastNoteRemoved() {
    this.#noteAreaElement.insertAdjacentHTML("afterbegin", this.#noNotes);
  }

  // Helpers
  #openModal() {
    this.#modal.classList.remove("hidden");
    this.#overlay.classList.remove("hidden");
  }

  #closeModal() {
    this.#modal.classList.add("hidden");
    this.#overlay.classList.add("hidden");
  }
}

export default new View();
