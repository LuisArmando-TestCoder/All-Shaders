import presetScene from 'scene-preset'
import * as objects from '../../objects'
import fragmentShader from './fragmentShader'
import vertexShader from './vertexShader'

export default id => presetScene({
    setup({ scene }) {
        const fragmentBox = objects.L0.FragmentBox({
            fragmentShader,
            vertexShader
        })

        scene.add(fragmentBox as any)
    },
}, `#${id}`)