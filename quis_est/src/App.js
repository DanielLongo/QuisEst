import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header.js'
import InputText from './components/input_text.js'
import Results from './components/results'
import MainPage from "./pages/main_page";

function App() {
    // this.state = {
    //     inputText : ""
    // }


    return (
        <div className="App">
            <MainPage/>
        </div>
  );
}

export default App;
