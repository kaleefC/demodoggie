// import React from "react";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";


function str2hash(str) { // <- encrypts password string to SHA256 hash

    let hash = CryptoJS.SHA256(str);
    
    return hash.toString();
}

const Register = () => {

    const [userid, setID] = useState([]);
    const [name, setUser] = useState([]);
    const [display, setDisplay] = useState([]);
    const [passwd, setPasswd] = useState([]);
    const [email, setEmail] = useState([]);
    const useNav = useNavigate();

    const handleSubmit = async (ev) => {

        ev.preventDefault();

        const validate = () => {

            let result = true;

            fetch(`http://localhost:8000/users/?name=${name.toLowerCase()}`).then((res) => { // fetches the user's name lowercase then returns response as json object for comparison

                return res.json();

            }).then((resp) => {

                if (Object.keys(resp).length > 0) { //checks if name is taken by seeing if there is an array with anything in it.

                    alert('Sorry your username is taken. Try again please.');

                    result = false;

                }

            });

            return result;
        }

        if (validate()) {

            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify({
                    userid,
                    name,
                    passwd,
                    email,
                    display,
                })
            });

            const data = await response.json();
            console.log('data: ', data);
        }

        setID('');
        setUser('');
        setPasswd('');
        setEmail('');
        useNav('/Login')
    }

    return <>
        <h3>
            Create account
        </h3>
        <form onSubmit={handleSubmit}>
            <label>username: </label>
            <input type="text" placeholder="username" value={name} onChange={(ev) => setUser(ev.target.value)}></input>
            <br></br>
            <label>password: </label>
            <input id="createpasswd" type="password" placeholder="password" value={passwd} onChange={(ev) => setPasswd(ev.target.value)}></input>
            <br></br>
            <label>email: </label>
            <input type="text" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)}></input>
            <br></br>
            <button type="submit" className="bnt bnt-outline-primary" onClick={
                (ev) => {
                    setID(uuidv4());
                    setUser(name.toLowerCase());
                    setDisplay(name);
                    setPasswd(str2hash(document.getElementById('createpasswd').value));
                }
                }>Submit</button>
        </form>
    </>
}

export default Register;