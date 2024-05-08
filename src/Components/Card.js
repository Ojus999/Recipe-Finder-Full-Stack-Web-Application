import "../App.css"

export default function Card({id,title,image}){
    return(        
        <div className="card">            
            <p><b>Recipe ID : </b>{id}</p>
            <p><b>Recipe Name:</b></p>
            <p>{title}</p>
            <img src={image} alt="Not Found" />
            <button>Click Here</button>
        </div>
    );
}