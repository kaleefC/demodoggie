import { useEffect, useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';


function str2hash(str) {  // <-- convert password string to SHA256 hash for json object

    let hash = CryptoJS.SHA256(str);
    
    return hash.toString();
}

const Login = () => {
    
    const [user, setUser] = useState('');
    const [passwd, setPasswd] = useState('');
    const useNav = useNavigate();

    const validate = () => {

        let result = true;
    
        if (user == '' || user == null) { // if you don't have a valid username, alert informs you.
    
            result = false;

            alert('Please enter your username');
        }
    
        if (passwd == '' || passwd == null) { // if you don't have a valid password, alert informs you.
    
            result = false;

            alert('Please enter your password');
        }
    
        return result;
    }

    const handleSubmit = (ev) => {

        ev.preventDefault();

        let Obj;

        if (validate()) {

            fetch(`http://localhost:8000/users/?name=${user.toLowerCase()}`).then((res) => { // checks the current username, lowercase.

                return res.json();

            }).then((resp) => {

                if (Object.keys(resp).length == 0) {  // checks if the array length is equal to zero

                    alert('Please enter your username');

                } else {

                    Obj = resp[0];

                    if (Obj['passwd'] == passwd) { /* checks if the SHA256 passwords are a match */

                        sessionStorage.setItem('userid', Obj['userid']);
                        sessionStorage.setItem('seller', Obj['display']);
                    
                        useNav('/');

                    } else {

                        alert('Your credentials are not valid. Please try again.');
                    }
                }
            }).catch((err) => {

                alert(`Login Failed : ${err.message}`);
            });
        }
    }

    return <>
        <h3>
            Login
        </h3>
        {/* the forms to input sign in information */}
        <form onSubmit={handleSubmit}>
            <label id="uN">Username: </label>
            <input id="user" type="text" autoComplete="false" placeholder="Name" value={user} onChange={(ev) => setUser(ev.target.value)}></input>
            <br></br>
            <label id="pW">Password: </label>
            <input id="loginpasswd" type="password" placeholder="Secure password" value={passwd} onChange={(ev) => setPasswd(ev.target.value)}></input>
            <br></br>
            <button type="submit" className="bnt bnt-outline-primary" onClick={(ev) => {setPasswd(str2hash(passwd)); setUser(user.toLowerCase())}}>Login</button>
            <Link className="bnt bnt-outline-primary" to={'/register'}>Register</Link>    
        </form>
    </>
}

export default Login;