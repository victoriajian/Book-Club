import React, { useState } from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const links = [
        {
            id: 1,
            path: "/",
            text: "Dashboard",
        },
        {
            id: 2,
            path: "/search",
            text: "Search",
        },
        {
            id: 3,
            path: "/explore",
            text: "Explore",
        },
    ]

    const closeMenu = () => {
        setNavbarOpen(false)
    }

    return (
        <nav className="navBar">
            <ul>
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                activeclassname="active-link"
                                onClick={() => closeMenu()}
                                >
                                {link.text}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
export default Navbar