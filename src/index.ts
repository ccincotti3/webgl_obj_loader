import getGLInstance from "./gl";
import { Shader } from "./shader";
import Renderer from "./renderer";
import Model from "./model";
import { Matrix4, Vector3 } from "../vendor/math";

const CANVAS_ID = "gl";

const index = function () {
  const gl = getGLInstance(CANVAS_ID);

  gl.setWindowSize(1, 1).setClearColor(1, 1, 1, 1);
  const shader = new Shader(gl);
  const program = shader.program;
  if (!program) {
    return null;
  }

  gl.useProgram(program);

  // const vertices = new Float32Array([
  //   -0.25,
  //   0,
  //   0,
  //   0,
  //   0.5 * Math.sqrt(2),
  //   0,
  //   0.25,
  //   0,
  //   0,
  //   0,
  //   -0.5 * Math.sqrt(2),
  //   0,
  // ]);

  // Coming from index.html, ideally this will be a dropzone in the future.
  const data = document.getElementById("obj_file")?.innerHTML;

  const datao = Model.loadObjectSourceToVertices(data);

  const vertices = new Float32Array(datao.vertices);

  const indices = new Uint16Array(datao.indices);
  console.log({ vertices, indices });

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const matrixPosition = gl.getUniformLocation(program, "u_MVP");

  const proj = Matrix4.identity();

  const viewProj = new Matrix4();
  Matrix4.perspective(
    viewProj.raw,
    45,
    gl.canvas.width / gl.canvas.height,
    0.1,
    100.0
  );

  viewProj.vtranslate(new Vector3(0, 0.0, -4.0));

  const mvpData = Matrix4.identity();
  Matrix4.mult(mvpData, proj, viewProj.raw);

  gl.uniformMatrix4fv(matrixPosition, false, mvpData);

  const renderer = new Renderer(gl);

  const obj = gl.createMeshVAO("object", indices, vertices, null, null);

  const rendererCallBack = () => {
    gl.bindVertexArray(obj.vao);
    gl.enableVertexAttribArray(positionLocation);
  };

  renderer.clear();
  renderer.draw(rendererCallBack);
};

window.onload = () => index();
