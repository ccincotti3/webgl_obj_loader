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

    return this;
  };

  gl.createMeshVAO = function (
    name: string,
    indices: Uint16Array,
    vertices: Float32Array,
    norms: Float32Array,
    uvs: Float32Array
  ): MeshObject {
    const ATTR_POSITION_NAME = "a_position";
    const ATTR_POSITION_LOC = 0;
    const ATTR_NORMAL_NAME = "a_norm";
    const ATTR_NORMAL_LOC = 1;
    const ATTR_UV_NAME = "a_uv";
    const ATTR_UV_LOC = 2;

    const vao = gl.createVertexArray();
    let vboVertices = null;
    let vboNormals = null;
    let vboUVs = null;
    let ibo = null;

    gl.bindVertexArray(vao);

    if (vertices) {
      vboVertices = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vboVertices);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(ATTR_POSITION_LOC);
      gl.vertexAttribPointer(ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
    }

    if (norms) {
      vboNormals = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vboNormals);
      gl.bufferData(gl.ARRAY_BUFFER, norms, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(ATTR_POSITION_LOC);
      gl.vertexAttribPointer(ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
    }
    if (uvs) {
      vboUVs = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vboUVs);
      gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(ATTR_POSITION_LOC);
      gl.vertexAttribPointer(ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
    }

    if (indices) {
      ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }

    return {
      name,
      vao,
      vboVertices,
      vboNormals,
      vboUVs,
      ibo,
    };
  };

  return gl;
}

export default GLInstance;
