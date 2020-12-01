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

  draw(cb: () => void): this {
    cb();

    // UNSIGNED_SHORT, not UNSIGNED_INT
    this.gl.drawElements(this.gl.TRIANGLES, 24, this.gl.UNSIGNED_SHORT, 0);

    // Cleanup
    this.gl.useProgram(null);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

    return this;
  }

  clear(): this {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    this.gl.clear(this.gl.STENCIL_BUFFER_BIT);

    return this;
  }
}

export default Renderer;
