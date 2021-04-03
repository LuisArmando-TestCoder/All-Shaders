import presetScene from 'scene-preset'
import * as objects from '../../objects'

export default id => presetScene({
    setup({ scene }) {
        scene.add(
            objects.L2.LamellaWall({
                x: 12,
                y: 6,
            }) as any
        )
    },
}, `#${id}`)