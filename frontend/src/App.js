import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

    const makeApiRequest = () => {
        console.log('work api request from React to api ')
        axios.get('/auth/api/userposts').then(response => {
            console.log('response.date', response.data)
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p> Docker-compose Work! in dev and prod without </p>
                <h3> Learn Mongo Express React Node in Docker </h3>

                <button onClick={makeApiRequest}>Get data from backend</button>
            </header>
        </div>
    );
}

export default App;
