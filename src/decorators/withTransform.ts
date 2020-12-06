import { Matrix4, Vector3 } from "../../vendor/math";

const DEG_2_RAD = Math.PI / 180;

export default function withTransform(Class) {
  return (...args) => {
    function createTransform(): TransformType {
      const position = new Vector3(0, 0, 0);
      const scale = new Vector3(1, 1, 1);
      const rotation = new Vector3(0, 0, 0);
      const viewMatrix = new Matrix4();

      // Going to store how to move.
      const right = new Vector3(0, 0, 0);
      const up = new Vector3(0, 0, 0);
      const forward = new Vector3(0, 0, 0);

      const updateDirection = () => {
        Matrix4.transformVec4(right, [1, 0, 0, 0], viewMatrix.raw); //
        Matrix4.transformVec4(up, [0, 1, 0, 0], viewMatrix.raw); //Y
        Matrix4.transformVec4(forward, [0, 0, 1, 0], viewMatrix.raw); //Z
      };

      const updateViewMatrix = () => {
        viewMatrix
          .reset() // Back to identity matrix (1, 0, 0, 0 , 1 ...)
          .vtranslate(position)
          .rotateX(rotation.x * DEG_2_RAD)
          .rotateZ(rotation.z * DEG_2_RAD)
          .rotateY(rotation.y * DEG_2_RAD)
          .vscale(scale);

        //Calculate the Normal Matrix which doesn't need translate, then transpose and inverse the mat4 to mat 3
        // this operates directly on this.matNormal
        //   Matrix4.normalMat3(matNormal, .viewMatrix.raw);

        // Determine Direction after all the transformations.
        // Operate directly on our direction vec (first arg).
      };

      return {
        position,
        scale,
        rotation,
        viewMatrix,
        right,
        up,
        forward,
        updateDirection,
        DEG_2_RAD,
      };
    }

    const transform: TransformType = createTransform();
    return new Class(args[0], transform, ...args.slice(1, args.length - 1));
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
  updateDirection: () => void;
}
