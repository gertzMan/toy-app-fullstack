import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    const robohashUrl = `https://robohash.org/${toy._id}?set=set2&size=200x200`

    return < >
        <h4>{toy.name}</h4>
        <img src={robohashUrl}></img>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <div className="label-container">{toy.labels.map(l => <span key = {l}>{l}</span>)}</div>
        <div className="btn-container">
             <Link className="btn" to={`/toy/${toy._id}`}>Details</Link>
            <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
        </div>
       
    </>
}