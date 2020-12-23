import Shader from "./shader";
import { Matrix4 } from "../../vendor/math.js";

const vertexShader = <VertexShaderType>`#version 300 es
    in vec3 a_position;
    in vec3 a_normal;
    in vec2 a_uv;

    uniform mat4 u_MVP;

    out highp vec3 positionCoord;
    out highp vec3 normalCoord;
    out highp vec2 uvCoord;

    void main(void) {
        normalCoord = a_normal;
        uvCoord = a_uv;
        positionCoord = a_position;
        gl_Position = u_MVP * vec4(a_position, 1.0);
    }
`;

const fragmentShader = <FragmentShaderType>`#version 300 es
    precision highp float;

    in highp vec2 uvCoord;
    in highp vec3 normalCoord;
    in highp vec3 positionCoord;

    uniform float uUVWeight;
    uniform sampler2D uMainTex;

    out vec4 color;
    void main(void) {
        // color = vec4(textCoord, 1.0, 1.0);
        // color = texture(uMainTex, textCoord);
        color = vec4(uvCoord, 1.0, 1.0) * uUVWeight + vec4(normalCoord, 1.0) * 0.2 + vec4(positionCoord, 1.0) * 0.2;
    }
`;

export default class MainObject extends Shader {
  uvWeightPosition: WebGLUniformLocation | null;
  constructor(gl: MyWebGL2RenderingContext) {
    super(gl, vertexShader, fragmentShader);

    if (this.program) {
      this.uvWeightPosition = this.gl.getUniformLocation(
        this.program,
        "uUVWeight"
      );
    }
  }

  preRender(mvpData: Matrix4): this {
    this.gl.uniform1f(this.uvWeightPosition, 0.1);
    return super.preRender(mvpData);
  }
}
