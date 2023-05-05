import React, { useState } from 'react';

const PreferencesSurvey = () => {
    const [genres, setGenres] = useState("");
    const [question2, setQuestion2] = useState(false);
    const [question3, setQuestion3] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Genres: ' + genres);
    }

    const handleGenresChange = (event) => {
        setGenres(event.target.value);
    };

    return (
        <div>
            <p>Generates recommendations based on books your preferences. <i>Results may take up to 30 seconds.</i></p>

            <h4>List 3 genres you like.</h4>
            <form className="form-container recommend">
                <input
                    type="text"
                    className="input-text"
                    placeholder="Romance, Contemporary, Mystery, ..."
                    name="title"
                    value={genres}
                    onChange={handleGenresChange}
                />
            </form>
            <button className="big-button" onClick={handleSubmit}>
                <h3>Generate</h3>
            </button>
        </div>

    );
};

export default PreferencesSurvey;
