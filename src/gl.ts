function GLInstance(id: string): MyWebGL2RenderingContext {
  const canvas = <HTMLCanvasElement>document.getElementById(id);
  const gl = <MyWebGL2RenderingContext>canvas.getContext("webgl2");

  if (!gl) {
    alert("WebGL is not found on this browser, please try another browser");
  }
  console.log("WebGL initialized successfully");

  /**
   *
   * @param wRatio width percentage of screen
   * @param hRatio height percentage of screen
   */
  gl.setWindowSize = function (wRatio = 1, hRatio = 1) {
    const w = window.innerWidth * wRatio;
    const h = window.innerHeight * hRatio;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    canvas.width = w;
    canvas.height = h;

    this.viewport(0, 0, w, h);

    return this;
  };

  gl.setClearColor = function (
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    this.clearColor(red, green, blue, alpha);
    gl.clear(this.COLOR_BUFFER_BIT);
    gl.clear(this.DEPTH_BUFFER_BIT);
    gl.clear(this.STENCIL_BUFFER_BIT);

    return this;
  };

  return gl;
}

export default GLInstance;
