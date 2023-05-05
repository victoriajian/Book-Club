import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { explorePreferences } from "../../utils/exploreAPI"
import store from "../../utils/store";

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
    const description = book.description ? book.description : '';
    // const isbn = book.isbn;
    // const thumbnail = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : 'https://via.placeholder.com/128x196?text=No+Image';

    return (
        <div>
            {/* <img src={thumbnail} alt={`Cover of ${title}`} /> */}
            <h3>{title}</h3>
            <p><b>by {author}</b></p>
            <br />
            <p>{description}</p>
        </div>
    );
};

const SurveyComponent = () => {
    const [dashData, setDashData] = useState(initialState);
    
    const genreOptions = ['Romance', 'Mystery', 'Horror', 'Historical Fiction', 'Dystopian', 'Science Fiction'];
    const typeOptions = ['Contemporary', 'Young Adult', 'Classics', 'Memoirs', 'Short Stories']
    const featureOptions = ['Realistic Setting and Plot', 'Strong female characters', 'Award-winning writing', 'Focus on character development', 'Reflective themes'];

    const [genres, setGenres] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [features, setFeatures] = React.useState([]);

    const [generating, setGenerating] = useState("");
    const [books, setBooks] = useState([]);

    function handleGenreChange(e) {
        if (e.target.checked) {
            setGenres([...genres, e.target.value]);
        } else {
            setGenres(genres.filter((item) => item !== e.target.value));
        }
    }

    function handleTypeChange(e) {
        if (e.target.checked) {
            setTypes([...types, e.target.value]);
        } else {
            setTypes(types.filter((item) => item !== e.target.value));
        }
    }

    function handleFeatureChange(e) {
        if (e.target.checked) {
            setFeatures([...features, e.target.value]);
        } else {
            setFeatures(features.filter((item) => item !== e.target.value));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Genres: ' + genres);
        console.log('Types: ' + types);
        console.log('Features: ' + features);

        setGenerating("\nGenerating...");
        const results = await explorePreferences(genres, types, features);
        console.log(results)

        setBooks(JSON.parse(results))
        setGenerating("");
    }

    const addBook = (book) => {
        const id = uuid();
        const title = book.title;
        const image = 'https://via.placeholder.com/128x196?text=No+Image';

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
        <div className="inner">
            <p>Generates recommendations based on your reading preferences.</p>
            <div className="columns">
                <div className="col-item">
                    <h4>Genre</h4>
                    {genreOptions.map((g) => (
                        <div className="checkbox-item">
                            <input value={g} type="checkbox" onChange={handleGenreChange} />
                            <p> {g}</p>
                        </div>
                    ))}
                </div>

                <div className="col-item">
                    <h4>Style</h4>
                    {typeOptions.map((t) => (
                        <div className="checkbox-item">
                            <input value={t} type="checkbox" onChange={handleTypeChange} />
                            <p> {t}</p>
                        </div>
                    ))}
                </div>

                <div className="col-item">
                    <h4>
                        Features
                    </h4>
                    {featureOptions.map((f) => (
                        <div className="checkbox-item">
                            <input value={f} type="checkbox" onChange={handleFeatureChange} />
                            <p> {f}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button className="big-button" onClick={handleSubmit}>
                <h3>Generate</h3>
            </button>
            <p style={{ display: "inline" }}><i>Results may take up to 30 seconds.</i></p>
            <div className="recs-output">
                <p>{generating}</p>
            </div>
            <div className="grid-container-explore">
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
    );
};
export default SurveyComponent;