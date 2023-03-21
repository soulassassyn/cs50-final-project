import React, { Component } from "react"
import './PartCategory.css'

class PartCategory extends Component {
    render() {
        const {partImages, imageFolders, currentNav, handleNavChange, handlePartSelection} = this.props
        return (
            <div className="part-category">
                <div className="part-category-header">
                    <p>Select parts from the list below.<br />
                    Use the arrow keys to adjust the placement.</p>
                </div>
                <PartCategoryOptionContainer 
                    partImages={partImages}
                    currentNav={currentNav}
                    handlePartSelection={handlePartSelection}
                    />
                <PartCategoryNav
                    imageFolders={imageFolders} 
                    currentNav={currentNav}
                    handleNavChange={handleNavChange}
                    />
            </div>
        )
    }
}

const PartCategoryOptionContainer = (props) => {
    const {partImages, currentNav, handlePartSelection} = props
    return (
        <div className="part-category-options">
            <PartCategoryOption 
                partImages={partImages}
                currentNav={currentNav}
                handlePartSelection={handlePartSelection}
                />
        </div>
    )
}

const PartCategoryOption = (props) => {
    const partImages = props.partImages
    const currentNav = props.currentNav[0]
    const index = props.currentNav[1]
    
    // Object.keys() extracts the 'key' data from an object into an array
    // map() can only parse arrays
    const partImagesArr = Object.keys(partImages).map((iterator, i) => {
        return (
            <div className={`part-type ${currentNav}`} key={i} onClick={() => props.handlePartSelection(partImages[iterator], props.currentNav[0])}>
                <img 
                    src={partImages[iterator]}
                    alt=""></img>
            </div>
        )
    })  
    return (partImagesArr.slice((index * 3), ((index + 1) * 3)))
}

const PartCategoryNav = (props) => {
    const imageFolders = props.imageFolders
    const currentNav = props.currentNav[0]
    const index = props.currentNav[1]
    
    // Capitalizes the first letter for display in the <h4> element
    const currentNavUpper = (currentNav.slice(0, 1).toUpperCase() + currentNav.slice(1))

    let disabled = ["disabled", null]
    if(index === 0) {
        disabled = ["disabled", null]
    } else if(index + 1 === imageFolders.length) {
        disabled = [null, "disabled"]
    } else { disabled = [null, null]}

    return (
        <div className="part-category-nav">
            <button 
                className="btn-left" 
                disabled={disabled[0]} 
                onClick={() => props.handleNavChange(-1)}>
                    {imageFolders[index - 1]}
            </button>
            <h4 className="nav-title">{currentNavUpper}</h4>
            <button 
                className="btn-right" 
                disabled={disabled[1]} 
                onClick={() => props.handleNavChange(+1)}>
                    {imageFolders[index + 1]}
            </button>
        </div>
    )
}

export default PartCategory