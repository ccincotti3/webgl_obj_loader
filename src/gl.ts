function GLInstance(id:string) {
    const canvas = <HTMLCanvasElement>  document.getElementById(id)
    const gl = canvas.getContext("webgl2")

    if(!gl) {
        alert("WebGL is not found on this browser, please try another browser")
    }
    console.log("WebGL initialized successfully")
}

export default GLInstance