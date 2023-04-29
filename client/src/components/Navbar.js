import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import styled from "styled-components"

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
            path: "/explore/first",
            text: "Explore",
        },
        // {
        //     id: 4,
        //     path: "/bookclub",
        //     text: "Book Club",
        // },
        // {
        //     id: 4,
        //     path: "/test",
        //     text: "Test",
        // },
    ]

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

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