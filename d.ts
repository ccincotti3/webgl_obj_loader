interface MyWebGL2RenderingContext extends WebGL2RenderingContext {
  setWindowSize(wRatio: number, hRatio: number): MyWebGL2RenderingContext;
  setClearColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): MyWebGL2RenderingContext;
  createMeshVAO(
    name: string,
    indices: Uint16Array | null,
    vertices: Float32Array | null,
    norms: Float32Array | null,
    uvs: Float32Array | null
  ): MeshObject;
}

type MeshObject = {
  name: string;
  vao: WebGLVertexArrayObject | null;
  vboVertices: WebGLBuffer | null;
  vboUVs: WebGLBuffer | null;
  vboNormals: WebGLBuffer | null;
  ibo: WebGLBuffer | null;
};
type FragmentShaderType = string;
type VertexShaderType = string;
