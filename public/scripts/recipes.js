// FRONT END FILE TO INTERACT WITH THE DOM
var fadeTarget = document.getElementById("loader");
let sendData = document.getElementById('send-data')
let inputTitle = document.getElementById('newRecipeName')
let inputSDescr = document.getElementById('newRecipeShortDescription')
let inputServings = document.getElementById('servings')
let inputLevel = document.getElementById('level')
let inputCal = document.getElementById('cal')
let inputTime = document.getElementById('time')
let inputDescripton = document.getElementById('description')
let inputIngredients= document.getElementById('ingredients')
var TEXT1 = []
let list = document.getElementById('anthony-kitchen-recipes')







function fadeOutEffect() {
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

let disapear = () => {
    setTimeout(() => {
        fadeTarget.style.visibility = "hidden"
        
    }, 2000);
}

window.addEventListener('load', () => {
fadeOutEffect()
disapear()
})

// recipeButton.addEventListener('click', () => {
//     recipe.scrollIntoView({behavior: "smooth"})
// })


const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "ds8yd9u2q",
      uploadPreset: "e8st264k",

    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        TEXT1.push(result.info.url)
        document
          .getElementById("uploadedimage")
          .setAttribute("src", result.info.secure_url);
      }
    }
  );
  
  document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );


const addRecipeToDB = (infos) => {
  fetch('api/addRecipe', {
      method: 'POST',
      headers: {
          'content-Type': 'application/json',
      },
      body: JSON.stringify(infos),
  }) 
  .then(response => response.json())
  .then(data => {
      console.log('succes:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  })
}

const GetRecipeFromDB = () => {
  fetch('api/recipe', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      console.log(data.data);
      data.data.forEach((element, index) => {
          console.log(element);
          let recipeCard = `

          <div id="recipe-book">
          <div class="recipe-card" id="recipe-card-1">
      
            <aside>
          
              <img src="${element.url}" />
          
          
            </aside>
          
            <article>
          
              <h2>${element.title}</h2>
              <h3>${element.SDescr}</h3>
          
              <ul>
                <li><span class="icon icon-users"></span><span>${element.Servings}</span></li>
                <li><span class="icon icon-clock"></span><span>${element.Time}</span></li>
                <li><span class="icon icon-level"></span><span>${element.Level}</span></li>
                <li><span class="icon icon-calories"></span><span>${element.Cal}</span></li>
              </ul>
          
              <p>${element.Steps}</p>
          
              <p class="ingredients"><span>Ingredients:&nbsp;</span>${element.ingredients}</p>
          
            </article>
          
          </div>
          
        </div>`

          list.insertAdjacentHTML('beforeend', recipeCard) 
      });
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

sendData.addEventListener('click', () => {

  let Array = []
  Array.push(inputTitle.value, inputSDescr.value, inputServings.value, inputTime.value, inputLevel.value, inputCal.value, inputDescripton.value, inputIngredients.value, TEXT1[0] )
  addRecipeToDB(Array)
})

let button = document.getElementById('button')
button.addEventListener('click', () => {
  GetRecipeFromDB()
})