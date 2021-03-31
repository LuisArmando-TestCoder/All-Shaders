import * as THREE from 'three'
import { actions } from 'scene-preset'
import fragmentShader from './fragmentShader'
import vertexShader from './vertexShader'

export default ({
    x = 0,
    y = 2,
    z = 3,
    width = 2,
    height = 2,
    depth = .1,
}) => {
    const material = new THREE.ShaderMaterial({
        fragmentShader,
        vertexShader
    })
    const geometry = new THREE.BoxBufferGeometry(width, height, depth)
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(x, y, z)

    actions.setUniforms(material as any)

    return mesh
}