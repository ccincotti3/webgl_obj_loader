import { Matrix4 } from "../../vendor/math.js";

export const ATTR_POSITION_NAME = "a_position";
export const ATTR_POSITION_LOC = 0;
export const ATTR_NORMAL_NAME = "a_norm";
export const ATTR_NORMAL_LOC = 1;
export const ATTR_UV_NAME = "a_uv";
export const ATTR_UV_LOC = 2;

export default class Shader {
  program: WebGLProgram | null;
  gl: MyWebGL2RenderingContext;
  matrixPosition: WebGLUniformLocation | null;
  texturePosition: WebGLUniformLocation | null;
  vertexShader: VertexShaderType;
  fragmentShader: FragmentShaderType;
  constructor(
    gl: MyWebGL2RenderingContext,
    vertexShader: VertexShaderType,
    fragmentShader: FragmentShaderType
  ) {
    const program = ShaderUtil.createProgram(gl, vertexShader, fragmentShader);
    this.program = program;

    if (this.program) {
      this.gl = gl;
      this.matrixPosition = this.gl.getUniformLocation(this.program, "u_MVP");
      this.texturePosition = this.gl.getUniformLocation(
        this.program,
        "uMainTex"
      );
    }
  }

  activate(): this {
    this.gl.useProgram(this.program);
    return this;
  }
  deactivate(): this {
    this.gl.useProgram(null);
    return this;
  }

  preRender(mvpData: Matrix4): this {
    this.gl.uniformMatrix4fv(this.matrixPosition, false, mvpData);

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureID);
    this.gl.uniform1i(this.texturePosition, 0);
    return this;
  }

  setTextureID(id: WebGLTexture): this {
    this.textureID = id;
    return this;
  }

  render(model): this {
    this.gl.bindVertexArray(model.mesh.vao);
    this.gl.enableVertexAttribArray(0);

    // UNSIGNED_SHORT, not UNSIGNED_INT
    this.gl.drawElements(
      this.gl.TRIANGLES,
      model.mesh.indexCount,
      this.gl.UNSIGNED_SHORT,
      0
    );
    return this;
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

    gl.bindAttribLocation(program, ATTR_POSITION_LOC, ATTR_POSITION_NAME);
    gl.bindAttribLocation(program, ATTR_NORMAL_LOC, ATTR_NORMAL_NAME);
    gl.bindAttribLocation(program, ATTR_UV_LOC, ATTR_UV_NAME);

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
