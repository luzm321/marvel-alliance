import { UserWelcome } from "./UserWelcome";
import React, { useState, useEffect } from "react";
import { getUsers } from "../../modules/authManager";
import "./Home.css";
import ImageGallery from "./ImageGallery";


const Home = () => {

    const [users, setUsers] = useState([]);

    const getAllUserProfiles = () => {
        getUsers().then(users => setUsers(users));
      };

    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
        getAllUserProfiles();
    }, []);

    return (
        <div className="homeBgd">
            <div>
                {console.log('users', users)}
                {
                    users.map(user => {
                        if(localStorage.getItem("userEmail") === user.email) {
                            return <UserWelcome user={user.userName} />
                        }
                    })
                }
            </div>
            <div className="gallery">
                <ImageGallery />
            </div>
        </div>
    )
};

export default Home;