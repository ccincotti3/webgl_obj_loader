import getGlInstance from "./gl"

const CANVAS_ID = "gl"

const index = function() {
    const gl = getGlInstance(CANVAS_ID)
    return gl;
}

index();