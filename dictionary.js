document.addEventListener("DOMContentLoaded", function () {
    const alphabetLink = document.getElementById("alphabet-link");
    const numbersLink = document.getElementById("numbers-link");
    const wordListLink = document.getElementById("word-list-link");
    const alphabetList = document.getElementById("alphabet-list");
    const numbersList = document.getElementById("numbers-list");
    const wordList = document.getElementById("word-list");
    const alphabetContainer = document.getElementById("alphabet-container");
    const numbersContainer = document.getElementById("numbers-container");
    const wordListContainer = document.getElementById("word-list-container");
    const categoryNavbar = document.querySelector(".category-navbar");
    const navbar = document.querySelector(".navbar");

    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    alphabet.forEach(letter => {
        const listItem = document.createElement("li");
        listItem.textContent = letter;
        alphabetContainer.appendChild(listItem);
    });

    numbers.forEach(number => {
        const listItem = document.createElement("li");
        listItem.textContent = number;
        numbersContainer.appendChild(listItem);
    });

    function updateWordList() {
        wordListContainer.innerHTML = '';

        numbers.forEach(number => {
            const listItem = document.createElement("li");
            listItem.textContent = number;
            wordListContainer.appendChild(listItem);
        });

        alphabet.forEach(letter => {
            const listItem = document.createElement("li");
            listItem.textContent = letter;
            wordListContainer.appendChild(listItem);
        });
    }

    let isAlphabetListVisible = false;
    let isNumbersListVisible = false;
    let isWordListVisible = false;

    //visibility of the alphabet list
    alphabetLink.addEventListener("click", function (e) {
        e.preventDefault(); 

        if (!isAlphabetListVisible) {
            alphabetList.classList.remove("hidden");
            numbersList.classList.add("hidden");
            wordList.classList.add("hidden");
            isAlphabetListVisible = true;
            isNumbersListVisible = false;
            isWordListVisible = false;
        }
    });

    //visibility of the numbers list
    numbersLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (!isNumbersListVisible) {
            numbersList.classList.remove("hidden");
            alphabetList.classList.add("hidden");
            wordList.classList.add("hidden");
            isNumbersListVisible = true;
            isAlphabetListVisible = false;
            isWordListVisible = false;
        }
    });

    //visibility of the word list
    wordListLink.addEventListener("click", function (e) {
        e.preventDefault();

        if (!isWordListVisible) {
            updateWordList(); // Populate the word list
            wordList.classList.remove("hidden");
            alphabetList.classList.add("hidden");
            numbersList.classList.add("hidden");
            isWordListVisible = true;
            isAlphabetListVisible = false;
            isNumbersListVisible = false;
        }
    });
});
