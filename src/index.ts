import getGLInstance from "./gl";
import { Shader } from "./shader";
import Renderer from "./renderer";
import Model from "./model";
import { Matrix4, Vector3 } from "../vendor/math";

const CANVAS_ID = "gl";

const index = function () {
  const gl = getGLInstance(CANVAS_ID);

  gl.setWindowSize(1, 1).setClearColor(1, 1, 1, 1);
  const { program } = new Shader(gl);
  if (!program) {
    return null;
  }

  gl.useProgram(program);

  // Coming from index.html, ideally this will be a dropzone in the future.
  const data = document.getElementById("obj_file")?.innerHTML;
  if (!data) {
    alert("Object data not found");
    return null;
  }

  const { vertices, indices } = Model.loadObjectSourceToVertices(data);
  const mesh = gl.createMeshVAO("object", indices, vertices, null, null);

  const model = new Model(mesh);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const matrixPosition = gl.getUniformLocation(program, "u_MVP");

  const renderer = new Renderer(gl);

  const viewProj = new Matrix4();
  const proj = new Matrix4();

  let angle = 0;

  const rendererCallBack = () => {
    Matrix4.perspective(
      viewProj.raw,
      45,
      gl.canvas.width / gl.canvas.height,
      0.1,
      100.0
    );

    viewProj
      .vtranslate(new Vector3(0, 0.0, -4.0))
      .rotateY(angle / 180)
      .rotateX(angle / 180);
    angle += 1;

    const mvpData = Matrix4.identity();
    Matrix4.mult(mvpData, proj.raw, viewProj.raw);

    gl.uniformMatrix4fv(matrixPosition, false, mvpData);
    gl.bindVertexArray(model.mesh.vao);
    gl.enableVertexAttribArray(positionLocation);
  };

  renderer.clear();
  renderer.draw(rendererCallBack);
};

window.onload = () => index();
