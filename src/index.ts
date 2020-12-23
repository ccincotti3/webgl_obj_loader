import getGLInstance from "./gl";
import MainObjectProgram from "./programs/mainObject";
import Renderer from "./renderer";
import Model from "./model";
import { Camera, CameraController } from "./camera";
import { Matrix4 } from "../vendor/math";
import islandFile from "../assets/island.obj";
// import pirateFile from "../assets/pirate.obj";
// import testTextureFile from "../assets/texture_test.jpg";
// import pirateTextureFile from "../assets/pirate.png";
import cubeFile from "../assets/cube.obj";
import Dropbox from "./dropbox";

const CANVAS_ID = "gl";

const index = function () {
  const gl = getGLInstance(CANVAS_ID);
  let model: Model | null = null;
  let isStartingCube = true;
  const dropbox = new Dropbox("drop_zone", (data: string) => {
    model = Model.create(gl, data);
    model?.setPosition(0, 0, 0);
    console.log("loaded")
    isStartingCube = false;
  });

  gl.setWindowSize(1, 1).setClearColor(0, 0, 0, 0);

  const shader = new MainObjectProgram(gl);

  fetch(cubeFile)
    .then((r) => r.text())
    .then((data) => {
      if (!data) {
        alert("Object data not found");
        return null;
      }

      model = Model.create(gl, data);
      isStartingCube = true;

      // fetch(islandFile)
      //   .then((img) => img.blob())
      //   .then((blob) => {
      //     const url = URL.createObjectURL(blob);
      //     const img = new Image();
      //     img.onload = () => {
      //       const texture = gl.loadTexture("texture", img, true);
      //       if (texture) {
      //         shader.setTextureID(texture);
      //       }

      //       URL.revokeObjectURL(url);
      //       loaded = true;
      //     };
      //     img.src = url;
      //   });
    });

  const camera = new Camera(gl);
  camera.setPosition(0, 0, 5.0);
  new CameraController(gl, camera);

  const renderer = new Renderer(gl);

  // TODO: if we add auto rotate again, need to rethink fps cb location.
  const rendererCallBack = () => {
    if (!model) {
      return;
    }
    if (isStartingCube) {
      camera.addRotation(0, 0.1, 0);
    }
    model.updateViewMatrix();
    camera.updateViewMatrix();
    // calculate MVP
    const mvpData = Matrix4.identity();
    Matrix4.mult(mvpData, camera.projectionMatrix.raw, camera.viewMatrixState);
    Matrix4.mult(mvpData, mvpData, model.transform.viewMatrix.raw);

    shader.activate().preRender(mvpData).render(model).deactivate();
  };

  renderer.clear();
  renderer.draw(rendererCallBack);
};

window.onload = () => index();
