import * as THREE from 'three'
import * as objects from '../..'

export default ({
    y = 3,
    x = 3,
}) => {
    const lamellaWall = new THREE.Group()

    for (
        let index = 0;
        index < y;
        index++
    ) {
        lamellaWall.add(
            objects.L1.Lamellas({
                amount: x,
                y: index
            })
        )
    }

    return lamellaWall
}