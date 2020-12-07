class Model {
  mesh: MeshObject;
  constructor(mesh: MeshObject) {
    this.mesh = mesh;
  }

  // Need to build triangles from our object data.
  static loadObjectSourceToVertices = (source: string) => {
    // Coming from index.html, ideally this will be a dropzone in the future.
    const lines = source?.split("\n");

    // Store what's in the object file here
    const sourceVertices: number[][] = [];

    const finalVertices: number[] = []; // float32
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
        case "f": {
          const indices = splitLine
            .slice(1)
            .map((inds) => Number(inds.split("/")[0]) - 1);
          const isQuad = indices.length > 3;
          const lastIndex = isQuad ? indices.pop() : undefined;

          // Push in the verts of the triangle
          indices.forEach((i) => {
            const cachedIndex = cache[i];
            if (cachedIndex) {
              finalIndices.push(cachedIndex);
            } else {
              finalIndices.push(cnt);
              finalVertices.push(...sourceVertices[i]);
              cache[i] = cnt;
              cnt += 1;
            }
          });

          // add the second triangle and last vert if quad
          if (lastIndex) {
            const cachedIndex = cache[lastIndex];
            if (cachedIndex) {
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
              finalVertices.push(...sourceVertices[lastIndex]);
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
    });

    return {
      vertices: finalVertices,
      indices: finalIndices,
    };
  };
}

export default Model;
