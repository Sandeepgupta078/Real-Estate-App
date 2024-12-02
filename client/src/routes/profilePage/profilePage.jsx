import React, { useContext } from 'react'
import "./profilePage.scss"
import { Link, useNavigate } from 'react-router-dom'
import List from '../../components/List/List'
import Chat from '../../components/Chat/Chat'
import apiRequest from '../../lib/apiRequest'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {

    const { currentUser, updateUser } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiRequest.post('/auth/logout')
            updateUser(null)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='profilePage'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img src={currentUser.avatar || "/no-avatar.jpg"} alt="" />
                        </span>
                        <span>Username: {currentUser.username}</span>
                        <span>Email: {currentUser.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/profile/add">
                            <button>Create new Post</button>
                        </Link>
                    </div>
                    <List />
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>
        </div>
    )

}

export default ProfilePage