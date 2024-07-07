import drip_goku from './assets/drip_goku.png' 


function Card() {

    return(
        <div className="card">
            <img className='card-image' src={drip_goku} alt="drip goku"></img>
            <h2 className='card-title' >Emil</h2>
            <p>testing react </p>


        </div>
    );
}

export default Card