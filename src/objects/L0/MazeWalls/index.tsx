import * as THREE from 'three'
import {
    getMazeWalls,
    getFilteredBranchedSquaresMaze,
} from './mazeWalls'

export default ({
    limit
}) => {
    const maze = getFilteredBranchedSquaresMaze({
        limit: 500,
        x: 0,
        y: 0
    })
    const mazeWalls = getMazeWalls(maze)

    console.log('mazeWalls', mazeWalls)

    return
}