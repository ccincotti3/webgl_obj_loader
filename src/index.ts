import getGLInstance from "./gl";
import { Shader } from "./shader";
import Renderer from "./renderer";
import Model from "./model";
import { Camera, CameraController } from "./camera";
import { Matrix4, Vector3 } from "../vendor/math";
import islandFile from "../assets/island.obj";
import cubeFile from "../assets/cube.obj";
import testTextureFile from "../assets/texture_test.jpg";

const CANVAS_ID = "gl";

const index = function () {
  const gl = getGLInstance(CANVAS_ID);

  gl.setWindowSize(1, 1).setClearColor(1, 1, 1, 1);

  let model: Model | null = null;
  let loaded = false;
  const shader = new Shader(gl);

  fetch(cubeFile)
    .then((r) => r.text())
    .then((data) => {
      if (!data) {
        alert("Object data not found");
        return null;
      }

      const { vertices, indices, uvs } = Model.loadObjectSourceToVertices(data);
      if (vertices.length === 0 || indices.length === 0) {
        console.error("Data is malformed.");
        return;
      }
      const mesh = gl.createMeshVAO("object", indices, vertices, null, uvs);
      model = new Model(mesh);

      fetch(testTextureFile)
        .then((img) => img.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            const texture = gl.loadTexture("texture", img, true);
            if (texture) {
              console.log("Texture Loaded");
              shader.setTextureID(texture);
            }

            URL.revokeObjectURL(url);
            loaded = true;
          };
          img.src = url;
        });
    });

  const camera = new Camera(gl);
  new CameraController(gl, camera);

  const renderer = new Renderer(gl);

  // TODO: if we add auto rotate again, need to rethink fps cb location.
  const rendererCallBack = () => {
    if (!loaded) {
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
