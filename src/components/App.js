import React, {useState, useEffect} from "react";
import PupName from "./PupName"
import PupInfo from "./PupInfo"

function App() {
  const [pups, setPups] = useState([])
  const [filter, setFilter] = useState(false)
  const [pupToDisplay, setPupToDisplay] = useState({
    name:"",
    image:"",
    isGoodDog: true,
    id: 0
  })

  useEffect(()=> {
    fetch("http://localhost:3001/pups")
    .then(resp => resp.json())
    .then(doggieData => setPups(doggieData))
  }, [])

  function handleNameClick(id) {
    setPupToDisplay(pups.find(pup => pup.id === id))
  }

  const dogsToDisplay = pups.filter(pup => {
    if(filter === false) {
      return true
    }
    return pup.isGoodDog === true
  }).map(pup => {
    return <PupName 
      name={pup.name} 
      id={pup.id} 
      handleNameClick={handleNameClick} 
      key={pup.id}
    />
  })

  function handleGoodnessClick(id, goodness){
    const dogData = pups.find(pup => pup.id === id)
    const newDogData = {
      ...dogData,
      isGoodDog: !goodness
    }
    fetch(`http://localhost:3001/pups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDogData)
    })
    .then(resp => resp.json())
    .then(data => {
      const newPups = pups.map(pup => {
        if(pup.id === id){
          return data
        }
        return pup
      })
      setPups(newPups)
      setPupToDisplay({
        ...pupToDisplay,
        isGoodDog: !pupToDisplay.isGoodDog
      })
    })
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={() => setFilter(!filter)} >{filter ? "Filter good dogs: ON" :"Filter good dogs: OFF"}</button>
      </div>
      <div id="dog-bar">{dogsToDisplay}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <PupInfo 
            name={pupToDisplay.name} 
            image={pupToDisplay.image} 
            isGoodDog={pupToDisplay.isGoodDog} 
            id={pupToDisplay.id}
            handleGoodnessClick={handleGoodnessClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
