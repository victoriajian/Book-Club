import React, { useState } from "react"
import { v4 as uuid } from "uuid";
import { FaSearch, FaPlusCircle } from "react-icons/fa";

// import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Badge } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,
    Rate
} from 'antd'

import store from "../utils/store";
import Navbar from "../components/Navbar";
import searchBooks from "../utils/searchAPI";
import { getExploreSearch } from "../fetcher";

const testSearchData = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        authors: 'J.K. Rowling',
        rating: 4.47,
        year: '1997',
        isbn: '9780439708180',
    },
    {
        title: 'Harry Potter and the Chamber of Secrets',
        authors: 'J.K. Rowling',
        rating: 4.43,
        year: '1998',
        isbn: '9780439064873',
    },
    {
        title: 'Harry Potter and the Prisoner of Azkaban',
        authors: 'J.K. Rowling',
        rating: 4.58,
        year: '1999',
        isbn: '9780439655484',
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        authors: 'J.K. Rowling',
        rating: 4.56,
        year: '2000',
        isbn: '9781408855928',
    },
    {
        title: 'Harry Potter and the Order of the Phoenix',
        authors: 'J.K. Rowling',
        rating: 4.50,
        year: '2003',
        isbn: '9780439358064',
    },
    {
        title: 'Harry Potter and the Half-Blood Prince',
        authors: 'J.K. Rowling',
        rating: 4.58,
        year: '2005',
        isbn: '978-0439784542',
    },
    {
        title: 'Harry Potter and the Deathly Hallows',
        authors: 'J.K. Rowling',
        rating: 4.62,
        year: '2007',
        isbn: '978-0545010221',
    },
    {
        title: 'Harry Potter and the Cursed Child: Parts One and Two',
        authors: 'J.K. Rowling, Jack Thorne, John Tiffany',
        rating: 3.51,
        year: '2016',
        isbn: '978-1338216677',
    }
];

const bookColumns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Authors',
        dataIndex: 'authors',
        key: 'authors'
    },
    // {
    //     title: 'Rating',
    //     dataIndex: 'Rating',
    //     key: 'Rating'

    // },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year'
    }
];

const dataStorage = JSON.parse(window.localStorage.getItem("dataKanban"));

const initialState = () => {
    if (dataStorage) {
        return dataStorage;
    } else {
        window.localStorage.setItem("dataKanban", JSON.stringify(store));
        return store;
    }
};

const showResStorage = JSON.parse(window.localStorage.getItem("showResStorage"));

const initialShowRes = () => {
    if (showResStorage) {
        return showResStorage;
    } else {
        window.localStorage.setItem("showResStorage", JSON.stringify(false));
        return false;
    }
}

const Book = ({ book }) => {
    const description = book.volumeInfo.description?.substr(0, 150) || '';
    const imageLinks = book.volumeInfo.imageLinks;
    const thumbnail = imageLinks ? imageLinks.thumbnail : 'https://via.placeholder.com/128x196?text=No+Image';

    const testAddBook = () => {
        console.log("adding: " + book.volumeInfo.title)
    }

    return (
        <div>
            <h3>{book.volumeInfo.title}</h3>
            <p>{description}...</p>
            <img src={thumbnail} alt={`Cover of ${book.volumeInfo.title}`} />

        </div>
    );
};

const Explore = () => {
    const [dashData, setDashData] = useState(initialState);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [books, setBooks] = useState([]);

    const [showRes, setShowRes] = useState(initialShowRes);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const results = searchBooks(searchQuery);
        const results = await searchBooks(searchQuery);
        setBooks(results);
        console.log("THIS IS THE SEARCH results: ")
        console.log(results)
        // window.localStorage.setItem("showResStorage", JSON.stringify(true));
    }

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        console.log(searchQuery);
    };

    const updateSearchResults = () => {
        // getExploreSearch(searchQuery).then((res) => {
        //     setSearchResults(testSearchData);
        // });
        console.log("yurrrr");
        setSearchResults(testSearchData);
        console.log(testSearchData);
    };

    // add to dashboard

    const addBook = (record) => {
        const title = record.title;
        const isbn = record.isbn;

        if (!title) {
            return;
        }

        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            isbn,
            title,
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
            <div className="inner">
                <form className="form-container">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="What do you want to read?"
                        name="title"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                    <button className="input-submit" onClick={handleSubmit}>
                        <FaSearch />
                    </button>
                </form>

                <div className="grid-container">
                    {books.map((book) => (
                        <div className="grid-item">
                            <Book key={book.id} book={book} />
                            {/* <button className="input-submit" onClick={addBook}>
                                <FaPlusCircle />
                            </button> */}
                        </div>
                    ))}
                </div>

                {/* {showRes && (
                <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
                    <Divider />
                    <p><i>Click on a book to add it to your reading list.</i></p>
                    <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
                        <Table
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        addBook(record);
                                    },
                                };
                            }}
                            columns={bookColumns}
                            dataSource={searchResults}
                            pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}
                        />
                    </div>
                </div>
                )} */}
            </div>
        </div>
    );
};

export default Explore;