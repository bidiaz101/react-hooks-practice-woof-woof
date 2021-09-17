import React from "react"

function PupInfo({name, image, isGoodDog, id, handleGoodnessClick}) {
    return (
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <button onClick={() => {handleGoodnessClick(id, isGoodDog)}}>{isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        </div>
    )
}

export default PupInfo