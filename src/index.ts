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
  const shader = new Shader(gl);

  // Coming from index.html, ideally this will be a dropzone in the future.
  const data = document.getElementById("obj_file")?.innerHTML;
  if (!data) {
    alert("Object data not found");
    return null;
  }

  const { vertices, indices } = Model.loadObjectSourceToVertices(data);
  const mesh = gl.createMeshVAO("object", indices, vertices, null, null);

  const model = new Model(mesh);

  const camera = new Camera(gl);
  new CameraController(gl, camera);

  const renderer = new Renderer(gl);

  // TODO: if we add auto rotate again, need to rethink fps cb location.
  const rendererCallBack = () => {
    camera.updateViewMatrix();
    // calculate MVP
    const mvpData = Matrix4.identity();
    Matrix4.mult(mvpData, camera.projectionMatrix.raw, camera.viewMatrixState);

    shader.activate().preRender(mvpData).render(model).deactivate();
  };

  renderer.clear();
  renderer.draw(rendererCallBack);
};

window.onload = () => index();
