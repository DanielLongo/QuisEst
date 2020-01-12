import React, {Component, useEffect} from 'react'
import Header from "../components/header";
import InputText from "../components/input_text";
import Results from "../components/results";
import axios from 'axios';
import Footer from "../components/footer";
class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text : '',
            analysisResults : {}
        }
        this.handleTextSubmitted = this.handleTextSubmitted.bind(this)
        this.getDataAxios = this.getDataAxios.bind(this)
        this.analyzeText = this.analyzeText.bind(this)

    }

    handleTextSubmitted = text => {
        console.log("Submitted " + text)
        this.setState({
            text : text
        })
        this.analyzeText(text)
    };

    analyzeText(text) {
        this.getDataAxios(text)
        // var xhr = new XMLHttpRequest()
        // xhr.addEventListener('load', () => {
        //     // update the state of the component with the result here
        //     console.log(xhr.responseText)
        // })
        // var url = "/?text=" + this.state.text
        // xhr.open('GET', url)
        // // send the request
        // xhr.send()
        // console.log("response " + xhr.response)
    }

    async getDataAxios(text){
        console.log("state text: " + text)
        var url = "https://ddlongo.pythonanywhere.com/?text=" + text
        console.log("url " + url)
        const response =
            await axios.get(url)
        this.setState({
            analysisResults : response.data
        })
        console.log(this.state)
    }

    render() {
        console.log("C")
        console.log(this.state.analysisResults)
        console.log("D")
        return (
            <div>
                <Header/>
                <InputText handleTextSubmitted={this.handleTextSubmitted}/>
                <Results analysisResults={this.state.analysisResults}/>
                <Footer/>
            </div>
        )
    }
}

export default MainPage
