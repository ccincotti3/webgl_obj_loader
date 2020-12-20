import { Matrix4, Vector3 } from "../vendor/math";

const DEG_2_RAD = Math.PI / 180;

export default class Transformable {
  transform: TransformType;
  constructor() {
    this.transform = {
      position: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 0, 0),
      viewMatrix: new Matrix4(),

      // Going to store how to move.
      right: new Vector3(0, 0, 0),
      up: new Vector3(0, 0, 0),
      forward: new Vector3(0, 0, 0),
      DEG_2_RAD: DEG_2_RAD,
    };
  }

  updateDirection = () => {
    const { right, up, forward, viewMatrix } = this.transform;
    Matrix4.transformVec4(right, [1, 0, 0, 0], viewMatrix.raw); //
    Matrix4.transformVec4(up, [0, 1, 0, 0], viewMatrix.raw); //Y
    Matrix4.transformVec4(forward, [0, 0, 1, 0], viewMatrix.raw); //Z
  };

  updateViewMatrix = () => {
    const { viewMatrix, position, rotation, scale } = this.transform;
    viewMatrix
      .reset() // Back to identity matrix (1, 0, 0, 0 , 1 ...)
      .vtranslate(position)
      .rotateX(rotation.x * DEG_2_RAD)
      .rotateZ(rotation.z * DEG_2_RAD)
      .rotateY(rotation.y * DEG_2_RAD)
      .vscale(scale);
  };
}

export interface TransformType {
  position: Vector3;
  scale: Vector3;
  rotation: Vector3;
  right: Vector3;
  up: Vector3;
  forward: Vector3;
  viewMatrix: Matrix4;
  DEG_2_RAD: number;
}
