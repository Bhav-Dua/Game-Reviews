import React, { useState } from "react";

function LoginForm({ onLogin }) {

    const [formData, setFormData] = useState({username: "", password: ""});
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(onLogin)
                }
                else {
                    r.json(e).then(setErrors(e.errors))
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
            <div className="username">
            <label htmlFor="username">Username </label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleFormData} />
            </div>
            <div className="field">
            <label htmlFor="password">Password </label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleFormData} />
            </div>
            {errors.map(error => (
                <p>{error}</p>
            ))}
            <button className="ui button" type="submit">Submit</button>
        </form>
    )
}