import React, { useState } from "react"
import { v4 as uuid } from "uuid";
import { FaSearch, FaPlusCircle } from "react-icons/fa";

import store from "../utils/store";
import Navbar from "../components/Navbar";
import searchBooks from "../utils/searchAPI";
import { getExploreSearch } from "../fetcher";

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
    const [searchQuery, setSearchQuery] = useState("");

    const [books, setBooks] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const results = searchBooks(searchQuery);
        const results = await searchBooks(searchQuery);
        setBooks(results);
        console.log("GOT SEARCH RESULTS:")
        console.log(results)
        // window.localStorage.setItem("showResStorage", JSON.stringify(true));
    }

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
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
            <h1>Find your next read</h1>
            <p>Generates recommendations based on your favorite book.</p><p><i>Powered by the OpenAI GPT-3 API.</i></p>
            <br/>
            <div className="inner">
            <h3>Your favorite book:</h3>
                <form className="form-container recommend">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Harry Potter, The Catcher in the Rye, The Hunger Games..."
                        name="title"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                </form>
                <h3>Number of recommendations:</h3>
                <form className="form-container recommend">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Enter a number"
                        name="title"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                </form>
                <button className="big-button">
                    <h3>Generate</h3>
                </button>
                <br/>
                <div class="pick-link"><h3>Or, <a href="/explore">back to Explore</a></h3></div>
            </div>

            
        </div>
    );
};

export default Recommend;