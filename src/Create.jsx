import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState([]);
    const [body, setBody] = useState([]);
    const [price, setPrice] = useState([]);
    const [location, setLocation] = useState([]);
    const [userid, setID] = useState([]);
    const [seller, setSeller] = useState([]);
    const useNav = useNavigate();

    const handleSubmit = async (ev) => {

        ev.preventDefault();

        const validate = () => {

            let result = true;
            
            if (price.length == 0 || /^\d+$/.test(price) == false) { /* checks that the price is a number, if not sends an alert and sets price to empty*/

                alert('Needs a valid price.');
                
                setPrice('');

                result = false;
            }
            if (typeof sessionStorage['userid'] === 'undefined') { /* makes sure you're signed in */

                alert('You need to login to your account before you can post.');

                result = false;

                useNav('/Login');
            }

            return result;
        }

        if (validate()) {

            const response = await fetch('http://localhost:8000/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify({
                    userid,
                    seller,
                    title,
                    body,
                    price,
                    location,
                })
            });

            const data = await response.json();
            console.log('data: ', data);

            setTitle('');
            setBody('');
            setPrice('');
            setLocation('');
            useNav('/');

        } 
    }

    return <>
        <h3>
            Create a Post
        </h3>
        {/* where you input text for a new post */}
        <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input type="text" placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)}></input>
            <br></br>
            <label>Body: </label>
            <textarea name="w3review" rows="4" cols="100" value={body} onChange={(ev) => setBody(ev.target.value)}></textarea>
            <br></br>
            <label>Price: </label>
            <input type="text" placeholder="title" value={price} onChange={(ev) => setPrice(ev.target.value)}></input>
            <br></br>
            <label>Location: </label>
            <input type="text" placeholder="title" value={location} onChange={(ev) => setLocation(ev.target.value)}></input>
            <br></br>
            <button type="submit" className="bnt bnt-outline-primary" onClick={(ev) => { setID(sessionStorage['userid']); setSeller(sessionStorage['seller']); setPrice(parseInt(price));}}>Submit</button>
        </form>

    </>
}

export default Create;