import presetScene, { actions, events, consulters } from 'scene-preset'

export default id => presetScene({
    setup({ canvas }) {

        events.onKey('p')
        .start(() => {
            actions.screenshotCanvas(canvas)
        })

        const mediaRecorder = consulters.getCanvasRecorder(canvas)

        actions.downloadCanvasRecordingOnStop(mediaRecorder)

        events.onKey('g')
        .start(() => {
            mediaRecorder.start()
        })
        .end(() => {
            mediaRecorder.stop()
        })

        actions.blacklistControls([
            'setFirstPersonZoom',
            'setCanvasAutoFocus',
        ], `#${id}`)
    },
}, `#${id}`)