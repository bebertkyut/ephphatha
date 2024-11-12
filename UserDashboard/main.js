const synonymsMap = {
    "cheerful": ["happy", "joyful", "content"],
    "attend": ["participate", "join"],
    "deliver": ["give", "hand over"],
    "leader": ["head", "chief", "boss"],
    "angry": ["anger", "fury", "wraith"],
};

function playVideo(word) {
    const videoPlayer = document.getElementById('videoPlayer');
    const baseWord = findBaseWord(word.toLowerCase());
    const processedVideoName = baseWord.replace(/[^\w\s]/g, '').toLowerCase();
    const videoPath = '../SignAsset/' + processedVideoName + '.mp4';

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', videoPath, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var video = document.createElement('video');
            video.setAttribute('width', '640');
            video.setAttribute('height', '360');
            video.playbackRate = currentPlaybackSpeed;

            var source = document.createElement('source');
            source.setAttribute('src', videoPath);
            source.setAttribute('type', 'video/mp4');

            video.appendChild(source);

            videoPlayer.innerHTML = '';
            videoPlayer.appendChild(video);

            video.play().catch(function (error) {
                console.error('Error playing video:', error);
                hidePlaybackButtons();
            });

            video.onended = function () {
                displayPicture();
                hidePlaybackButtons();
                document.getElementById('videoTitle').textContent = ' ';
            };
        } else {
            console.error('Video not found:', videoPath);
            displayPicture();
            hidePlaybackButtons();
        }
    };
    xhr.send();
}

function findBaseWord(word) {
    if (synonymsMap[word]) {
        return word;
    }

    for (const baseWord in synonymsMap) {
        if (synonymsMap[baseWord].includes(word)) {
            return baseWord;
        }
    }

    return word;
}

function displayPicture() {
    var videoPlayer = document.getElementById('videoPlayer');
    var picturePath = '../Assets/still.png';

    var img = document.createElement('img');
    img.setAttribute('src', picturePath);
    img.setAttribute('width', '640');
    img.setAttribute('height', '360');

    videoPlayer.innerHTML = '';
    videoPlayer.appendChild(img);
}

var currentPlaybackSpeed = 1;
var activeVideo = null;

function record() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';

    var videoPlayer = document.getElementById('videoPlayer');
    var videoTitle = document.getElementById('videoTitle');

    var picturePath = '../Assets/hear.png';
    var img = document.createElement('img');
    img.setAttribute('src', picturePath);
    img.setAttribute('width', '640');
    img.setAttribute('height', '360');

    videoPlayer.innerHTML = '';
    videoPlayer.appendChild(img);

    recognition.onstart = function () {
        console.log('Speech recognition started');
    };

    recognition.onresult = function (event) {
        console.log(event);
        var transcript = event.results[0][0].transcript;

        var words = transcript.split(' ');
        videoTitle.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

        var mappedWords = words.map(word => {
            var cleanWord = word.replace(/[^\w\s]/g, '').toLowerCase();
            return findBaseWord(cleanWord);
        });

        document.getElementById('playbackButtons').style.display = 'block';
        highlightButton('btnNormal');

        playNextVideo(mappedWords, 0, videoPlayer, function () {
            displayPicture();
            videoTitle.textContent = ' ';
            document.getElementById('playbackButtons').style.display = 'none';
        });
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function () {
        var stillPicturePath = '../Assets/still.png';
        var stillImg = document.createElement('img');
        stillImg.setAttribute('src', stillPicturePath);
        stillImg.setAttribute('width', '640');
        stillImg.setAttribute('height', '360');

        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(stillImg);
        console.log('Speech recognition ended');
    };

    recognition.start();
}


function playVideos() {
    var videoNames = document.getElementById('videoNames').value.replace(/\s+/g, ' ').trim().split(' ');
    var videoPlayer = document.getElementById('videoPlayer');
    var videoTitle = document.getElementById('videoTitle');

    videoTitle.innerHTML = videoNames.map(name => `<span>${name}</span>`).join(' ');

    var mappedVideoNames = videoNames.map(name => {
        var cleanedName = removeSymbols(name);
        for (let baseWord in synonymsMap) {
            if (cleanedName === baseWord || synonymsMap[baseWord].includes(cleanedName)) {
                return baseWord; 
            }
        }
        return name;
    });

    document.getElementById('playbackButtons').style.display = 'block';
    highlightButton('btnNormal');

    var wordIndex = 0;
    playNextVideo(mappedVideoNames, wordIndex, videoPlayer, function () {
        displayPicture();
        document.getElementById('videoTitle').textContent = ' ';
        document.getElementById('playbackButtons').style.display = 'none';
    });
}


function removeSymbols(word) {
    return word.replace(/[^\w\s]/g, '').toLowerCase();
}

function playNextVideo(videoNames, index, videoPlayer, callback) {
    if (index >= videoNames.length) {
        // If all videos are played, execute the callback function
        if (callback && typeof (callback) === "function") {
            callback();
        }
        return;
    }

    var originalVideoName = videoNames[index];
    var hasQuestionMark = originalVideoName.includes('?');
    // Process the video name to remove symbols and convert to lowercase
    var processedVideoName = originalVideoName.replace(/[^\w\s]/g, '').toLowerCase();

    var videoPath = '../SignAsset/' + processedVideoName + '.mp4';

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', videoPath, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // If the video exists, play it
            var video = document.createElement('video');
            video.setAttribute('width', '640');
            video.setAttribute('height', '360');
            video.playbackRate = currentPlaybackSpeed;

            var source = document.createElement('source');
            source.setAttribute('src', videoPath);
            source.setAttribute('type', 'video/mp4');

            video.appendChild(source);

            videoPlayer.innerHTML = '';
            videoPlayer.appendChild(video);

            activeVideo = video; // Store the currently playing video

            var videoTitle = document.getElementById('videoTitle');
            var currentWord = videoTitle.children[index];

            // Highlight the entire word in red
            currentWord.style.color = 'red';

            video.onended = function () {
                activeVideo = null; // Reset the active video
                currentWord.style.color = 'white';
                playNextVideo(videoNames, index + 1, videoPlayer, callback);
            };

            video.play().catch(function (error) {
                console.error('Error playing video:', error);
                playNextVideo(videoNames, index + 1, videoPlayer, callback);
            });
        } else {
            // If the video does not exist, handle the word letter by letter
            var letters = processedVideoName.split('');
            playNextLetter(letters, 0, videoPlayer, videoNames, index, hasQuestionMark, callback);
        }
    };
    xhr.send();
}

function playNextLetter(letters, index, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback) {
    // Get the current word element
    var videoTitle = document.getElementById('videoTitle');
    var currentWord = videoTitle.children[wordIndex];

    // If the word hasn't been highlighted yet, do it now
    if (!currentWord.classList.contains('highlighted')) {
        // Add a class to mark the word as highlighted
        currentWord.classList.add('highlighted');
        // Clear the contents of the word to avoid duplication
        currentWord.innerHTML = '';
        // Create spans for each character of the word
        videoNames[wordIndex].split('').forEach(function (char, i) {
            var span = document.createElement('span');
            span.textContent = char;
            currentWord.appendChild(span);
        });
    }

    if (index >= letters.length) {
        // If all letters in the word have been processed, move to the next word
        // Change the color of the last letter of the word to white
        var lastLetterIndex = letters.length - 1;
        currentWord.children[lastLetterIndex].style.color = 'white';
        playNextVideo(videoNames, wordIndex + 1, videoPlayer, callback);
        return;
    }

    var letter = letters[index].toLowerCase();

    if (isSymbol(letter)) {
        // If the letter is a symbol, add it to the videoTitle and move to the next letter
        var span = document.createElement('span');
        span.textContent = letter;
        currentWord.appendChild(span);
        playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
    } else {
        var videoPath = '../SignAsset/' + letter + '.mp4';

        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', videoPath, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                // If video exists for the current letter, play it
                var video = document.createElement('video');
                video.setAttribute('width', '640');
                video.setAttribute('height', '360');
                video.playbackRate = currentPlaybackSpeed;

                var source = document.createElement('source');
                source.setAttribute('src', videoPath);
                source.setAttribute('type', 'video/mp4');

                video.appendChild(source);

                videoPlayer.innerHTML = '';
                videoPlayer.appendChild(video);

                activeVideo = video; // Store the currently playing video

                // Reset the color of previous letters to white
                var previousLetters = currentWord.querySelectorAll('span');
                previousLetters.forEach(function (span) {
                    span.style.color = 'white';
                });

                // Highlight the current letter
                var currentLetter = currentWord.children[index];
                currentLetter.style.color = 'red';

                video.onended = function () {
                    activeVideo = null; // Reset the active video

                    // Move to the next letter in the word
                    playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
                };

                video.play().catch(function (error) {
                    console.error('Error playing video:', error);
                    playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
                });
            } else {
                // If video doesn't exist, move to the next letter in the word
                playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
            }
        };
        xhr.send();
    }
}


function isSymbol(char) {
    return /[^\w\s]/.test(char);
}

function setPlaybackSpeed(speed) {
    currentPlaybackSpeed = speed;
    if (activeVideo) {
        activeVideo.playbackRate = speed;
    }
    highlightButton(speed === 0.5 ? 'btnSlow' : speed === 1 ? 'btnNormal' : 'btnFast');
}

function highlightButton(buttonId) {
    var buttons = document.querySelectorAll('#playbackButtons button');
    buttons.forEach(button => {
        button.classList.remove('highlighted');
    });

    document.getElementById(buttonId).classList.add('highlighted');
}

function hidePlaybackButtons() {
    document.getElementById('playbackButtons').style.display = 'none';
}