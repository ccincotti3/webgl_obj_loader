import getGLInstance from "./gl";
import { Shader } from "./shader";
import Renderer from "./renderer";
import Model from "./model";
import { Camera, CameraController } from "./camera";
import { Matrix4, Vector3 } from "../vendor/math";
import islandFile from "../assets/island.obj"
import cubeFile from "../assets/cube.obj"

const CANVAS_ID = "gl";

const index = function () {
  const gl = getGLInstance(CANVAS_ID);

  gl.setWindowSize(1, 1).setClearColor(1, 1, 1, 1);
  const shader = new Shader(gl);

  let model: Model | null = null;

  fetch(cubeFile)
    .then((r) => r.text())
    .then((data) => {
      if (!data) {
        alert("Object data not found");
        return null;
      }

      const { vertices, indices } = Model.loadObjectSourceToVertices(data);
      if (vertices.length === 0 || indices.length === 0) {
        console.error("Data is malformed.");
        return;
      }
      const mesh = gl.createMeshVAO("object", indices, vertices, null, null);

      model = new Model(mesh);
      //   const texture = gl.loadTexture("texture", image, true)
    });

  const camera = new Camera(gl);
  new CameraController(gl, camera);

  const renderer = new Renderer(gl);

  // TODO: if we add auto rotate again, need to rethink fps cb location.
  const rendererCallBack = () => {
    if (!model) {
      return;
    }
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
