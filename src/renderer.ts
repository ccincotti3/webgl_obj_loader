class Renderer {
  static instance: Renderer;
  static exists: boolean;
  gl: MyWebGL2RenderingContext;

  constructor(gl: MyWebGL2RenderingContext) {
    this.gl = gl;
    if (Renderer.exists) {
      return Renderer.instance;
    }
    Renderer.instance = this;
    Renderer.exists = true;
  }

  draw(cb: () => void): void {
    let then = 0;
    const loop = (now: number) => {
      cb();

      if (then === 0) {
        then = now;
      }

      const fps = 120;
      const interval = 1000 / fps;
      const delta = now - then;

      if (delta >= interval) {
        this.clear();
        cb();
        then = now - (delta % interval);
      }
      // Cleanup
      // this.gl.useProgram(null);
      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      // this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
      requestAnimationFrame(loop);
      return;
    };
    requestAnimationFrame(loop);
    return;
  }

  clear(): this {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    this.gl.clear(this.gl.STENCIL_BUFFER_BIT);

    return this;
  }
}

export default Renderer;
