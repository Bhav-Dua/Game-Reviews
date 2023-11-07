import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateGameForm({ onCreateGame }) {

    const [formData, setFormData] = useState({title: "", publisher: "", game_img: "", release_year: null});
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(onCreateGame)
                    history.push("/")
                }
                else {
                    r.json().then(r => setErrors(r.errors))
                }
            })
    }


    function handleFormData(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
            <label htmlFor="title">Title </label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleFormData} />
            </div>
            <div className="field">
            <label htmlFor="publisher">Publisher </label>
            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleFormData} />
            </div>
            <div className="field">
            <label htmlFor="game-img">Image </label>
            <input type="text" id="game-img" name="game_img" value={formData.game_img} onChange={handleFormData} />
            </div>
            <div className="field">
            <label htmlFor="release-year">Year of Release </label>
            <input type="number" id="release-year" name="release_year" min="1958" value={formData.release_year} onChange={handleFormData} />
            </div>
            {errors.map(error => (
                <p>{error}</p>
            ))}
            <button className="Submit-button" type="submit">Submit</button>
        </form>
    )
}

export default CreateGameForm;