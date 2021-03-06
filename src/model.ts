import Transformable from "./transformable";
export default class Model extends Transformable {
  mesh: MeshObject;
  constructor(mesh: MeshObject) {
    super();
    this.mesh = mesh;
  }

  static create = (
    gl: MyWebGL2RenderingContext,
    data: string
  ): Model | null => {
    const { vertices, indices, uvs, norms } = Model.loadObjectSourceToVertices(
      data
    );
    if (vertices.length === 0 || indices.length === 0) {
      console.error("Data is malformed.");
      return null;
    }
    const mesh = gl.createMeshVAO("object", indices, vertices, norms, uvs);
    return new Model(mesh);
  };

  // Need to build triangles from our object data.
  static loadObjectSourceToVertices = (source: string, flipYUV = false) => {
    // Coming from index.html, ideally this will be a dropzone in the future.
    const lines = source?.split("\n");

    // Store what's in the object file here
    const sourceVertices: number[][] = [];
    const sourceUV: number[][] = [];
    const sourceNormals: number[][] = [];

    const finalVertices: number[] = []; // float32
    const finalUV: number[] = []; // float32
    const finalNormals: number[] = []; //float32
    const finalIndices: number[] = []; //uInt16

    const cache: { [vertices: string]: number } = {};
    let cnt = 0;

    lines?.forEach((untrimmedLine) => {
      const line = untrimmedLine.trim(); // remove whitespace
      const splitLine = line.split(" ");
      const startingChar = splitLine[0];
      switch (startingChar) {
        case "v":
          sourceVertices.push(splitLine.slice(1).map(parseFloat)); // get the verts
          break;
        case "vn":
          sourceNormals.push(splitLine.slice(1).map(parseFloat)); // get the normals
          break;
        case "vt":
          sourceUV.push(
            splitLine.slice(1).map((val, i) => {
              const correctVal =
                i == 1 && flipYUV ? String(1 - Number(val)) : val;
              return parseFloat(correctVal);
            })
          ); // get the UV coord
          break;
        case "f": {
          const indices = splitLine
            .slice(1)
            .map((inds) => inds.split("/"))
            .map((inds) => {
              const [vI, uvI, nI] = inds;
              return [
                vI ? Number(vI) - 1 : null,
                uvI ? Number(uvI) - 1 : null,
                nI ? Number(nI) - 1 : null,
              ];
            });
          const isQuad = indices.length > 3;
          const lastFace = isQuad ? indices.pop() : undefined;

          // Push in the verts of the triangle
          indices.forEach((i) => {
            const keyForCache = String(i);
            const cachedIndex = cache[keyForCache];
            if (cachedIndex !== undefined) {
              finalIndices.push(cachedIndex);
            } else {
              const [vI, uvI, nI] = i;
              finalIndices.push(cnt);
              if (vI !== null) {
                finalVertices.push(...sourceVertices[vI]);
              }
              if (uvI !== null) {
                finalUV.push(...sourceUV[uvI]);
              }
              if (nI !== null) {
                finalNormals.push(...sourceNormals[nI]);
              }
              cache[keyForCache] = cnt;
              cnt += 1;
            }
          });

          // add the second triangle and last vert if quad
          if (lastFace) {
            const keyForCache = String(lastFace);
            const cachedIndex = cache[keyForCache];
            if (cachedIndex !== undefined) {
              finalIndices.push(
                finalIndices[finalIndices.length - 1],
                cachedIndex,
                finalIndices[finalIndices.length - 3]
              );
            } else {
              finalIndices.push(
                finalIndices[finalIndices.length - 1],
                cnt,
                finalIndices[finalIndices.length - 3]
              );
              const [vI, uvI, nI] = lastFace;
              if (vI !== null) {
                finalVertices.push(...sourceVertices[vI]);
              }
              if (uvI !== null) {
                finalUV.push(...sourceUV[uvI]);
              }
              if (nI !== null) {
                finalNormals.push(...sourceNormals[nI]);
              }
              cnt += 1;
            }
          }
          break;
        }
      }
    });

    console.log({
      sourceVertices,
      finalIndices,
      finalVertices,
      sourceUV,
      finalUV,
      finalNormals,
    });

    return {
      vertices: finalVertices,
      indices: finalIndices,
      uvs: finalUV,
      norms: finalNormals,
    };
  };
}
