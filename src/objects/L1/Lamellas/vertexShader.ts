export default `
varying vec3 fragCoord; 

void main() {
    fragCoord = position; 

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}
`