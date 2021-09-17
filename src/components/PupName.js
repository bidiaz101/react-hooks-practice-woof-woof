import React from "react"

function PupName({name, id, handleNameClick}) {
    return <span onClick={() => handleNameClick(id)} >{name}</span>
}

export default PupName