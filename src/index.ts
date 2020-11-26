import getGLInstance from "./gl";
import { Shader } from "./shader";

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

  const vertices = new Float32Array([
    -0.25,
    0,
    0,
    0,
    0.5 * Math.sqrt(3),
    0,
    0.25,
    0,
    0,
  ]);
  const positionLocation = gl.getAttribLocation(program, "a_position");

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // Cleanup
  gl.useProgram(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.disableVertexAttribArray(positionLocation);
};

index();
