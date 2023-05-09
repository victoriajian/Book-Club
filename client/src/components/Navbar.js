import React from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
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

    return (
        <nav className="navBar">
            <ul>
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                activeclassname="active-link"
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