import presetScene, {actions} from 'scene-preset'
import * as objects from '../../objects'

export default id => presetScene({
    setup({ scene }) {
        actions.blacklistObjects({
            scene,
            blacklist: ['SimpleFloor', 'SimpleCube']
        })

        scene.add(
            objects.L0.Maze({
                limit: 2000
            }) as any
        )

        scene.add(
            objects.L2.LamellaWall({
                x: 4,
                y: 3,
            }) as any
        )
    },
}, `#${id}`)