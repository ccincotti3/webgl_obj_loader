interface MyWebGL2RenderingContext extends WebGL2RenderingContext {
  setWindowSize(wRatio: number, hRatio: number): MyWebGL2RenderingContext;
  setClearColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): MyWebGL2RenderingContext;
}

type FragmentShaderType = string;
type VertexShaderType = string;
