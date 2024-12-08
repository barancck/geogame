# Guess The Country Game

## Project Description
The "Guess The Country" game displays the boundaries of a country on a world map and asks the user to guess the name of the country. The game is developed using Leaflet, GeoJSON data, and JavaScript. Users enter their guesses into an input field, and the game provides immediate feedback on whether the guess was correct or not. If the guess is correct, a new country is displayed. The user's score is also updated in real-time.

---

## Event Handlers (15%)

This project includes three key event handlers that manage user interactions and gameplay logic.

### 1️⃣ **Submit Button Click Event**
**Objective:** This event is triggered when the user clicks the "Submit" button after entering the country's name.  
**Benefit:** The input is processed, and the user's guess is verified. If the guess is correct, the score increases, and a new country is displayed.  

**Code Example:**
```javascript
document.getElementById('submit-guess').addEventListener('click', () => {
    handleUserInput();
});
```

**Explanation:**  
- The click event is attached to the `submit-guess` button.  
- When the button is clicked, the `handleUserInput()` function is called.  
- This function validates the user's guess and updates the score accordingly.  

---

### 2️⃣ **Window Load Event (for Map Size Update)**
**Objective:** Ensure the map is displayed at full size when the page is fully loaded.  
**Benefit:** Without this event, the map might load with incorrect dimensions, leaving it blank or misaligned.  

**Code Example:**
```javascript
window.addEventListener('load', () => {
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
});
```

**Explanation:**  
- The `window` load event ensures the map container is fully loaded before updating its size.  
- The `map.invalidateSize()` method forces Leaflet to recalculate the dimensions of the map.  

---

### 3️⃣ **Input Field Keydown Event (Enter Key Detection)**
**Objective:** Allow the user to press the "Enter" key to submit their guess.  
**Benefit:** This improves user experience by allowing users to submit their answers using the keyboard instead of clicking a button.  

**Code Example:**
```javascript
document.getElementById('guess-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});
```

**Explanation:**  
- When the user presses the "Enter" key, the `keydown` event is triggered.  
- If the key is "Enter", the `handleUserInput()` function is called, similar to clicking the submit button.  

---

## Closure Usage (10%)

Closures are used in this project to maintain access to variables that would otherwise be out of scope. The most prominent example of closure usage is in the interaction between `loadQuestion` and `handleUserInput`.

### Closure Example: currentCountryName
**Where it is used:** The variable `currentCountryName` is used as a closure to keep track of the current country name that the user is guessing.  
**Why it is useful:** By defining `currentCountryName` in the outer scope, it becomes accessible to both `loadQuestion` and `handleUserInput`, making it possible for these two functions to share the same country name.  

**Code Example:**
```javascript
let currentCountryName = ''; // Closure variable

function loadQuestion(data) {
    const randomCountry = data.features[Math.floor(Math.random() * data.features.length)];
    currentCountryName = randomCountry.properties.ADMIN.toLowerCase(); // Closure variable updated
}

function handleUserInput() {
    const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    if (userGuess === currentCountryName) {
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer was ${currentCountryName.toUpperCase()}.`);
    }
}
```

**Explanation:**  
- `currentCountryName` is declared in the outer scope.  
- It is updated inside `loadQuestion` whenever a new country is displayed.  
- The value of `currentCountryName` is later accessed in `handleUserInput` to check if the user's input is correct.  
- Without this closure, it would be difficult to persist the name of the country between these two functions.  

---

## DOM Interaction (15%)

Interacting with the DOM is crucial for this project as user inputs, buttons, and map updates require direct manipulation of HTML elements.

### 1️⃣ **Input Field Interaction**
**Objective:** Capture the user's guess and use it for validation.  
**DOM Element:**  
```html
<input type="text" id="guess-input" placeholder="Enter country name..." />
```

**Code Example:**
```javascript
const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
```

**How it works:**  
- The value of the input field is captured and cleaned using `trim()` to remove extra spaces.  
- The guess is converted to lowercase to make the check case-insensitive.  

---

### 2️⃣ **Button Click Interaction**
**Objective:** Trigger the guess-checking process when the user clicks the "Submit" button.  
**DOM Element:**  
```html
<button id="submit-guess">Guess</button>
```

**Code Example:**
```javascript
document.getElementById('submit-guess').addEventListener('click', () => {
    handleUserInput();
});
```

**How it works:**  
- The "click" event is attached to the button.  
- When clicked, the `handleUserInput()` function is called, which verifies if the user's guess is correct.  

---

### 3️⃣ **Score Display Update**
**Objective:** Update the score display based on correct or incorrect guesses.  
**DOM Element:**  
```html
<div id="score-container">
    Stars: <span id="stars">⭐⭐⭐</span>
</div>
```

**Code Example:**
```javascript
document.getElementById('stars').innerText = '⭐'.repeat(score);
```

**How it works:**  
- Whenever the score changes, the inner text of the `#stars` span is updated.  
- The new score is displayed using repeat() to create multiple stars.  

---

## Conclusion
This project utilizes event handlers, closures, and DOM interactions to create a fully interactive guessing game.  

**Summary of Key Concepts:**
| **Concept**           | **Example**                     |
|----------------------|-----------------------------------|
| **Event Handlers**     | Submit button, keydown event, window load |
| **Closure Usage**      | `currentCountryName` used across multiple functions |
| **DOM Interactions**   | Input field, submit button, score display |

These concepts provide a clear structure for building a dynamic, user-friendly experience where users can interact with the game intuitively.
