import getGLInstance from "./gl";
import { Shader } from "./shader";
import Renderer from "./renderer";
import Model from "./model";
import { Camera, CameraController } from "./camera";
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
  const camera = new Camera(gl);
  new CameraController(gl, camera);
  const proj = new Matrix4();

  const angle = 0;

  const rendererCallBack = () => {
    // camera.projectionMatrix.vtranslate(new Vector3(0, 0.0, -4.0));
    //   .rotateY(angle / 180)
    //   .rotateX(angle / 180);
    // angle += 1;

    camera.updateViewMatrix();

    const mvpData = Matrix4.identity();

    Matrix4.mult(mvpData, camera.projectionMatrix.raw, camera.viewMatrixState);

    gl.uniformMatrix4fv(matrixPosition, false, mvpData);
    gl.bindVertexArray(model.mesh.vao);
    gl.enableVertexAttribArray(positionLocation);
  };

  renderer.clear();
  renderer.draw(rendererCallBack);
};

window.onload = () => index();
