import presetScene from 'scene-preset'
import * as objects from '../../objects'

export default id => presetScene({
    setup({ scene }) {
        const fragmentBox = objects.L0.FragmentBox({})

        scene.add(fragmentBox as any)
    },
}, `#${id}`)