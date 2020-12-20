export default class Dropbox {
  el: HTMLElement | null;
  constructor(id: string, loadCallback: function) {
    this.el = document.getElementById(id);
    this.loadCallback = loadCallback
    if (this.el) {
      this.el.addEventListener("dragover", this.dragOverHandler.bind(this));
      this.el.addEventListener("drop", this.dropHandler.bind(this));
    }
  }
  dragOverHandler(ev: DragEvent): void {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  dropHandler(ev: DragEvent): void {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev?.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile();
          file?.text().then((txt) => {
            console.log(txt);
            this.data = txt;
            this.loadCallback(this.data)
          });
          console.log("... file[" + i + "].name = " + file?.name);
        }
      }
    } else if (ev?.dataTransfer?.files) {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log(
          "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
        );
      }
    }
  }
}
