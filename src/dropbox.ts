export default class Dropbox {
  el: HTMLElement | null;
  loadObjectCallback: Function;
  loadTextureCallback: Function;
  objectData: string;
  constructor(
    id: string,
    loadObjectCallback: Function,
    loadTextureCallback: Function
  ) {
    this.el = document.getElementById(id);
    this.loadObjectCallback = loadObjectCallback;
    this.loadTextureCallback = loadTextureCallback;
    this.objectData = "";
    if (this.el) {
      this.el.addEventListener("dragover", this.dragOverHandler.bind(this));
      this.el.addEventListener("drop", this.dropHandler.bind(this));
    }
  }
  dragOverHandler(ev: DragEvent): void {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  dropHandler(ev: DragEvent): void {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev?.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile();
          if (file && ["image/jpeg", "image/png"].includes(file.type)) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
              this.loadTextureCallback(img);
              URL.revokeObjectURL(url);
            };
            img.src = url;
          } else if (file && file.name.includes(".obj")) {
            file?.text().then((txt) => {
              this.objectData = txt;
              this.loadObjectCallback(this.objectData);
            });
            console.log("... file[" + i + "].name = " + file?.name);
          } else {
            alert(
              "File not accepted. Please confirm it is of type .obj, .png, or .jpeg"
            );
          }
        }
      }
    }
  }
}
