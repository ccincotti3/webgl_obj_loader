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

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

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
    name,
    indices,
    vertices,
    norms,
    uvs
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
    let indexCount = null;

    gl.bindVertexArray(vao);

    if (vertices) {
      const data =
        vertices instanceof Float32Array
          ? vertices
          : new Float32Array(vertices);
      vboVertices = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vboVertices);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
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
      gl.vertexAttribPointer(ATTR_POSITION_LOC, 2, gl.FLOAT, false, 0, 0);
    }

    if (indices) {
      const data =
        indices instanceof Uint16Array ? indices : new Uint16Array(indices);
      indexCount = indices.length;
      ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    return {
      name,
      vao,
      vboVertices,
      vboNormals,
      vboUVs,
      ibo,
      indexCount,
    };
  };

  gl.loadTexture = function (name, image, flipY) {
    const textureBuffer = this.createTexture();
    // Flipping the y coord of UV's, make this user configerable since Blender does UV's this way, but IDK about others.
    if (flipY) {
      this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, true);
    }

    this.bindTexture(this.TEXTURE_2D, textureBuffer);
    this.texImage2D(
      this.TEXTURE_2D,
      0,
      this.RGBA,
      this.RGBA,
      this.UNSIGNED_BYTE,
      image
    );

    this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MAG_FILTER, this.LINEAR);
    this.texParameteri(
      this.TEXTURE_2D,
      this.TEXTURE_MIN_FILTER,
      this.LINEAR_MIPMAP_NEAREST
    );
    this.generateMipmap(this.TEXTURE_2D);

    this.bindTexture(this.TEXTURE_2D, null);

    // flip back
    if (flipY) {
      this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, true);
    }

    return textureBuffer;
  };

  return gl;
}

export default GLInstance;
