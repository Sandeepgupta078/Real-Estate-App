import React from 'react'
import { useContext } from 'react'
import './layout.scss'
import Navbar from "../../components/Navbar/Navbar"
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const Layout = () => {
    return (
        <div className="layout">
            <header className="navbar">
                <Navbar />
            </header>

            {/* Main Content Section */}
            <main className="content">
                <Outlet /> {/* Dynamically render nested routes */}
            </main>

            {/* Footer Section (Optional) */}
            <footer className="footer">
                <p>© 2024 Real Estate App | All Rights Reserved</p>
            </footer>

        </div>
    )
}

const RequireAuth = () => {

    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return (
        currentUser && (
            <div className="layout">
                <header className="navbar">
                    <Navbar />
                </header>

                {/* Main Content Section */}
                <main className="content">
                    <Outlet /> {/* Dynamically render nested routes */}
                </main>

                {/* Footer Section (Optional) */}
                <footer className="footer">
                    <p>© 2024 Real Estate App | All Rights Reserved</p>
                </footer>

            </div>
        )
    )
}

export { Layout, RequireAuth }
