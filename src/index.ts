import getGLInstance from "./gl";
import { Shader } from "./shader";
import Renderer from "./renderer";

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

  const lines = data?.split("\n");
  let numberVertices: any[] = []; // will convert to floats afterward
  let indexVertices: any[] = []; // will convert to floats afterward

  lines?.forEach((untrimmedLine) => {
    const line = untrimmedLine.trim(); // remove whitespace
    const splitLine = line.split(" ");
    const startingChar = splitLine[0];
    switch (startingChar) {
      case "v":
        numberVertices = numberVertices.concat(splitLine.slice(1, 4)); // get the verts
        break;
      case "f":
        indexVertices = indexVertices.concat(
          splitLine.slice(1, 5).map((inds) => Number(inds[0]) - 1)
        );
        break;
    }
  });

  const vertices = new Float32Array(numberVertices);

  const indices = new Uint16Array(indexVertices);
  console.log({ vertices, indices });

  const positionLocation = gl.getAttribLocation(program, "a_position");

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
