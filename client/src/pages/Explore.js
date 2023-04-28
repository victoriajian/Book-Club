import React, { useState } from "react"
import { v4 as uuid } from "uuid";
import { FaSearch, FaPlusCircle } from "react-icons/fa";

import store from "../utils/store";
import Navbar from "../components/Navbar";
import exploreBooks from "../utils/exploreAPI";

const dataStorage = JSON.parse(window.localStorage.getItem("dataKanban"));

const initialState = () => {
    if (dataStorage) {
        return dataStorage;
    } else {
        window.localStorage.setItem("dataKanban", JSON.stringify(store));
        return store;
    }
};

const Book = ({ book }) => {
    const description = book.volumeInfo.description?.substr(0, 150) || '';
    const imageLinks = book.volumeInfo.imageLinks;
    const thumbnail = imageLinks ? imageLinks.thumbnail : 'https://via.placeholder.com/128x196?text=No+Image';

    const testAddBook = () => {
        console.log("adding: " + book.volumeInfo.title)
    }

    return (
        <div>
            <img src={thumbnail} alt={`Cover of ${book.volumeInfo.title}`} />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors[0]}</p>
        </div>
    );
};

const Recommend = () => {
    const [dashData, setDashData] = useState(initialState);

    const [bookQuery, setBookQuery] = useState("");
    const [numQuery, setNumQuery] = useState("");

    const [books, setBooks] = useState([]);

    const [recs, setRecs] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRecs("\nGenerating...");
        const results = await exploreBooks(bookQuery);
        setRecs(results);
    }

    const handleBookQueryChange = (event) => {
        setBookQuery(event.target.value);
    };

    const handleNumQueryChange = (event) => {
        setNumQuery(event.target.value);
    };

    // add to dashboard

    const addBook = (book) => {
        const id = book.id;
        const title = book.volumeInfo.title;
        const image = book.volumeInfo.imageLinks.thumbnail;

        if (!title) {
            return;
        }

        const newCard = {
            id,
            title,
            image
        };

        const list = dashData.lists["to-read"];
        list.items = [...list.items, newCard];

        const newState = {
            ...dashData,
            lists: {
                ...dashData.lists,
                ["to-read"]: list,
            },
        };
        setDashData(newState);
        window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    };

    return (
        <div className="page__content">
            <Navbar />
            <img src="https://em-content.zobj.net/thumbs/240/apple/354/books_1f4da.png" width={60} />
            <h1>Explore</h1>
            <h2>Find your next read.</h2>
            <br/>
            <p>Generates recommendations based on your favorite book. <i>Powered by OpenAI GPT-3.</i></p>
            <br/>
            <div className="inner">
            <h3>Your favorite book:</h3>
                <form className="form-container recommend">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Harry Potter, The Catcher in the Rye, The Hunger Games..."
                        name="title"
                        value={bookQuery}
                        onChange={handleBookQueryChange}
                    />
                </form>
                {/* <h3>Number of recommendations:</h3>
                <form className="form-container recommend">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Enter a number"
                        name="title"
                        value={numQuery}
                        onChange={handleNumQueryChange}
                    />
                </form> */}
                <button className="big-button" onClick={handleSubmit}>
                    <h3>Generate</h3>
                </button>
                
                <div class="recs-output">
                    <p>{recs}</p>
                </div>
                <div class="pick-link"><h3><a href="/search">Back to Search</a></h3></div>
            </div>

            
        </div>
    );
};

export default Recommend;