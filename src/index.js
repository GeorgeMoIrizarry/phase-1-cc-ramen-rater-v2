// index.js 

// Callbacks
const handleClick = (ramen) => {
  let ramenId = ramen.target.id
  console.log (ramenId)
  let rating = document.querySelector('#rating-display')
  const imgPlaceHolder = document.querySelector('#selected-ramen-picture')
  const namePlaceHolder = document.querySelector('#selected-ramen-name')
  const restPlaceHolder = document.querySelector('#selected-ramen-restaurant')
  let comment = document.querySelector('#comment-display')
  comment.textContent = ''
  rating.textContent = ''
  const ramenApi = "http://localhost:3000/ramens";
  fetch(ramenApi)
    .then((resp) => resp.json())
    .then((data) => handleRtCm(data))
    function handleRtCm(ramenApi) {
      ramenApi.forEach((ramObj) => {
        if (ramObj.id == ramenId) {
          rating.textContent = ramObj.rating
          comment.textContent = ramObj.comment
          imgPlaceHolder.src = ramObj.image
          namePlaceHolder.textContent = ramObj.name
          restPlaceHolder.textContent = ramObj.restaurant
        } else return false 
      })
    }
};

const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let newJsonObj = {}
    let inputs = document.querySelectorAll('input')
    newJsonObj = {
      name : e.target.name.value,
      restaurant : e.target.restaurant.value,
      image : e.target.image.value,
      rating : e.target.rating.value,
      comment : e.target.newcomment.value
    }
    fetch("http://localhost:3000/ramens", {
      method : 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newJsonObj)
    })
      .then((resp) => resp.json)
      .then((data) => displayRamens(data))
    inputs.forEach((input) => {
      if (input.className == 'clear'){
        input.value = ''
      } else return false
    
    })
    
    
  })
  
}

const displayRamens = () => {
  const ramenMenuDiv = document.querySelector('#ramen-menu');
  const ramenApi = "http://localhost:3000/ramens";
  fetch(ramenApi)
    .then((resp) => resp.json())
    .then((data) => renderRamImg(data))
  function renderRamImg(ramArr) {
    return ramArr.forEach((ramObj) => {
      let img = document.createElement('img')
      img.src = ramObj.image
      img.id = ramObj.id
      ramenMenuDiv.appendChild(img)
      img.addEventListener('click', handleClick)
    })
    
  }
  
};

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
