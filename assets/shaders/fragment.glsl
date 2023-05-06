uniform sampler2D globeTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    gl_FragColor = vec4(texture2D(globeTexture, vertexUV).xyz, 1.0);
}