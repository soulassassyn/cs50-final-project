import React from "react"
import { useEffect, useRef, Component } from "react"
import HangarBayGif from '../assets/img/HangarBay.gif'
import './HangarCanvas.css'

class HangarBay extends Component {
    
    render() {
        const selectedParts = this.props.selectedParts
        const partPosition = this.props.partPosition
    return (
        <div className="hangar-bay">
            <img className="hangar-bay-image" src={ HangarBayGif } alt=""></img>
            <AircraftHangar 
                selectedParts={selectedParts}
                partPosition={partPosition}
                />
        </div> )
    }
}

// Using a hook
const AircraftHangar = (props) => {
    const selectedPartsKeys = Object.keys(props.selectedParts)
    const selectedPartsValues = Object.values(props.selectedParts)
    const partPosition = props.partPosition
    let ref = useRef()
    let ref2 = useRef()
    let imageURL

    function downloadImage() {
        let link = document.createElement('a')
        link.download = 'airplane.png'
        link.href = imageURL
        link.click()
        
    }
    
    useEffect((event) => {
        let canvas = ref.current
        let canvas2 = ref2.current
        imageURL = canvas.toDataURL()

        
        let ctx = canvas.getContext('2d', {willReadFrequently: true}, {preserveDrawingBuffer: true})
        let ctx2 = canvas2.getContext('2d', {willReadFrequently: true}, {preserveDrawingBuffer: true})
        canvas.width = 400
        canvas.height = 448
        canvas2.width = 400
        canvas2.height = 448
        // imageSmoothingEnabled gets reset when the canvas is resized
        // it must be set AFTER declaring the canvas width/height
        ctx.imageSmoothingEnabled = false
        ctx2.imageSmoothingEnabled = false
        // Updates changes for which parts have been selected and draws them to the canvas
        for (let i = 0; i < selectedPartsKeys.length; i++) {
            loadImage(selectedPartsValues[i], selectedPartsKeys[i])
        }
        function loadImage(imageSource, partKey) {
            let currentPartKey = partKey
            let currentPartImage = new Image()
            currentPartImage.src = imageSource
            const currentPartImageW = currentPartImage.width * 4
            const currentPartImageH = currentPartImage.height * 4
            if (currentPartKey === "wings") {
                let xPosition = partPosition.wings[0]
                let yPosition = partPosition.wings[1]
                currentPartImage.onload = () => {           
                    ctx.drawImage(currentPartImage, xPosition, yPosition, currentPartImageW, currentPartImageH)
                    ctx2.drawImage(currentPartImage, xPosition, yPosition, currentPartImageW, currentPartImageH)
                    ctx.drawImage(canvas2, 0, 0)
                }
            } else {
                currentPartImage.onload = () => {
                    ctx.drawImage(currentPartImage, ((canvas.width/2) - (currentPartImageW/2)), partPosition[currentPartKey], currentPartImageW, currentPartImageH)    
                }
            }
        }
        ctx2.translate(400, 0)
        ctx2.scale(-1, 1)
    })

    return (
        <div>
            <canvas
            className="hangar-canvas"
            ref={ref2}
            style={{ width:'400px', height:'448px' }}
            />
            <canvas
            className="hangar-canvas"
            ref={ref}
            style={{ width:'400px', height:'448px' }}
            />
            <button
            className="button"
            onClick={downloadImage}>
                Download
            </button>
        </div>
    )
}

export default HangarBay;