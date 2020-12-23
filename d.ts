interface MyWebGL2RenderingContext extends WebGL2RenderingContext {
  canvas: HTMLCanvasElement;
  setWindowSize(wRatio: number, hRatio: number): MyWebGL2RenderingContext;
  setClearColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): MyWebGL2RenderingContext;
  createMeshVAO(
    name: string,
    indices: number[] | Uint16Array | null,
    vertices: number[] | Float32Array | null,
    norms: number[] | Float32Array | null,
    uvs: number[] | Float32Array | null
  ): MeshObject;
  loadTexture(
    name: string,
    image: TexImageSource,
    flipY: boolean
  ): WebGLTexture | null;
}

type MeshObject = {
  name: string;
  vao: WebGLVertexArrayObject | null;
  vboVertices: WebGLBuffer | null;
  vboUVs: WebGLBuffer | null;
  vboNormals: WebGLBuffer | null;
  ibo: WebGLBuffer | null;
  indexCount: number | null;
};
type FragmentShaderType = string;
type VertexShaderType = string;
