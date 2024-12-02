import React from 'react'
import './profileUpdate.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { useNavigate } from 'react-router-dom'
import CloudinaryUploadWidget from '../../components/uploadWidget/uploadWidget'


const profileUpdate = () => {

    const [error, setError] = useState("")
    const { currentUser, updateUser } = useContext(AuthContext)
    const [avatar, setAvatar] = useState(currentUser.avatar)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData)

        try {
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar
            });
            updateUser(res.data)
            navigate('/profile')
            // console.log(currentUser)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    return (
        <div className='profileUpdatePage'>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="password" />
                    </div>
                    <button type='submit'>Update</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
            <div className="sideContainer">
                <img
                    src={ avatar || "/no-avatar.jpg"}
                    alt=""
                    className='avatar'
                />
                <CloudinaryUploadWidget 
                uwConfig={{
                    cloudName: 'dw6nx71fd',
                    uploadPreset: 'Real-estate',
                    multiple: false,
                    folder: 'avatars',
                    maxImageFileSize: 1000000,
                    cropping: true,
                }}
                setAvatar={setAvatar}
                />
            </div>
        </div>
    )
}

export default profileUpdate