import React, { useState } from "react"
import { v4 as uuid } from "uuid";

import store from "../utils/store";
import Navbar from "../components/Navbar";
import { exploreBooks, getCoverImage } from "../utils/exploreAPI";
import SurveyComponent from "../components/explore/Survey";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
    const title = book.title ? book.title.substr(0, 53) : '';
    const author = book.author ? book.author : '';
    const description = book.description?.substr(0, 400) || '';
    // const isbn = book.isbn;
    const image = book.image ? book.image : 'https://via.placeholder.com/128x196?text=No+Image';

    return (
        <div>
            <img src={image} alt={`Cover of ${title}`} />
            <h3>{title}</h3>
            <p><b>by {author}</b></p>
            {/* <br /> */}
            <p>{description}</p>
        </div>
    );
};

const Recommend = () => {
    const [dashData, setDashData] = useState(initialState);
    const [bookQuery, setBookQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [generating, setGenerating] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setGenerating("\nGenerating...");
        const results = await exploreBooks(bookQuery);

        const arr = JSON.parse(results);
        console.log(arr)
        for (const b of arr) {
            const img = await getCoverImage(b);
            console.log(img)
            b["image"] = img;
        }
        
        setBooks(arr);
        setGenerating("");
    }

    const handleBookQueryChange = (event) => {
        setBookQuery(event.target.value);
    };

    // add to dashboard

    const addBook = (book) => {
        const id = uuid();
        const title = book.title;
        const image = book.image;

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
            <img src="https://em-content.zobj.net/thumbs/240/apple/354/books_1f4da.png" alt="books emoji logo" width={60} />
            <h1>Find your next read</h1>
            <p><i>Powered by OpenAI GPT-3.</i></p>
            <div className="pick-link"><p>Already know what you're reading? <a href="/search">Back to Search</a></p></div>
            <br />
            <Tabs>
                <TabList>
                    <Tab>Get Similar</Tab>
                    <Tab>Your Preferences</Tab>
                </TabList>

                <TabPanel>
                    <div className="inner">
                        <p>Generates recommendations based on books you like.</p>
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
                        <button className="big-button" onClick={handleSubmit}>
                            <h3>Get similar books</h3>
                        </button>
                        <p style={{ display: "inline" }}><i>Results may take up to 30 seconds.</i></p>
                        <div className="recs-output">
                            <p>{generating}</p>
                        </div>
                        <div className="grid-container">
                            {books.map((book) => (
                                <div className="grid-item-explore">
                                    <Book key={book.id} book={book} />
                                    <button onClick={() => addBook(book)}>
                                        <h4>Add to List</h4>
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </TabPanel>
                <TabPanel>
                    <SurveyComponent />
                </TabPanel>
            </Tabs>
            <br />
        </div>
    );
};

export default Recommend;