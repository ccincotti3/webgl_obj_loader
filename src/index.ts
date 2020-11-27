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
    0.5 * Math.sqrt(2),
    0,
    0.25,
    0,
    0,
    0,
    -0.5 * Math.sqrt(2),
    0,
  ]);

  const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

  const positionLocation = gl.getAttribLocation(program, "a_position");

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  // UNSIGNED_SHORT, not UNSIGNED_INT
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  // Cleanup
  gl.useProgram(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  gl.disableVertexAttribArray(positionLocation);
};

index();
