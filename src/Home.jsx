import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css'

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [pid, setPID] = useState([]);
    const [title, setTitle] = useState([]);
    const [body, setBody] = useState([]);
    const [price, setPrice] = useState([]);
    const [location, setLocation] = useState([]);
    
    const lastItem = posts.slice(-1);
    const useNav = useNavigate();

    useEffect(() => {

        const fetchPosts = async () => {
            fetch('http://localhost:8000/posts', { // <-- adding post information here
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (myJson) {
                setPosts(myJson);
            });
        }
        fetchPosts();
    }, [])

    const handleSubmit = (ev) => { // updates the relevant fields

        ev.preventDefault();

        sessionStorage.setItem('postid', pid);
        sessionStorage.setItem('title', title);
        sessionStorage.setItem('body', body);
        sessionStorage.setItem('price', price);
        sessionStorage.setItem('location', location);
    
        console.log(JSON.stringify(sessionStorage, null, 2));

        useNav('Edit');

    }

    const handleDelete = (ev) => {
        
        ev.preventDefault();

        sessionStorage.setItem('postid', pid);
        console.log(`Target post: ${sessionStorage['postid']}`);
        console.log(JSON.stringify(sessionStorage, null, 2));

        useNav('Delete');
    }

    return (

        posts.map((post) => {

            if (typeof sessionStorage.search !== 'undefined') {

                if (post['body'].toLowerCase().match(sessionStorage['search'].toLowerCase()) || post['title'].toLowerCase().match(sessionStorage['search'].toLowerCase())){

                { console.log('Okay this is true') }
                
                return <>
                    <br></br>
                    <div id="P" key={post['id']} userid={post['userid']}>  {/* This is what the post looks like when you search for it */}
                        <h3>{post['title']}</h3>
                        <div>
                            Seller: {post['seller']} <br></br>
                            "{post['body']}" <br></br>
                            Price: {post['price']} <br></br>
                            Location: {post['location']} <br></br> <br></br>
                        </div>

                    </div>
                </>
                }
            }

            if (typeof sessionStorage.search === 'undefined') {

                if (post['userid'] == sessionStorage['userid']) { 

                    return <>
                        <br></br>
                        <div id="mP" key={post['id']} userid={post['userid']}> {/* this is what your post looks like */}
                            <h3><i>{post['title']}</i></h3>
                            <div>
                                Seller: {post['seller']} <br></br>
                                "{post['body']}" <br></br>
                                Price: ${post['price']} <br></br>
                                Location: {post['location']} <br></br>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <button id="EditBTN" className="mPb" onClick={(ev) => {
                                    setPID(post['id']); 
                                    setTitle(post['title']);
                                    setBody(post['body']);
                                    setPrice(post['price']);
                                    setLocation(post['location']);
                                }
                                    }>Edit</button>
                                </form>
                                <form onSubmit={handleDelete}>
                                <button id="DeleteBTN" className="mPb" onClick={(ev) => {
                                    setPID(post['id']);
                                }
                                    }>Delete</button>
                            </form>

                        </div>
                    </>

                } else {

                    return <>
                        <br></br>
                        <div id="Te">
                        <div id="P" key={post['id']} userid={post['userid']}> {/* This is what the other post looks like */}
                            <h3><i>{post['title']}</i></h3>
                            <div>
                                Seller: {post['seller']} <br></br>
                                "{post['body']}" <br></br>
                                Price: ${post['price']} <br></br>
                                Location: {post['location']} <br></br><br></br>
                            </div>
                            </div>
                        </div>
                    </>
                }
            }

            if (lastItem[0]['id'] == post['id']) {

                console.log('This is the last one hopefully.');
                sessionStorage.removeItem('search');
            }
        })
    )
}

export default Home;