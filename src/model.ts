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
    const sourceIndices: number[][] = [];

    lines?.forEach((untrimmedLine) => {
      const line = untrimmedLine.trim(); // remove whitespace
      const splitLine = line.split(" ");
      const startingChar = splitLine[0];
      switch (startingChar) {
        case "v":
          sourceVertices.push(splitLine.slice(1, 4).map(parseFloat)); // get the verts
          break;
        case "f":
          sourceIndices.push(
            splitLine.slice(1, 5).map((inds) => Number(inds[0]) - 1)
          );
          break;
      }
    });

    // Now create what will be rendered.
    let i = 0; // keep track of the indice number that we are placing in finalIndices
    const finalVertices: number[] = []; // float32
    const finalIndices: number[] = []; //uInt16
    sourceIndices.forEach((faceIndices) => {
      const isQuad = faceIndices.length > 3;

      // Push in the verts of the triangle
      finalIndices.push(i, i + 1, i + 2);
      finalVertices.push(
        ...sourceVertices[faceIndices[0]],
        ...sourceVertices[faceIndices[1]],
        ...sourceVertices[faceIndices[2]]
      );

      // add the second triangle and last vert if quad
      if (isQuad) {
        finalIndices.push(i + 2, i + 3, i);
        finalVertices.push(...sourceVertices[faceIndices[3]]);
        i += 4;
      } else {
        i += 3;
      }
    });

    return {
      vertices: finalVertices,
      indices: finalIndices,
    };
  };
}

export default Model;
