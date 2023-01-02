import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Delete = () => {

    const [posts, setPosts] = useState([]);
    const useNav = useNavigate();

    useEffect(() => {

        if (typeof sessionStorage['userid'] === 'undefined') { /* makes sure you're logged in first, and sends you to log in page */

            alert('You need to login to your account before you can post.');

            useNav('/Login');
        }

        if (typeof sessionStorage['postid'] === 'undefined') { /* makes sure that you clicked on a post first, returns to home page. */

            alert(`Please select a post you created that you would like to delete to continue.`)

            useNav('/');
        }

        /* fetches the post from the session storage, via the postID, then removes it. */
        if (typeof sessionStorage['postid'] !== 'undefined') {
        
            fetch(`http://localhost:8000/posts/${sessionStorage['postid']}`, {
                method: 'DELETE'
            }).then((response) => {

                const data = response.json;

                return data;

            }).then(() => {

                const origPost = posts.filter(post => {

                    if (post['id'] == sessionStorage['postid']) {

                        setPosts(origPost);
                    }
                });

                sessionStorage.removeItem('postid');

                useNav('/');

            }).catch((err) => {

                alert(`Login Failed : ${err.message}`);
            });
        }
    }, []);
}

export default Delete;