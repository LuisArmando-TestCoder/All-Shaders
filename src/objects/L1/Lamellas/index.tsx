import * as THREE from 'three'
import * as objects from '../..'
import fragmentShader from './fragmentShader'
import vertexShader from './vertexShader'

export default ({
    amount = 3,
    y,
    height = 1.5
}) => {
    const lamellas = new THREE.Group()

    for (
        let index = 0;
        index < amount;
        index++
    ) {
        const lamella = objects.L0.FragmentBox({
            width: 1.125,
            height,
            x: 1.125 * (
                index - amount / 2
            ),
            y: height * y - 1,
            z: 10,
            fragmentShader,
            vertexShader
        })

        lamellas.add(
            lamella
        )
    }

    lamellas.position.x += 1.125 / 2

    return lamellas
}