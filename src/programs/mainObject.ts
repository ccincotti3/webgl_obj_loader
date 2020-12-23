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
    uniform float uNormalWeight;
    uniform float uPositionWeight;
    uniform sampler2D uMainTex;

    out vec4 color;
    void main(void) {
        // color = vec4(textCoord, 1.0, 1.0);
        // color = texture(uMainTex, textCoord);
        color = vec4(uvCoord, 1.0, 1.0) * uUVWeight 
                + vec4(normalCoord, 1.0) * uNormalWeight
                + vec4(positionCoord, 1.0) * uPositionWeight;
    }
`;

export default class MainObject extends Shader {
  uvWeightPosition: WebGLUniformLocation | null;
  normalWeightPosition: WebGLUniformLocation | null;
  positionWeightPosition: WebGLUniformLocation | null;
  constructor(gl: MyWebGL2RenderingContext) {
    super(gl, vertexShader, fragmentShader);

    if (this.program) {
      this.uvWeightPosition = this.gl.getUniformLocation(
        this.program,
        "uUVWeight"
      );
      this.normalWeightPosition = this.gl.getUniformLocation(
        this.program,
        "uNormalWeight"
      );
      this.positionWeightPosition = this.gl.getUniformLocation(
        this.program,
        "uPositionWeight"
      );
    }
  }

  preRender(mvpData: Matrix4): this {
    const uvWeight = document.querySelector("#color_uv")?.value;
    const normalWeight = document.querySelector("#color_position")?.value;
    const positionWeight = document.querySelector("#color_normals")?.value;
    this.gl.uniform1f(this.uvWeightPosition, uvWeight);
    this.gl.uniform1f(this.normalWeightPosition, normalWeight);
    this.gl.uniform1f(this.positionWeightPosition, positionWeight);
    return super.preRender(mvpData);
  }
}
