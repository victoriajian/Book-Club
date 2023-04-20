import React from "react"
import Navbar from "../components/Navbar";
import Board from "../components/board/Board";

export default function Dashboard() {
    return (
        <div className="page__content">
            <Navbar/>
            <img src="https://em-content.zobj.net/thumbs/240/apple/354/books_1f4da.png" width={60}/>
            <h1>Dashboard</h1>
            <Board/>
        </div>
    );
}