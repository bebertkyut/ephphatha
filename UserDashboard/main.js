// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
    authDomain: "ephphathadb.firebaseapp.com",
    projectId: "ephphathadb",
    storageBucket: "ephphathadb.appspot.com",
    messagingSenderId: "408778244868",
    appId: "1:408778244868:web:43bb14d52f45c4c5424651",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const synonymsMap = {
    "cheerful": ["happy", "joyful", "content"],
    "attend": ["participate", "join"],
    "deliver": ["give", "hand over"],
    "leader": ["head", "chief", "boss"],
    "angry": ["anger", "fury", "wraith"],
};

window.playVideo = function(word) {
    const videoPlayer = document.getElementById('videoPlayer');
    const baseWord = findBaseWord(word.toLowerCase());
    const processedVideoName = baseWord.replace(/[^\w\s]/g, '').toLowerCase();
    const videoPath = 'Animations/' + processedVideoName + '.mp4';

    // Get reference to the video in Firebase Storage
    const videoRef = ref(storage, videoPath);

    getDownloadURL(videoRef).then(function(url) {
        var video = document.createElement('video');
        video.setAttribute('width', '940');
        video.setAttribute('height', '500');
        video.playbackRate = currentPlaybackSpeed;

        var source = document.createElement('source');
        source.setAttribute('src', url);
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
    }).catch(function(error) {
        console.error('Error getting video URL:', error);
        displayPicture();
        hidePlaybackButtons();
    });
};

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
    img.setAttribute('width', '900');
    img.setAttribute('height', '500');

    videoPlayer.innerHTML = '';
    videoPlayer.appendChild(img);
}

var currentPlaybackSpeed = 1;
var activeVideo = null;

window.record = function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';

    var videoPlayer = document.getElementById('videoPlayer');
    var videoTitle = document.getElementById('videoTitle');

    var picturePath = '../Assets/hear.png';
    var img = document.createElement('img');
    img.setAttribute('src', picturePath);
    img.setAttribute('width', '900');
    img.setAttribute('height', '500');

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
            document.getElementById('playbackButtons').style.display = 'block';
        });
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function () {
        var stillPicturePath = '../Assets/still.png';
        var stillImg = document.createElement('img');
        stillImg.setAttribute('src', stillPicturePath);
        stillImg.setAttribute('width', '900');
        stillImg.setAttribute('height', '500');

        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(stillImg);
        console.log('Speech recognition ended');
    };

    recognition.start();
};


window.playVideos = function() {
    var videoNames = document.getElementById('videoNames').value.replace(/\s+/g, ' ').trim().split(' ');
    var videoPlayer = document.getElementById('videoPlayer');
    var videoTitle = document.getElementById('videoTitle');

    // Dissect multi-digit numbers into individual digits
    var dissectedVideoNames = videoNames.flatMap(name => {
        if (/^\d+$/.test(name)) {
            return name.split('');
        }
        return name;
    });

    videoTitle.innerHTML = dissectedVideoNames.map(name => `<span>${name}</span>`).join(' ');

    document.getElementById('playbackButtons').style.display = 'block';
    highlightButton('btnNormal');

    playNextVideo(dissectedVideoNames, 0, videoPlayer, function () {
        displayPicture();
        document.getElementById('videoTitle').textContent = ' ';
        document.getElementById('playbackButtons').style.display = 'block';
    });
};


window.removeSymbols = function(word) {
    return word.replace(/[^\w\s]/g, '').toLowerCase();
}

var currentPlaybackSpeed = 1;
var activeVideo = null;

function playNextVideo(videoNames, index, videoPlayer, callback) {
    if (index >= videoNames.length) {
        // If all videos are played, execute the callback function
        if (callback && typeof callback === "function") {
            callback();
        }
        return;
    }

    var originalVideoName = videoNames[index];
    var processedVideoName = originalVideoName.replace(/[^\w\s]/g, '').toLowerCase();

    // Firebase Storage reference
    const videoRef = ref(storage, 'Animations/' + processedVideoName + '.mp4');

    getDownloadURL(videoRef).then(function (url) {
        // If the video exists in Firebase Storage, play it
        var video = document.createElement('video');
        video.setAttribute('width', '900');
        video.setAttribute('height', '500');
        video.playbackRate = currentPlaybackSpeed;

        var source = document.createElement('source');
        source.setAttribute('src', url);
        source.setAttribute('type', 'video/mp4');

        video.appendChild(source);

        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(video);

        activeVideo = video;

        var videoTitle = document.getElementById('videoTitle');
        var currentWord = videoTitle.children[index];

        currentWord.style.color = 'red';

        video.onended = function () {
            activeVideo = null;
            currentWord.style.color = 'white';
            playNextVideo(videoNames, index + 1, videoPlayer, callback);
        };

        video.play().catch(function (error) {
            console.error('Error playing video:', error);
            playNextVideo(videoNames, index + 1, videoPlayer, callback);
        });
    }).catch(function (error) {
        console.error('Error retrieving video from Firebase:', error);

        // Spell out the word if the video is not found
        const letters = processedVideoName.split('');
        playNextLetter(letters, 0, videoPlayer, videoNames, index, false, callback);
    });
}


window.playNextLetter = function(letters, index, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback) {
    var videoTitle = document.getElementById('videoTitle');
    var currentWord = videoTitle.children[wordIndex];

    if (!currentWord.classList.contains('highlighted')) {
        currentWord.classList.add('highlighted');
        currentWord.innerHTML = '';
        videoNames[wordIndex].split('').forEach(function (char, i) {
            var span = document.createElement('span');
            span.textContent = char;
            currentWord.appendChild(span);
        });
    }

    if (index >= letters.length) {
        var lastLetterIndex = letters.length - 1;
        currentWord.children[lastLetterIndex].style.color = 'white';
        playNextVideo(videoNames, wordIndex + 1, videoPlayer, callback);
        return;
    }

    var letter = letters[index].toLowerCase();
    var videoPath = `Animations/${letter}.mp4`;

    // Firebase Storage reference
    const videoRef = ref(storage, videoPath);

    getDownloadURL(videoRef)
        .then(function(url) {
            var video = document.createElement('video');
            video.setAttribute('width', '900');
            video.setAttribute('height', '500');
            video.playbackRate = currentPlaybackSpeed;

            var source = document.createElement('source');
            source.setAttribute('src', url);
            source.setAttribute('type', 'video/mp4');

            video.appendChild(source);

            videoPlayer.innerHTML = '';
            videoPlayer.appendChild(video);

            activeVideo = video;

            // Reset the color of previous letters to white
            var previousLetters = currentWord.querySelectorAll('span');
            previousLetters.forEach(function(span) {
                span.style.color = 'white';
            });

            // Highlight the current letter
            var currentLetter = currentWord.children[index];
            currentLetter.style.color = 'red';

            video.onended = function() {
                activeVideo = null; 
                playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
            };

            video.play().catch(function(error) {
                console.error('Error playing video:', error);
                playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
            });
        })
        .catch(function(error) {
            console.error('Error retrieving video from Firebase:', error);
            playNextLetter(letters, index + 1, videoPlayer, videoNames, wordIndex, hasQuestionMark, callback);
        });
};

window.isSymbol = function(char) {
    return /[^\w\s]/.test(char);
}

window.setPlaybackSpeed = function(speed) {
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
