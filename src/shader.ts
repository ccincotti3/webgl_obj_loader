const vectorShader = <VertexShaderType>`#version 300 es
    in vec4 a_position;
    void main(void) {
        gl_Position = a_position;
    }
`;

const fragmentShader = <FragmentShaderType>`#version 300 es
    precision highp float;

    out vec4 color;
    void main(void) {
        color = vec4(1.0, 0, 0, 1.0);
    }
`;

export class Shader {
  program: WebGLProgram | null;
  constructor(gl: MyWebGL2RenderingContext) {
    const program = ShaderUtil.createProgram(gl, vectorShader, fragmentShader);
    this.program = program;
  }
}

export class ShaderUtil {
  static createProgram(
    gl: MyWebGL2RenderingContext,
    vShaderSrc: string,
    vFragmentSrc: string
  ): WebGLProgram | null {
    // compile
    const vShader = ShaderUtil.compileShader(gl, gl.VERTEX_SHADER, vShaderSrc);
    const fShader = ShaderUtil.compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      vFragmentSrc
    );
    if (!(vShader && fShader)) {
      console.error("ShaderUtil.createProgram: error compiling shaders");
      return null;
    }
    const program = gl.createProgram();
    if (!program) {
      return null;
    }
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    const status = <boolean>gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!status) {
      console.error("Error linking program : ", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    // TODO - only do if debugging. wrap this in conditional
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error("Error validating program", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    // Cleanup
    gl.detachShader(program, vShader);
    gl.detachShader(program, fShader);

    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return program;
  }

  static compileShader(
    gl: MyWebGL2RenderingContext,
    type: number,
    src: FragmentShaderType | VertexShaderType
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    const status = <boolean>gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!status) {
      console.error(
        "Error compiling shader : " + src,
        gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
}
