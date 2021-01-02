import getGLInstance from "./gl";
import MainObjectProgram from "./programs/mainObject";
import Renderer from "./renderer";
import Model from "./model";
import { Camera, CameraController } from "./camera";
import { Matrix4 } from "../vendor/math";
import islandFile from "../assets/island.obj";
import pirateFile from "../assets/pirate.obj";
import pirateTextureFile from "../assets/pirate.png";
import cubeFile from "../assets/cube.obj";
import Dropbox from "./dropbox";

const CANVAS_ID = "gl";

const loadModel = (gl: MyWebGL2RenderingContext, data: string) => {
  return Model.create(gl, data);
};

const index = function () {
  let model: Model | null = null;
  let isStartingCube = <null | boolean>null;

  const gl = getGLInstance(CANVAS_ID);

  const camera = new Camera(gl);
  camera.setPosition(0, 0, 5.0);
  new CameraController(gl, camera);

  const fetchFile = (name: string) => {
    let filePath;
    let texturePath;
    let position: number[];
    switch (name) {
      case "cube":
        filePath = cubeFile;
        position = [0, 0, 5.0];
        break;
      case "pirate":
      case "pirate_with_texture":
        if (name === "pirate_with_texture") {
          texturePath = pirateTextureFile;
        }
        filePath = pirateFile;
        position = [0, 1.0, 7.0];
        break;
      case "island":
        filePath = islandFile;
        position = [0, 0, 20.0];
        break;
      case "custom":
        filePath = "";
        alert("Drag file into the center");
        position = [0, 0, 20.0];
        break;
      default:
        filePath = cubeFile;
        position = [0, 0, 5.0];
    }
    fetch(filePath)
      .then((r) => r.text())
      .then((data) => {
        if (!data) {
          alert("Object data not found");
          return null;
        }

        model = loadModel(gl, data);
        camera.initTransform().setPosition(...position);
        isStartingCube = isStartingCube === null ? true : false;

        if (texturePath) {
          fetch(texturePath)
            .then((img) => img.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              const img = new Image();
              img.onload = () => {
                const texture = gl.loadTexture("texture", img, true);
                if (texture) {
                  shader.setTextureID(texture);
                }

                URL.revokeObjectURL(url);
              };
              img.src = url;
            });
        }
      });
  };
  document
    .getElementById("model_selection")
    ?.addEventListener("change", (e) => {
      const name = e?.target?.value;
      fetchFile(name);
    });

  document.getElementById("input_group")?.addEventListener("mousedown", (e) => {
    e.stopPropagation();
  });

  window.addEventListener("resize", () => {
    gl.setWindowSize(1, 1);
  });

  fetchFile("cube");

  new Dropbox(
    "drop_zone",
    (data: string) => {
      isStartingCube = false;
      model = loadModel(gl, data);
      camera.initTransform().setPosition(0, 0, 5);
    },
    (img: Blob) => {
      const texture = gl.loadTexture("texture", img, true);
      if (texture) {
        shader.setTextureID(texture);
      }
    }
  );

  gl.setWindowSize(1, 1).setClearColor(0, 0, 0, 0);

  const shader = new MainObjectProgram(gl);
  const renderer = new Renderer(gl);

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
