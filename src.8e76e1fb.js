parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Mfdu":[function(require,module,exports) {
"use strict";function r(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function e(r,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function t(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.ShaderUtil=exports.default=exports.ATTR_UV_LOC=exports.ATTR_UV_NAME=exports.ATTR_NORMAL_LOC=exports.ATTR_NORMAL_NAME=exports.ATTR_POSITION_LOC=exports.ATTR_POSITION_NAME=void 0;var o="a_position";exports.ATTR_POSITION_NAME=o;var a=0;exports.ATTR_POSITION_LOC=a;var i="a_norm";exports.ATTR_NORMAL_NAME=i;var n=1;exports.ATTR_NORMAL_LOC=n;var s="a_uv";exports.ATTR_UV_NAME=s;var l=2;exports.ATTR_UV_LOC=l;var u=function(){function e(t,o,a){r(this,e);var i=h.createProgram(t,o,a);this.program=i,this.program&&(this.gl=t,this.matrixPosition=this.gl.getUniformLocation(this.program,"u_MVP"),this.texturePosition=this.gl.getUniformLocation(this.program,"uMainTex"))}return t(e,[{key:"activate",value:function(){return this.gl.useProgram(this.program),this}},{key:"deactivate",value:function(){return this.gl.useProgram(null),this}},{key:"preRender",value:function(r){return this.gl.uniformMatrix4fv(this.matrixPosition,!1,r),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureID),this.gl.uniform1i(this.texturePosition,0),this}},{key:"setTextureID",value:function(r){return this.textureID=r,this}},{key:"render",value:function(r){return this.gl.bindVertexArray(r.mesh.vao),this.gl.enableVertexAttribArray(0),this.gl.drawElements(this.gl.TRIANGLES,r.mesh.indexCount,this.gl.UNSIGNED_SHORT,0),this}}]),e}();exports.default=u;var h=function(){function e(){r(this,e)}return t(e,null,[{key:"createProgram",value:function(r,t,u){var h=e.compileShader(r,r.VERTEX_SHADER,t),g=e.compileShader(r,r.FRAGMENT_SHADER,u);if(!h||!g)return console.error("ShaderUtil.createProgram: error compiling shaders"),null;var c=r.createProgram();return c?(r.attachShader(c,h),r.attachShader(c,g),r.bindAttribLocation(c,a,o),r.bindAttribLocation(c,n,i),r.bindAttribLocation(c,l,s),r.linkProgram(c),r.getProgramParameter(c,r.LINK_STATUS)?(r.validateProgram(c),r.getProgramParameter(c,r.VALIDATE_STATUS)?(r.detachShader(c,h),r.detachShader(c,g),r.deleteShader(h),r.deleteShader(g),c):(console.error("Error validating program",r.getProgramInfoLog(c)),r.deleteProgram(c),null)):(console.error("Error linking program : ",r.getProgramInfoLog(c)),r.deleteProgram(c),null)):null}},{key:"compileShader",value:function(r,e,t){var o=r.createShader(e);return o?(r.shaderSource(o,t),r.compileShader(o),r.getShaderParameter(o,r.COMPILE_STATUS)?o:(console.error("Error compiling shader : "+t,r.getShaderInfoLog(o)),r.deleteShader(o),null)):null}}]),e}();exports.ShaderUtil=h;
},{}],"EqmZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./programs/shader");function t(t){var r=document.getElementById(t),i=r.getContext("webgl2");return i||alert("WebGL is not found on this browser, please try another browser"),console.log("WebGL initialized successfully"),i.setWindowSize=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=window.innerWidth*e,n=window.innerHeight*t;return r.style.width=i+"px",r.style.height=n+"px",r.width=i,r.height=n,this.viewport(0,0,i,n),this},i.enable(i.CULL_FACE),i.enable(i.DEPTH_TEST),i.setClearColor=function(e,t,r,i){return this.clearColor(e,t,r,i),this},i.createMeshVAO=function(t,r,n,a,A){var o=i.createVertexArray(),s=null,l=null,T=null,R=null,_=null;if(i.bindVertexArray(o),n){var u=n instanceof Float32Array?n:new Float32Array(n);s=i.createBuffer(),i.bindBuffer(i.ARRAY_BUFFER,s),i.bufferData(i.ARRAY_BUFFER,u,i.STATIC_DRAW),i.enableVertexAttribArray(e.ATTR_POSITION_LOC),i.vertexAttribPointer(e.ATTR_POSITION_LOC,3,i.FLOAT,!1,0,0)}if(a){var h=a instanceof Float32Array?a:new Float32Array(a);l=i.createBuffer(),i.bindBuffer(i.ARRAY_BUFFER,l),i.bufferData(i.ARRAY_BUFFER,h,i.STATIC_DRAW),i.enableVertexAttribArray(e.ATTR_NORMAL_LOC),i.vertexAttribPointer(e.ATTR_NORMAL_LOC,3,i.FLOAT,!1,0,0)}if(A){var E=A instanceof Float32Array?A:new Float32Array(A);T=i.createBuffer(),i.bindBuffer(i.ARRAY_BUFFER,T),i.bufferData(i.ARRAY_BUFFER,E,i.STATIC_DRAW),i.enableVertexAttribArray(e.ATTR_UV_LOC),i.vertexAttribPointer(e.ATTR_UV_LOC,2,i.FLOAT,!1,0,0)}if(r){var f=r instanceof Uint16Array?r:new Uint16Array(r);_=r.length,R=i.createBuffer(),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,R),i.bufferData(i.ELEMENT_ARRAY_BUFFER,f,i.STATIC_DRAW)}return(null==A?void 0:A.length)||alert("UVs not found, please unwrap model and export .obj again."),{name:t,vao:o,vboVertices:s,vboNormals:l,vboUVs:T,ibo:R,indexCount:_}},i.loadTexture=function(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=this.createTexture();return r&&this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL,!0),this.bindTexture(this.TEXTURE_2D,i),this.texImage2D(this.TEXTURE_2D,0,this.RGBA,this.RGBA,this.UNSIGNED_BYTE,t),this.texParameteri(this.TEXTURE_2D,this.TEXTURE_MAG_FILTER,this.LINEAR),this.texParameteri(this.TEXTURE_2D,this.TEXTURE_MIN_FILTER,this.LINEAR_MIPMAP_NEAREST),this.generateMipmap(this.TEXTURE_2D),this.bindTexture(this.TEXTURE_2D,null),r&&this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL,!1),i},i}var r=t;exports.default=r;
},{"./programs/shader":"Mfdu"}],"MrFU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=t(require("./shader"));function t(o){return o&&o.__esModule?o:{default:o}}function e(o){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}function n(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}function r(o,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(o,n.key,n)}}function i(o,t,e){return t&&r(o.prototype,t),e&&r(o,e),o}function u(o,t,e){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(o,t,e){var n=c(o,t);if(n){var r=Object.getOwnPropertyDescriptor(n,t);return r.get?r.get.call(e):r.value}})(o,t,e||o)}function c(o,t){for(;!Object.prototype.hasOwnProperty.call(o,t)&&null!==(o=v(o)););return o}function l(o,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");o.prototype=Object.create(t&&t.prototype,{constructor:{value:o,writable:!0,configurable:!0}}),t&&f(o,t)}function f(o,t){return(f=Object.setPrototypeOf||function(o,t){return o.__proto__=t,o})(o,t)}function a(o){var t=h();return function(){var e,n=v(o);if(t){var r=v(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return s(this,e)}}function s(o,t){return!t||"object"!==e(t)&&"function"!=typeof t?p(o):t}function p(o){if(void 0===o)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(o){return!1}}function v(o){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}var g="#version 300 es\n    in vec3 a_position;\n    in vec3 a_normal;\n    in vec2 a_uv;\n\n    uniform mat4 u_MVP;\n\n    out highp vec3 positionCoord;\n    out highp vec3 normalCoord;\n    out highp vec2 uvCoord;\n\n    void main(void) {\n        normalCoord = a_normal;\n        uvCoord = a_uv;\n        positionCoord = a_position;\n        gl_Position = u_MVP * vec4(a_position, 1.0);\n    }\n",m="#version 300 es\n    precision highp float;\n\n    in highp vec2 uvCoord;\n    in highp vec3 normalCoord;\n    in highp vec3 positionCoord;\n\n    uniform float uUVWeight;\n    uniform float uNormalWeight;\n    uniform float uPositionWeight;\n    uniform float uTextureWeight;\n    uniform sampler2D uMainTex;\n\n    out vec4 color;\n    void main(void) {\n        color = vec4(uvCoord, 1.0, 1.0) * uUVWeight \n                + vec4(normalCoord, 1.0) * uNormalWeight\n                + vec4(positionCoord, 1.0) * uPositionWeight\n                + texture(uMainTex, uvCoord) * uTextureWeight;\n    }\n",d=function(t){l(r,o.default);var e=a(r);function r(o){var t;return n(this,r),(t=e.call(this,o,g,m)).program&&(t.uvWeightPosition=t.gl.getUniformLocation(t.program,"uUVWeight"),t.normalWeightPosition=t.gl.getUniformLocation(t.program,"uNormalWeight"),t.positionWeightPosition=t.gl.getUniformLocation(t.program,"uPositionWeight"),t.textureWeightPosition=t.gl.getUniformLocation(t.program,"uTextureWeight")),t}return i(r,[{key:"preRender",value:function(o){var t,e,n,i,c=null===(t=document.querySelector("#color_uv"))||void 0===t?void 0:t.value,l=null===(e=document.querySelector("#color_position"))||void 0===e?void 0:e.value,f=null===(n=document.querySelector("#color_normals"))||void 0===n?void 0:n.value,a=null===(i=document.querySelector("#color_texture"))||void 0===i?void 0:i.value;return this.gl.uniform1f(this.uvWeightPosition,c),this.gl.uniform1f(this.normalWeightPosition,l),this.gl.uniform1f(this.positionWeightPosition,f),this.gl.uniform1f(this.textureWeightPosition,a),u(v(r.prototype),"preRender",this).call(this,o)}}]),r}();exports.default=d;
},{"./shader":"Mfdu"}],"P5CY":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=function(){function t(n){if(e(this,t),this.gl=n,t.exists)return t.instance;t.instance=this,t.exists=!0}return n(t,[{key:"draw",value:function(e){var t=this,n=0;requestAnimationFrame(function r(i){e(),0===n&&(n=i);var a=i-n;a>=1e3/120&&(t.clear(),e(),n=i-a%(1e3/120)),requestAnimationFrame(r)})}},{key:"clear",value:function(){return this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.clear(this.gl.DEPTH_BUFFER_BIT),this.gl.clear(this.gl.STENCIL_BUFFER_BIT),this}}]),t}(),i=r;exports.default=i;
},{}],"y6ga":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Matrix4=exports.Vector3=void 0;var n=function(){function e(r,n,a){t(this,e),this.x=r||0,this.y=n||0,this.z=a||0}return r(e,[{key:"magnitude",value:function(t){if(void 0===t)return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);var e=t.x-this.x,r=t.y-this.y,n=t.y-this.z;return Math.sqrt(e*e+r*r+n*n)}},{key:"normalize",value:function(){var t=this.magnitude();return this.x/=t,this.y/=t,this.z/=t,this}},{key:"set",value:function(t,e,r){return this.x=t,this.y=e,this.z=r,this}},{key:"multiScalar",value:function(t){return this.x*=t,this.y*=t,this.z*=t,this}},{key:"getArray",value:function(){return[this.x,this.y,this.z]}},{key:"getFloatArray",value:function(){return new Float32Array([this.x,this.y,this.z])}},{key:"clone",value:function(){return new e(this.x,this.y,this.z)}}]),e}();exports.Vector3=n;var a=function(){function e(){t(this,e),this.raw=e.identity()}return r(e,[{key:"vtranslate",value:function(t){return e.translate(this.raw,t.x,t.y,t.z),this}},{key:"translate",value:function(t,r,n){return e.translate(this.raw,t,r,n),this}},{key:"rotateY",value:function(t){return e.rotateY(this.raw,t),this}},{key:"rotateX",value:function(t){return e.rotateX(this.raw,t),this}},{key:"rotateZ",value:function(t){return e.rotateZ(this.raw,t),this}},{key:"vscale",value:function(t){return e.scale(this.raw,t.x,t.y,t.z),this}},{key:"scale",value:function(t,r,n){return e.scale(this.raw,t,r,n),this}},{key:"invert",value:function(){return e.invert(this.raw),this}},{key:"resetRotation",value:function(){for(var t=0;t<this.raw.length;t++)t>=12&&t<=14||(this.raw[t]=t%5==0?1:0);return this}},{key:"reset",value:function(){for(var t=0;t<this.raw.length;t++)this.raw[t]=t%5==0?1:0;return this}}],[{key:"identity",value:function(){var t=new Float32Array(16);return t[0]=t[5]=t[10]=t[15]=1,t}},{key:"perspective",value:function(t,e,r,n,a){var i=1/Math.tan(e/2),u=1/(n-a);t[0]=i/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(a+n)*u,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*a*n*u,t[15]=0}},{key:"ortho",value:function(t,e,r,n,a,i,u){var s=1/(e-r),o=1/(n-a),h=1/(i-u);t[0]=-2*s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(e+r)*s,t[13]=(a+n)*o,t[14]=(u+i)*h,t[15]=1}},{key:"transpose",value:function(t,e){if(t===e){var r=e[1],n=e[2],a=e[3],i=e[6],u=e[7],s=e[11];t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=r,t[6]=e[9],t[7]=e[13],t[8]=n,t[9]=i,t[11]=e[14],t[12]=a,t[13]=u,t[14]=s}else t[0]=e[0],t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=e[1],t[5]=e[5],t[6]=e[9],t[7]=e[13],t[8]=e[2],t[9]=e[6],t[10]=e[10],t[11]=e[14],t[12]=e[3],t[13]=e[7],t[14]=e[11],t[15]=e[15];return t}},{key:"normalMat3",value:function(t,e){var r=e[0],n=e[1],a=e[2],i=e[3],u=e[4],s=e[5],o=e[6],h=e[7],l=e[8],c=e[9],v=e[10],y=e[11],f=e[12],k=e[13],x=e[14],w=e[15],M=r*s-n*u,p=r*o-a*u,z=r*h-i*u,d=n*o-a*s,m=n*h-i*s,g=a*h-i*o,b=l*k-c*f,A=l*x-v*f,V=l*w-y*f,q=c*x-v*k,F=c*w-y*k,X=v*w-y*x,Y=M*X-p*F+z*q+d*V-m*A+g*b;return Y?(Y=1/Y,t[0]=(s*X-o*F+h*q)*Y,t[1]=(o*V-u*X-h*A)*Y,t[2]=(u*F-s*V+h*b)*Y,t[3]=(a*F-n*X-i*q)*Y,t[4]=(r*X-a*V+i*A)*Y,t[5]=(n*V-r*F-i*b)*Y,t[6]=(k*g-x*m+w*d)*Y,t[7]=(x*z-f*g-w*p)*Y,t[8]=(f*m-k*z+w*M)*Y,t):null}},{key:"multiplyVector",value:function(t,e){var r=e[0],n=e[1],a=e[2],i=e[3],u=t[0],s=t[1],o=t[2],h=t[3],l=t[4],c=t[5],v=t[6],y=t[7],f=t[8],k=t[9],x=t[10],w=t[11];return[r*u+n*l+a*f+i*t[12],r*s+n*c+a*k+i*t[13],r*o+n*v+a*x+i*t[14],r*h+n*y+a*w+i*t[15]]}},{key:"transformVec4",value:function(t,e,r){return t[0]=r[0]*e[0]+r[4]*e[1]+r[8]*e[2]+r[12]*e[3],t[1]=r[1]*e[0]+r[5]*e[1]+r[9]*e[2]+r[13]*e[3],t[2]=r[2]*e[0]+r[6]*e[1]+r[10]*e[2]+r[14]*e[3],t[3]=r[3]*e[0]+r[7]*e[1]+r[11]*e[2]+r[15]*e[3],t}},{key:"mult",value:function(t,e,r){var n=e[0],a=e[1],i=e[2],u=e[3],s=e[4],o=e[5],h=e[6],l=e[7],c=e[8],v=e[9],y=e[10],f=e[11],k=e[12],x=e[13],w=e[14],M=e[15],p=r[0],z=r[1],d=r[2],m=r[3];return t[0]=p*n+z*s+d*c+m*k,t[1]=p*a+z*o+d*v+m*x,t[2]=p*i+z*h+d*y+m*w,t[3]=p*u+z*l+d*f+m*M,p=r[4],z=r[5],d=r[6],m=r[7],t[4]=p*n+z*s+d*c+m*k,t[5]=p*a+z*o+d*v+m*x,t[6]=p*i+z*h+d*y+m*w,t[7]=p*u+z*l+d*f+m*M,p=r[8],z=r[9],d=r[10],m=r[11],t[8]=p*n+z*s+d*c+m*k,t[9]=p*a+z*o+d*v+m*x,t[10]=p*i+z*h+d*y+m*w,t[11]=p*u+z*l+d*f+m*M,p=r[12],z=r[13],d=r[14],m=r[15],t[12]=p*n+z*s+d*c+m*k,t[13]=p*a+z*o+d*v+m*x,t[14]=p*i+z*h+d*y+m*w,t[15]=p*u+z*l+d*f+m*M,t}},{key:"scale",value:function(t,e,r,n){return t[0]*=e,t[1]*=e,t[2]*=e,t[3]*=e,t[4]*=r,t[5]*=r,t[6]*=r,t[7]*=r,t[8]*=n,t[9]*=n,t[10]*=n,t[11]*=n,t}},{key:"rotateY",value:function(t,e){var r=Math.sin(e),n=Math.cos(e),a=t[0],i=t[1],u=t[2],s=t[3],o=t[8],h=t[9],l=t[10],c=t[11];return t[0]=a*n-o*r,t[1]=i*n-h*r,t[2]=u*n-l*r,t[3]=s*n-c*r,t[8]=a*r+o*n,t[9]=i*r+h*n,t[10]=u*r+l*n,t[11]=s*r+c*n,t}},{key:"rotateX",value:function(t,e){var r=Math.sin(e),n=Math.cos(e),a=t[4],i=t[5],u=t[6],s=t[7],o=t[8],h=t[9],l=t[10],c=t[11];return t[4]=a*n+o*r,t[5]=i*n+h*r,t[6]=u*n+l*r,t[7]=s*n+c*r,t[8]=o*n-a*r,t[9]=h*n-i*r,t[10]=l*n-u*r,t[11]=c*n-s*r,t}},{key:"rotateZ",value:function(t,e){var r=Math.sin(e),n=Math.cos(e),a=t[0],i=t[1],u=t[2],s=t[3],o=t[4],h=t[5],l=t[6],c=t[7];return t[0]=a*n+o*r,t[1]=i*n+h*r,t[2]=u*n+l*r,t[3]=s*n+c*r,t[4]=o*n-a*r,t[5]=h*n-i*r,t[6]=l*n-u*r,t[7]=c*n-s*r,t}},{key:"rotate",value:function(t,e,r){var n,a,i,u,s,o,h,l,c,v,y,f,k,x,w,M,p,z,d,m,g,b,A,V,q=r[0],F=r[1],X=r[2],Y=Math.sqrt(q*q+F*F+X*X);if(Math.abs(Y)<1e-6)return null;q*=Y=1/Y,F*=Y,X*=Y,n=Math.sin(e),i=1-(a=Math.cos(e)),u=t[0],s=t[1],o=t[2],h=t[3],l=t[4],c=t[5],v=t[6],y=t[7],f=t[8],k=t[9],x=t[10],w=t[11],M=q*q*i+a,p=F*q*i+X*n,z=X*q*i-F*n,d=q*F*i-X*n,m=F*F*i+a,g=X*F*i+q*n,b=q*X*i+F*n,A=F*X*i-q*n,V=X*X*i+a,t[0]=u*M+l*p+f*z,t[1]=s*M+c*p+k*z,t[2]=o*M+v*p+x*z,t[3]=h*M+y*p+w*z,t[4]=u*d+l*m+f*g,t[5]=s*d+c*m+k*g,t[6]=o*d+v*m+x*g,t[7]=h*d+y*m+w*g,t[8]=u*b+l*A+f*V,t[9]=s*b+c*A+k*V,t[10]=o*b+v*A+x*V,t[11]=h*b+y*A+w*V}},{key:"invert",value:function(t,e){void 0===e&&(e=t);var r=e[0],n=e[1],a=e[2],i=e[3],u=e[4],s=e[5],o=e[6],h=e[7],l=e[8],c=e[9],v=e[10],y=e[11],f=e[12],k=e[13],x=e[14],w=e[15],M=r*s-n*u,p=r*o-a*u,z=r*h-i*u,d=n*o-a*s,m=n*h-i*s,g=a*h-i*o,b=l*k-c*f,A=l*x-v*f,V=l*w-y*f,q=c*x-v*k,F=c*w-y*k,X=v*w-y*x,Y=M*X-p*F+z*q+d*V-m*A+g*b;return!!Y&&(Y=1/Y,t[0]=(s*X-o*F+h*q)*Y,t[1]=(a*F-n*X-i*q)*Y,t[2]=(k*g-x*m+w*d)*Y,t[3]=(v*m-c*g-y*d)*Y,t[4]=(o*V-u*X-h*A)*Y,t[5]=(r*X-a*V+i*A)*Y,t[6]=(x*z-f*g-w*p)*Y,t[7]=(l*g-v*z+y*p)*Y,t[8]=(u*F-s*V+h*b)*Y,t[9]=(n*V-r*F-i*b)*Y,t[10]=(f*m-k*z+w*M)*Y,t[11]=(c*z-l*m-y*M)*Y,t[12]=(s*A-u*q-o*b)*Y,t[13]=(r*q-n*A+a*b)*Y,t[14]=(k*p-f*d-x*M)*Y,t[15]=(l*d-c*p+v*M)*Y,!0)}},{key:"translate",value:function(t,e,r,n){t[12]=t[0]*e+t[4]*r+t[8]*n+t[12],t[13]=t[1]*e+t[5]*r+t[9]*n+t[13],t[14]=t[2]*e+t[6]*r+t[10]*n+t[14],t[15]=t[3]*e+t[7]*r+t[11]*n+t[15]}}]),e}();exports.Matrix4=a;
},{}],"RCQZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("../vendor/math");function r(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function e(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}var o=Math.PI/180,a=function(){function e(){var n=this;r(this,e),this.updateDirection=function(){var r=n.transform,e=r.right,o=r.up,a=r.forward,i=r.viewMatrix;t.Matrix4.transformVec4(e,[1,0,0,0],i.raw),t.Matrix4.transformVec4(o,[0,1,0,0],i.raw),t.Matrix4.transformVec4(a,[0,0,1,0],i.raw)},this.updateViewMatrix=function(){var t=n.transform,r=t.viewMatrix,e=t.position,a=t.rotation,i=t.scale;r.reset().vtranslate(e).rotateX(a.x*o).rotateZ(a.z*o).rotateY(a.y*o).vscale(i)},this.initTransform()}return n(e,[{key:"initTransform",value:function(){return this.transform={position:new t.Vector3(0,0,0),scale:new t.Vector3(1,1,1),rotation:new t.Vector3(0,0,0),viewMatrix:new t.Matrix4,right:new t.Vector3(0,0,0),up:new t.Vector3(0,0,0),forward:new t.Vector3(0,0,0),DEG_2_RAD:o},this}},{key:"setPosition",value:function(t,r,e){return this.transform.position.set(t,r,e),this}},{key:"addRotation",value:function(t,r,e){return this.transform.rotation.x+=t,this.transform.rotation.y+=r,this.transform.rotation.z+=e,this}}]),e}();exports.default=a;
},{"../vendor/math":"y6ga"}],"pjIr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=e(require("./transformable"));function e(t){return t&&t.__esModule?t:{default:t}}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t){return i(t)||u(t)||c(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function i(t){if(Array.isArray(t))return f(t)}function a(t,e){return p(t)||s(t,e)||c(t,e)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"==typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,u=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(l){o=!0,u=l}finally{try{n||null==a.return||a.return()}finally{if(o)throw u}}return r}}function p(t){if(Array.isArray(t))return t}function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t){var e=g();return function(){var r,n=S(t);if(e){var o=S(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return m(this,r)}}function m(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?d(t):e}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function g(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function S(t){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var O=function(e){h(n,t.default);var r=v(n);function n(t){var e;return y(this,n),(e=r.call(this)).mesh=t,e}return n}();exports.default=O,O.create=function(t,e){var r=O.loadObjectSourceToVertices(e),n=r.vertices,o=r.indices,u=r.uvs,i=r.norms;if(0===n.length||0===o.length)return console.error("Data is malformed."),null;var a=t.createMeshVAO("object",o,n,i,u);return new O(a)},O.loadObjectSourceToVertices=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=null==t?void 0:t.split("\n"),o=[],u=[],i=[],l=[],c=[],f=[],s=[],p={},y=0;return null==r||r.forEach(function(t){var r=t.trim().split(" ");switch(r[0]){case"v":o.push(r.slice(1).map(parseFloat));break;case"vn":i.push(r.slice(1).map(parseFloat));break;case"vt":u.push(r.slice(1).map(function(t,r){var n=1==r&&e?String(1-Number(t)):t;return parseFloat(n)}));break;case"f":var h=r.slice(1).map(function(t){return t.split("/")}).map(function(t){var e=a(t,3),r=e[0],n=e[1],o=e[2];return[r?Number(r)-1:null,n?Number(n)-1:null,o?Number(o)-1:null]}),b=h.length>3?h.pop():void 0;if(h.forEach(function(t){var e=String(t),r=p[e];if(void 0!==r)s.push(r);else{var h=a(t,3),b=h[0],v=h[1],m=h[2];s.push(y),null!==b&&l.push.apply(l,n(o[b])),null!==v&&c.push.apply(c,n(u[v])),null!==m&&f.push.apply(f,n(i[m])),p[e]=y,y+=1}}),b){var v=String(b),m=p[v];if(void 0!==m)s.push(s[s.length-1],m,s[s.length-3]);else{s.push(s[s.length-1],y,s[s.length-3]);var d=a(b,3),g=d[0],S=d[1],O=d[2];null!==g&&l.push.apply(l,n(o[g])),null!==S&&c.push.apply(c,n(u[S])),null!==O&&f.push.apply(f,n(i[O])),y+=1}}}}),console.log({sourceVertices:o,finalIndices:s,finalVertices:l,sourceUV:u,finalUV:c,finalNormals:f}),{vertices:l,indices:s,uvs:c,norms:f}};
},{"./transformable":"RCQZ"}],"LnVe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CameraController=exports.Camera=void 0;var t=require("../vendor/math"),e=n(require("./transformable"));function n(t){return t&&t.__esModule?t:{default:t}}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=v();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?p(t):e}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var h=function(n){s(a,e.default);var r=f(a);function a(e){var n,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:45,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.1,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100;return o(this,a),(n=r.call(this))._setPerspective=function(e,n,r,o){return function(){var a=new t.Matrix4;return t.Matrix4.perspective(a.raw,n,e.canvas.width/e.canvas.height,r,o),a}},n.updateViewMatrix=function(){return n.transform.viewMatrix.reset().rotateX(n.transform.rotation.x*n.transform.DEG_2_RAD).rotateY(n.transform.rotation.y*n.transform.DEG_2_RAD).vtranslate(n.transform.position),n.updateDirection(),t.Matrix4.invert(n.viewMatrixState,n.transform.viewMatrix.raw),n.viewMatrixState},n.viewMatrixState=new Float32Array(16),n.resetMatrix=n._setPerspective(e,i,s,u),n.projectionMatrix=n.resetMatrix(),n}return i(a,[{key:"panX",value:function(t){this.transform.position.x+=this.transform.right[0]*t}},{key:"panY",value:function(t){this.transform.position.y+=this.transform.up[1]*t}},{key:"panZ",value:function(t){this.transform.position.z+=this.transform.forward[2]*t}}]),a}();exports.Camera=h;var m=function t(e,n){var r=this;o(this,t),this.getMouseVec2=function(t){return{x:t.pageX-r.offsetX,y:t.pageY-r.offsetY}},this.onMouseDown=function(t){r.initX=r.prevX=t.pageX-r.offsetX,r.initY=r.prevY=t.pageY-r.offsetY,window.addEventListener("mouseup",r.onUpHandler),window.addEventListener("mousemove",r.onMoveHandler)},this.onMouseUp=function(){window.removeEventListener("mouseup",r.onUpHandler),window.removeEventListener("mousemove",r.onMoveHandler)},this.onMouseWheel=function(t){var e=Math.max(-1,Math.min(1,t.deltaY||-t.detail));r.camera.panZ(e*(r.zoomRate/r.canvas.height))},this.onMouseMove=function(t){var e=t.pageX-r.offsetX,n=t.pageY-r.offsetY,o=e-r.prevX,a=n-r.prevY;t.shiftKey?(r.camera.panX(-o*(r.panRate/r.canvas.width)),r.camera.panY(a*(r.panRate/r.canvas.height))):(r.camera.transform.rotation.y+=o*(r.rotateRate/r.canvas.width),r.camera.transform.rotation.x+=a*(r.rotateRate/r.canvas.height)),r.prevX=e,r.prevY=n},this.canvas=e.canvas,this.camera=n;var a=e.canvas.getBoundingClientRect();this.offsetX=a.left,this.offsetY=a.top,this.rotateRate=-300,this.panRate=5,this.zoomRate=100,this.initX=0,this.initY=0,this.prevX=0,this.prevY=0,this.onUpHandler=this.onMouseUp,this.onMoveHandler=this.onMouseMove,window.addEventListener("mousedown",function(t){return r.onMouseDown(t)}),window.addEventListener("wheel",function(t){t.preventDefault(),r.onMouseWheel(t)},{passive:!1})};exports.CameraController=m;
},{"../vendor/math":"y6ga","./transformable":"RCQZ"}],"aVAL":[function(require,module,exports) {
module.exports="/webgl_obj_loader/island.45ce1d17.obj";
},{}],"iTAT":[function(require,module,exports) {
module.exports="/webgl_obj_loader/pirate.c6a494d8.obj";
},{}],"c3fw":[function(require,module,exports) {
module.exports="/webgl_obj_loader/pirate.12c61d65.png";
},{}],"BbQz":[function(require,module,exports) {
module.exports="/webgl_obj_loader/cube.9babbe3c.obj";
},{}],"Deoe":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=function(){function t(a,n,r){e(this,t),this.el=document.getElementById(a),this.loadObjectCallback=n,this.loadTextureCallback=r,this.objectData="",this.el&&(this.el.addEventListener("dragover",this.dragOverHandler.bind(this)),this.el.addEventListener("drop",this.dropHandler.bind(this)))}return a(t,[{key:"dragOverHandler",value:function(e){e.preventDefault()}},{key:"dropHandler",value:function(e){var t,a=this;if(e.preventDefault(),null===(t=null==e?void 0:e.dataTransfer)||void 0===t?void 0:t.items)for(var n=0;n<e.dataTransfer.items.length;n++)if("file"===e.dataTransfer.items[n].kind){var r=e.dataTransfer.items[n].getAsFile();r&&["image/jpeg","image/png"].includes(r.type)?function(){var e=URL.createObjectURL(r),t=new Image;t.onload=function(){a.loadTextureCallback(t),URL.revokeObjectURL(e)},t.src=e}():r&&r.name.includes(".obj")?(null==r||r.text().then(function(e){a.objectData=e,a.loadObjectCallback(a.objectData)}),console.log("... file["+n+"].name = "+(null==r?void 0:r.name))):alert("File not accepted. Please confirm it is of type .obj, .png, or .jpeg")}}}]),t}();exports.default=n;
},{}],"B6dB":[function(require,module,exports) {
"use strict";var e=s(require("./gl")),t=s(require("./programs/mainObject")),r=s(require("./renderer")),n=s(require("./model")),a=require("./camera"),i=require("../vendor/math"),o=s(require("../assets/island.obj")),u=s(require("../assets/pirate.obj")),l=s(require("../assets/pirate.png")),d=s(require("../assets/cube.obj")),c=s(require("./dropbox"));function s(e){return e&&e.__esModule?e:{default:e}}function f(e){return b(e)||p(e)||m(e)||v()}function v(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}function p(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function b(e){if(Array.isArray(e))return w(e)}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var x="gl",y=function(e,t){return n.default.create(e,t)},g=function(){var n,s,v=null,m=null,p=(0,e.default)(x),b=new a.Camera(p);b.setPosition(0,0,5),new a.CameraController(p,b);var w=function(e){var t,r,n;switch(e){case"cube":t=d.default,n=[0,0,5];break;case"pirate":case"pirate_with_texture":"pirate_with_texture"===e&&(r=l.default),t=u.default,n=[0,1,7];break;case"island":t=o.default,n=[0,0,20];break;case"custom":t="",alert("Drag file into the center"),n=[0,0,20];break;default:t=d.default,n=[0,0,5]}fetch(t).then(function(e){return e.text()}).then(function(e){var t;if(!e)return alert("Object data not found"),null;v=y(p,e),(t=b.initTransform()).setPosition.apply(t,f(n)),m=null===m,r&&fetch(r).then(function(e){return e.blob()}).then(function(e){var t=URL.createObjectURL(e),r=new Image;r.onload=function(){var e=p.loadTexture("texture",r,!0);e&&g.setTextureID(e),URL.revokeObjectURL(t)},r.src=t})})};null===(n=document.getElementById("model_selection"))||void 0===n||n.addEventListener("change",function(e){var t,r=null===(t=null==e?void 0:e.target)||void 0===t?void 0:t.value;w(r)}),null===(s=document.getElementById("input_group"))||void 0===s||s.addEventListener("mousedown",function(e){e.stopPropagation()}),window.addEventListener("resize",function(){p.setWindowSize(1,1)}),w("cube"),new c.default("drop_zone",function(e){m=!1,v=y(p,e),b.initTransform().setPosition(0,0,5)},function(e){var t=p.loadTexture("texture",e,!0);t&&g.setTextureID(t)}),p.setWindowSize(1,1).setClearColor(0,0,0,0);var g=new t.default(p),h=new r.default(p);h.clear(),h.draw(function(){if(v){m&&b.addRotation(0,.1,0),v.updateViewMatrix(),b.updateViewMatrix();var e=i.Matrix4.identity();i.Matrix4.mult(e,b.projectionMatrix.raw,b.viewMatrixState),i.Matrix4.mult(e,e,v.transform.viewMatrix.raw),g.activate().preRender(e).render(v).deactivate()}})};window.onload=function(){return g()};
},{"./gl":"EqmZ","./programs/mainObject":"MrFU","./renderer":"P5CY","./model":"pjIr","./camera":"LnVe","../vendor/math":"y6ga","../assets/island.obj":"aVAL","../assets/pirate.obj":"iTAT","../assets/pirate.png":"c3fw","../assets/cube.obj":"BbQz","./dropbox":"Deoe"}]},{},["B6dB"], null)
//# sourceMappingURL=/webgl_obj_loader/src.8e76e1fb.js.map