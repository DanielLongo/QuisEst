import React, {Component} from 'react'
import "./header.css"

class Header extends Component {
    render() {
        return (
            <div>
            <img className="logo-image" src="logo.png"/>
            <p className="about-text">Quis Est? utilizes modern machine learning techniques in some of the oldest writings.
                The service utilizes a C-Support Vector Classification model to classify the author of a text and
                has been trained on thousands of latin works from the Republican, Augustan, and Early Silver periods.
                Enter your text below and run the algorithm!
            </p>
            </div>
        )
    }
}

export default Header
