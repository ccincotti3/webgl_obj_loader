import { Matrix4, Vector3 } from "../vendor/math";
import withTransform, { TransformType } from "./decorators/withTransform";

@withTransform
export class Camera {
  transform: TransformType;
  projectionMatrix: Matrix4;
  viewMatrix: Matrix4;
  viewMatrixState: Matrix4;
  resetMatrix: () => Matrix4;
  constructor(
    gl: MyWebGL2RenderingContext,
    transform: TransformType,
    fov = 45,
    near = 0.1,
    far = 100.0
  ) {
    this.transform = transform;

    this.viewMatrixState = new Float32Array(16); // Cache current state
    this.resetMatrix = this._setPerspective(gl, fov, near, far);
    this.projectionMatrix = this.resetMatrix();
  }

  _setPerspective = (gl, fov, near, far) => {
    return () => {
      const projectionMatrix = new Matrix4();
      Matrix4.perspective(
        projectionMatrix.raw,
        fov,
        gl.canvas.width / gl.canvas.height,
        near,
        far
      );
      return projectionMatrix;
    };
  };

  panX(velocity: number) {
    this.transform.position.x += this.transform.right[0] * velocity;
  }
  panY(velocity: number) {
    this.transform.position.y += this.transform.up[1] * velocity;
  }
  panZ(velocity: number) {
    this.transform.position.z += this.transform.forward[2] * velocity;
  }

  updateViewMatrix = () => {
    this.transform.viewMatrix
      .reset()
      .rotateX(this.transform.rotation.x * this.transform.DEG_2_RAD)
      .rotateY(this.transform.rotation.y * this.transform.DEG_2_RAD)
      .vtranslate(this.transform.position);

    this.transform.updateDirection();

    // Cameras work by doing the inverse transformation of all meshes!
    Matrix4.invert(this.viewMatrixState, this.transform.viewMatrix.raw);
    return this.viewMatrixState;
  };
}

export class CameraController {
  canvas: HTMLCanvasElement;
  camera: Camera;
  offsetX: number;
  offsetY: number;
  rotateRate: number;
  panRate: number;
  zoomRate: number;
  initX: number;
  initY: number;
  prevX: number;
  prevY: number;
  onUpHandler: (e: MouseEvent) => void;
  onMoveHandler: (e: MouseEvent) => void;
  constructor(gl: MyWebGL2RenderingContext, camera: Camera) {
    this.canvas = gl.canvas; //Need access to the canvas html element, mainly to access events
    this.camera = camera; //Reference to the camera to control

    const box = gl.canvas.getBoundingClientRect();
    this.offsetX = box.left; //Help calc global x,y mouse cords.
    this.offsetY = box.top;

    this.rotateRate = -300; //How fast to rotate, degrees per dragging delta
    this.panRate = 5; //How fast to pan, max unit per dragging delta
    this.zoomRate = 100; //How fast to zoom or can be viewed as forward/backward movement

    this.initX = 0; //Starting X,Y position on mouse down
    this.initY = 0;
    this.prevX = 0; //Previous X,Y position on mouse move
    this.prevY = 0;

    this.onUpHandler = this.onMouseUp;
    this.onMoveHandler = this.onMouseMove;

    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault(); // Need to prevent window from zooming
        this.onMouseWheel(e);
      },
      { passive: false }
    ); // Need to use preventDefault
  }

  //Transform mouse x,y cords to something useable by the canvas.
  getMouseVec2 = (e: MouseEvent): { x: number; y: number } => {
    return {
      x: e.pageX - this.offsetX,
      y: e.pageY - this.offsetY,
    };
  };

  //Begin listening for dragging movement
  onMouseDown = (e: MouseEvent): void => {
    this.initX = this.prevX = e.pageX - this.offsetX;
    this.initY = this.prevY = e.pageY - this.offsetY;

    this.canvas.addEventListener("mouseup", this.onUpHandler);
    this.canvas.addEventListener("mousemove", this.onMoveHandler);
  };

  //End listening for dragging movement
  onMouseUp = (): void => {
    this.canvas.removeEventListener("mouseup", this.onUpHandler);
    this.canvas.removeEventListener("mousemove", this.onMoveHandler);
  };

  onMouseWheel = (e: MouseWheelEvent): void => {
    const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail)); //Try to map wheel movement to a number between -1 and 1
    this.camera.panZ(delta * (this.zoomRate / this.canvas.height)); //Keep the movement speed the same, no matter the height diff
  };
  onMouseMove = (e: MouseEvent): void => {
    const x = e.pageX - this.offsetX, //Get X,y where the canvas's position is origin.
      y = e.pageY - this.offsetY,
      dx = x - this.prevX, //Difference since last mouse move
      dy = y - this.prevY;

    //When shift is being held down, we pan around else we rotate.
    if (!e.shiftKey) {
      this.camera.transform.rotation.y +=
        dx * (this.rotateRate / this.canvas.width);
      this.camera.transform.rotation.x +=
        dy * (this.rotateRate / this.canvas.height);
    } else {
      this.camera.panX(-dx * (this.panRate / this.canvas.width));
      this.camera.panY(dy * (this.panRate / this.canvas.height));
    }

    this.prevX = x;
    this.prevY = y;
  };
}
