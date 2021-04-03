import * as THREE from 'three'
import {
    getMazeWalls,
    getFilteredBranchedSquaresMaze,
} from './mazeWalls'

export default ({
    limit,
    wallsHeight = 5,
    color = '#aaa',
    size = 5
}) => {
    const maze = getFilteredBranchedSquaresMaze({
        limit,
        x: 0,
        y: 0,
        size,
    })
    const mazeWalls = getMazeWalls(maze)
    const group = new THREE.Group()

    mazeWalls.forEach(({
        width,
        height: depth,
        x,
        y: z
    }: any) => {
        const material = new THREE.MeshStandardMaterial({
            color
        })
        const geometry = new THREE.BoxBufferGeometry(
            width, wallsHeight, depth
        )
        const mesh = new THREE.Mesh(
            geometry,
            material
        )

        mesh.position.x = x
        mesh.position.z = z
        mesh.position.y = wallsHeight / 2

        group.add(mesh)
    })

    console.log('mazeWalls', mazeWalls)

    return group
}