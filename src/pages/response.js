import React, { useState } from 'react';
import "../stylesheet/loginPage.css";

const ResponseForm = () => {
    const [inputs, setInputs] = useState({
        prompt: '',
        response: '',
    });

    const handleChange = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        // submit to backend
        fetch('http://localhost:8000/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: inputs.prompt,
                response: inputs.response
            })
        }).then(response => response.json())
            .then(data => {
                // console.log("data", data);
                window.location.href = '/admin';
            })
            .catch(error => {
                console.log("error", error);
                alert(error);
            });
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <h2>Add new Response</h2>
                <div>
                    <input
                        type="text"
                        name="prompt"
                        placeholder="Prompt Message"
                        value={inputs.prompt}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea name='response' placeholder='Type something'
                        onChange={handleChange}>

                    </textarea>
                </div>
                <button type="submit">Submit</button>
                <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        div {
          margin: 10px 0;
        }
        input, textarea {
          padding: 10px;
          font-size: 16px;
          width: 300px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          margin-top: 20px;
          background-color: blue;
          color: white;
          border: none;
          border-radius: 5px;
        }
      `}</style>
            </form>
        </div>

    );
};

export default ResponseForm;