// App.js

import "../App.css";

async function sendPOSTmethod({id, title, image}) {
    try {
        const response = await fetch("http://localhost:3001/save", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({id, title, image}),
        });
        const data = await response.json();
        window.alert(data.message);
    } catch (err) {
        console.log(err);
    }
}

export default function Card({id, title, image}) {
    return (
        <div className="card">
            <p><b>Recipe ID : </b>{id}</p>
            <p><b>Recipe Name:</b></p>
            <p>{title}</p>
            <img src={image} alt="Not Found" />
            <button onClick={() => sendPOSTmethod({id, title, image})}>Click Here to save</button>
        </div>
    );
}
