import React, { Component } from 'react'
import PartCategory from './components/PartCategory'
import HangarBay from './components/HangarCanvas'

// Disables arrow keys from scrolling the browser window
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Imports all .png part images from /assets/img/ and all subdirs. Found this function online.
function importAll(r) {
    let images = {}
    r.keys().map(item => { images[item.replace('./', '')] = r(item) })
    return images
}

// Stores .png file locations in 'images'
const partImages = importAll(require.context('./assets/img/', true, /\.png/))

// Uses the 'images' variable to extract the folder names and stores them in the array 'imageFolders'
const imageFolders = []
for (let x in partImages) {
    // Checks to make sure the string is unique, if it is, adds it to the array
    if (imageFolders.indexOf(x.slice(0, x.lastIndexOf('/'))) === -1) {
        imageFolders.push(x.slice(0, x.lastIndexOf('/')));
    }
}

class App extends Component { 
    constructor(props) {
        super(props)

        this.state = {
            selectedParts: {
                wings: "",
                fuselage: "",
                engine: "",
                cockpit: "", 
                tail: "",
            },
            currentNav: [
                imageFolders[2],
                2,
            ],
            partPosition: {
                wings: [22, 152],
                fuselage: 120,
                engine: 92,
                cockpit: 140, 
                tail: 272,
            },
        }
    }
    
    handlePartPosition = event => {
        const currentNav = this.state.currentNav[0]
        let partPosition = this.state.partPosition
        if(event.key === "ArrowUp"){
            if(currentNav === "wings"){
                partPosition.wings[1] = partPosition.wings[1] - 4
            } else {
                partPosition[currentNav] = partPosition[currentNav] - 4
            }
        } else if (event.key === "ArrowDown"){
            if(currentNav === "wings"){
                partPosition.wings[1] = partPosition.wings[1] + 4
            } else {
                partPosition[currentNav] = partPosition[currentNav] + 4
            }
        } else if (event.key === "ArrowLeft"){
            if(currentNav === "wings"){
                if(partPosition.wings[0] > 2){
                    partPosition.wings[0] = partPosition.wings[0] - 4
                }
            }
        } else if (event.key === "ArrowRight"){
            if(currentNav === "wings"){               
                partPosition.wings[0] = partPosition.wings[0] + 4
            }
        }


        this.setState({
            partPosition: partPosition
        })
      };

    handlePartSelection = (partSelect, part) => {
        let handledPartSelect = this.state.selectedParts
        handledPartSelect[part] = partSelect
        this.setState({
            selectedParts: handledPartSelect
        });
    }

    // setState() for currentNav, index
    handleNavChange = (navChange) => {
        // index is used here for findIndex in the if statement
        // findIndex() is a method that searches an array for a matching element and then returns the index
        // in this case, it is used to ensure the buttons don't go beyond the length of the array, imageFolders
        const index = (part) => part === this.state.currentNav[0]
        if((imageFolders.findIndex(index) + navChange < imageFolders.length) && navChange > 0) {
            this.setState({
                currentNav: [
                    imageFolders[(imageFolders.findIndex(index) + navChange)],
                    imageFolders.findIndex(index) + navChange,
                ]
            })
        } else if((imageFolders.findIndex(index) + navChange >= 0) && navChange < 0) {
            this.setState({
                currentNav: [
                    imageFolders[(imageFolders.findIndex(index) + navChange)],
                    imageFolders.findIndex(index) + navChange,
                ]
            })
        }
    }

    render() {
        return (
            <div className="app-container pixel text-light" tabIndex={0} onKeyDown={this.handlePartPosition}>
                <HangarBay 
                    selectedParts={this.state.selectedParts}
                    partPosition={this.state.partPosition}
                    />
                <PartCategory 
                    partImages={partImages}
                    imageFolders={imageFolders} 
                    currentNav={this.state.currentNav}
                    handleNavChange={this.handleNavChange}
                    handlePartSelection={this.handlePartSelection}
                    />
            </div>
        )
    }
}

export default App