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
    const title = book.volumeInfo.title ? book.volumeInfo.title.substr(0, 53) : '';
    const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : '';
    // const description = book.volumeInfo.description?.substr(0, 150) || '';
    const imageLinks = book.volumeInfo.imageLinks;
    const thumbnail = imageLinks ? imageLinks.thumbnail : 'https://via.placeholder.com/128x196?text=No+Image';
    const link = book.volumeInfo.infoLink ? book.volumeInfo.infoLink : '';

    return (
        <div>
            <a href={link} target="_blank"><img src={thumbnail} alt={`Cover of ${title}`} />
            <h3>{title}</h3></a>
            <p>{author}</p>
        </div>
    );
};

const Search = () => {
    const [dashData, setDashData] = useState(initialState);
    const [searchQuery, setSearchQuery] = useState("");

    const [books, setBooks] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const results = await searchBooks(searchQuery);
        setBooks(results);

        console.log("GOT SEARCH RESULTS:")
        console.log(results)
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
            <h1>Search</h1>
            <div className="inner">
                <form className="form-container">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Search by title or author..."
                        name="title"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                    <button className="input-submit" onClick={handleSubmit}>
                        <FaSearch />
                    </button>
                </form>

                <div className="pick-link"><h3>Or, <a href="/explore">let us pick a book for you</a></h3></div>

                <div className="grid-container">
                    {books.map((book) => (
                        <div className="grid-item">
                            <Book key={book.id} book={book} />
                            <button onClick={() => addBook(book)}>
                                <h4>Add to List</h4>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;