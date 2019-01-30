function createProgram(gl, vShader, fShader) {
    let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShader);
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    let program = gl.createProgram();
    if (!program) {
        return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        let error = gl.getProgramInfoLog(program);
        console.log('Failed to link program：' + error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }
    return program;
}

function loadShader(gl, type, source) {
    let shader = gl.createShader(type);
    if (shader === null) {
        console.log('unable to create shader');
        return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        let error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader:' + error);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
function initShaders(gl, vShader, fShader) {
    let program = createProgram(gl, vShader, fShader);
    if (!program) {
        console.log('Failed to create program');
        return false;
    }
    gl.useProgram(program);
    gl.program = program;

    return true;
}
export {
    initShaders
}