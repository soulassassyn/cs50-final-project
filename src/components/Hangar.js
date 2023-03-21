import React, { Component } from "react"
import HangarBayGif from '../assets/img/HangarBay.gif'
import './Hangar.css'

class Hangar extends Component {
        
    render() {
        const selectedParts = this.props.selectedParts
        const partPosition = this.props.partPosition

        return (           
            <HangarBay 
                selectedParts={selectedParts}
                partPosition={partPosition}
                />
        )
    }
}

const HangarBay = (props) => {
    const selectedParts = props.selectedParts
    const partPosition = props.partPosition
        
    return (
        <div className="hangar-bay">
            <img className="hangar-bay-image" src={ HangarBayGif } alt=""></img>
            <AirplaneParts 
                selectedParts={selectedParts}
                partPosition={partPosition}
                />
        </div> )
}

const AirplaneParts = (props) => {  
    const selectedPartsKeys = Object.keys(props.selectedParts)
    const selectedPartsValues = Object.values(props.selectedParts)
    const partPosition = props.partPosition

    // console.log(selectedPartsKeys)
    // console.log(selectedPartsValues)
    const currentParts = selectedPartsValues.map((part, i) => {
        return (
            <img 
                className={`${selectedPartsKeys[i]}-selected`}
                style={{ top: `${partPosition[selectedPartsKeys[i]]}px` }}
                src={selectedPartsValues[i]}
                alt="" 
                key={`current${i}`}></img>
        )
    })

    return (
        <div className="parts">
            { currentParts }
        </div>
    )
}

export default Hangar