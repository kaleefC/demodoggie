import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState([]);
    const [body, setBody] = useState([]);
    const [price, setPrice] = useState([]);
    const [location, setLocation] = useState([]);
    const [userid, setID] = useState([]);
    const [seller, setSeller] = useState([]);
    const useNav = useNavigate();

    useEffect(() => { 

       const validate = () => {

            let result = true;
    
            if (typeof sessionStorage['userid'] === 'undefined') { /* are you logged in? if not go do that. */
    
                alert('You need to login to your account before you can post.');
    
                result = false;

                useNav('/Login');
            }
    
            if (typeof sessionStorage['postid'] === 'undefined') { /* did you click on a post? if not go do that */
    
                alert(`Please select a post you created that you would like to change to continue.`)
                
                result = false;

                useNav('/');
            }

            if (typeof sessionStorage['postid'] !== 'undefined') { /* if theres a postid that isn't undefined update the text fields accordingly */

                setTitle(sessionStorage['title']);
                setBody(sessionStorage['body']);
                setPrice(sessionStorage['price']);
                setLocation(sessionStorage['location']);
            }
    
            return result;
        }
        
    }, []);

    const handleSubmit = async (ev) => { /* fetching the post on the json object to update it with the new text */

        ev.preventDefault();

            const response = await fetch(`http://localhost:8000/posts/${sessionStorage['postid']}`, {
                method: 'PATCH',
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

            const origPost = posts.map(post => {

                if (post['id'] == sessionStorage['postid']) {

                    return data;

                } else {

                    return post;
                }
            });

            setTitle('');
            setBody('');
            setPrice('');
            setLocation('');
            sessionStorage.removeItem('postid');
            sessionStorage.removeItem('title');
            sessionStorage.removeItem('body');
            sessionStorage.removeItem('price');
            sessionStorage.removeItem('location');
            useNav('/');

    }

    return <>
        <h3>
            Create a Post
        </h3>

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
            <button type="submit" className="bnt bnt-outline-primary" onClick={(ev) => { setID(sessionStorage['userid']); setSeller(sessionStorage['seller']); setPrice(parseInt(price)); }}>Submit</button>
        </form>

    </>
}

export default Edit;