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
    "into": ["in", "inside", "within"],
    "to":["till", "toward", "unto" ],
    "all": ["absolutely", "complete", "completely", "entire","entirely", 
    "entirety", "full", "fully", "total", "totally", "utterly", "wholly"],
    "commitment": ["agreement", "compact", "contract", "deal", "pact", "undertaking"],
    "community" : ["citizenry",  "citizens",  "inhabitants",  "populace", "population", "residents",],
    "delivery": ["dispatch"],
    "development": ["advance", "ameliorate", "boost", "enhance","improve", "increase","upgrade"],
    "institution": ["institute"],
    "knowledge": ["knowledgeable", "astute", "brainy", "bright", "brilliant", "canny", "clever", "discerning", "gifted", "intelligent", "intuitive", "perceptive", "perspicacious", "smart", "talented", "wise"],
    "provide": ["contribute", "dispense", "equip", "furnish", "supply" ],
    "student":["pupil", "scholar"],
    "superior":["senior"],
    "system":["structure"],
    "competent":["able", "can", "capable",  "could"],
    "innovative":["artistic", "creative", "imaginative",  "ingenious", "inventive", "visionary"],
    "leader":["conductor", "escort", "guide",  "usher"],
    "relevant":["impact", "ramifications", "repercussions",  "significance"],
    "responsible":["charge", "liability", "obligation",  "onus"],
    "vision":["eye", "eyeball", "eyes",  "eyesight"],
    "angry":["aggravation", "anger", "annoyance",  "crossness", "displeasure", "exasperation", "fury", "indignation", "irascibility",  "ire", "irritability", "irritation", "outrage", "pique", "rage",  "vexation", "wrath"],
    "bewildered":["baffled", "bemused", "confounded",  "mystified", "nonplussed", "perplexed", "puzzled"],
    "coward":["milksop", "weakling"],
    "crazy":["crazed", "demented", "deranged",  "insane", "lunatic", "mad", "nuts", "unhinged", "wacky"],
    "cry":["sob", "tears", "weep",  "wept"],
    "depressed":["dejected", "depression", "gloomy",  "grief", "melancholy", "sorrow"],
    "dizzy":["giddy", "lightheaded", "muzzy",  "shaky", "unsteady", "wobbly", "woozy"],
    "doubt":["apprehension", "chariness", "cynicism",  "disbelief", "distrust", "dubious", "leeriness", "misgiving", "mistrust",  "qualm", "qualms", "reservation", "skepticism", "unease", "wariness"],
    "eager":["ardent", "ardor", "avid",  "avidity", "eagerness", "earnest", "earnestness", "energy", "enthusiasm",  "enthusiastic", "fervent", "fervor", "gusto", "keen", "keenness",  "motivated", "passion", "passionate", "vehemence", "verve", "vigor",  "zeal", "zealous", "zest"],
    "embarrass":["abash", "chagrin", "humiliate",  "mortify", "shame", "embarrassing"],
    "envy":["covetous", "covetousness", "envious"],
    "excited":["enlivened", "enraptured", "exhilarated",  "thrilled"],
    "fear":["antipathy", "aversion", "aversion",  "dread", "fright", "horror", "phobia",  "terror", "trepidation"],
    "friendly":["affable", "agreeable", "amiable",  "amicable", "congenial", "cordial", "genial", "hospitable", "kindly",  "sociable"],
    "happy":["blissful", "buoyant", "cheeful",  "cheery", "delight", "elated", "glad", "gleeful", "merry"],
    "hungry":["famished", "ravenous", "starved",  "starving"],
    "jealous":["jealousy"],
    "jolly":["jocular", "joy", "joyful",  "joyous", "energetic"],
    "lazy":["lackadaisical", "lax", "lethargic"],
    "love":["attachment", "beloved", "besottedness",  "doting", "endearment", "fondness", "idolization", "intimacy", "tenderness",  "warmth", "idolize", "idolizing"],
    "pity":["relent", "sympathize", "commiserate",  "condole", "empathize","feel"],
    "relaxed":["calm", "composed", "coolheaded",  "ease", "equable", "nonconfrontational", "pacify", "phlegmatic", "placid",  "quieten", "relax", "relief", "serene", "slacken", "still",  "tranquil", "unemotional", "unexcitable", "unflustered", "unperturbed", "unruffled",  "untroubled"],
    "sad":["blue", "crestfallen", "desolate",  "despairing", "despondent", "disconsolate", "dismal", "doleful", "downcast", "downhearted", "forlorn",  "glum", "low-spirited", "miserable", "mournful", "sorrowful", "unhappy",  "woeful"],
    "satisfied":["contented", "fulfilled", "gratified"],
    "scared":["afraid", "fearful",  "frightened",  "horrified", "petrified", "startled", "terrified",  "terror", "horror", "fright"],
    "serious":["dour", "grave", "grim",  "sober", "somber"],
    "shy":["bashful", "coy", "diffident",  "insecure", "introvert", "sheepish", "timid", "unconfident",  "withdrawn"],
    "black":["ebony"],
    "bathroom":["washroom"],
    "battery":["cell", "charge"],
    "bed":["cot"],
    "blanket":["covering"],
    "candle":["glim", "pillar", "taper",  "votive"],
    "clock":["time", "timing"],
    "clothes":["apparel", "array", "attire",  "clothe", "clothing", "costume", "dress", "ensemble", "frock",  "garb", "garment", "getup", "gown", "habiliments", "outfit",  "raiment", "robe", "vestments", "wear"],
    "comb":["brush"],
    "computer":["desktop", "pc"],
    "cup":["mug", "teacup"],
    "door":["doorway", "opening", "portal"],
    "eat":["dine", "partake", "snack",  "sup"],
    "electricity":["energy", "current", "power",  "static"],
    "flashlight":["torch"],
    "furniture":["fittings", "fitting", "furnish",  "furnishing", "furnishings"],
    "gate":["gateway"],
    "knock":["rap", "tap"],
    "light":["firelight", "floodlight", "headlamp",  "lamp", "lamplight", "lantern", "sidelight"],
    "oven":["bake"],
    "razor":["shaver"],
    "sleep":["asleep", "doze", "sleep",  "nap", "napping", "dozing"],
    "socks":["sock", "stockings", "stocking",  "", "", "",],
    "television":["TV"],
    "toilet":["commode", "latrine", "lavatory",  "loo", "outhouse", "privy",  "restroom", "urinal"],
    "trash":["garbage", "junk", "litter",  "refuse", "rubbish", "scrap", "waste"],
    "tub":["bath", "bathtub"],
    "wash":["bathe"],
    "baby":["infant", "newborn"],
    "child":["junior", "minor", "preteen",  "youngster"],
    "children":["brood", "descendants", "juniors",  "minors", "offspring", "preteens", "progeny", "youngsters", "minors"],
    "father":["dad"],
    "grandfather":["grandad", "grandpa"],
    "grandmother":["grandma", "granny"],
    "mother":["mom"],
    "ape":["gorilla"],
    "bee":["bumblebee", "drone", "honeybee"],
    "bird":["beak", "bill", "nib"],
    "cow":["cattle"],
    "crocodile":["alligator"],
    "deer":["buck", "doe", "hart",  "hind", "stag", "elk",],
    "dog":["canine", "cur", "hound",  "mongrel", "mutt", "pup","puppy", "dogs"],
    "duck":["goose", "geese"],
    "hen":["chicken", "fowl", "poultry"],
    "mule":["ass", "burro", "donkey",  "hinny", "jackass", "jenny"],
    "sheep":["ewe", "lamb", "ram",  "wether"],
    "beard":["bristles", "goatee", "stubble"],
    "body":["anatomy", "figure", "frame",  "physique", "torso", "trunk"],
    "bone":["skeleton"],
    "brain":["brainpower", "brains", "cleverness",  "wisdom"],
    "breast":["bosom", "bust", "mamma"],
    "chest":["thorax"],
    "face":["countenance", "physiognomy"],
    "nose":["snout"],
    "skin":["dermis", "epidermis"],
    "throat":["gullet", "windpipe"],
    "beer":["brew"],
    "butter":["spread"],
    "egg":["hatch"],
    "food":["meal", "refreshment", "sustenance"],
    "jelly":["gelatin", "gelatinous", "mucilaginous",  "viscid", "viscous"],
    "pasta":["noodles", "noodle"],
    "softdrink":["cola", "solda", "coke"],
    "Steak":["meat"],
    "pickle":["pickled", "pickles", "acidity",  "sour"],
    "baptism":["christening", "naming"],
    "offering":["benefaction", "contribution", "donation"],
    "praise":["adore", "glorify", "hallow",  "honor", "laud", "magnify",  "venerate"],
    "preach":["evangelize", "gospelize", "propagate",  "sermonize"],
    "savior":["deliverer", "redeemer"],
    "addiction":["addict", "addicted", "dependency",  "overuse"],
    "alcohol":["acid"],
    "alcoholic":["crapulous", "dipsomaniac", "drinker",  "drunker", "inebriated", "inebriate", "intoxicate", "sot","tippler", "tipsy"],
    "bandage":["plaster"],
    "blind":["sightless", "unseeing", "unsighted",  "visionless"],
    "blood":["bleed"],
    "capsule":["caplet", "lozenge", "pastille",  "pellet", "pill", "tablet"],
    "dehydrated":["arid", "dessicated", "drought",  "dry", "moistureless", "parched", "rainless", "scorched", "waterless"],
    "depressant":["calmative", "opiate", "soporific"],
    "drug":["medicament",  "pharmaceutical"],
    "dyspepsia":["colic", "gripe", "indigestion"],
    "fever":["febrility"],
    "gauze":["dressing"],
    "hallucinogen":["dope"],
    "health":["fitness", "physical", "wellness"],
    "hospital":["hospice"],
    "ill":["ailing", "illness", "sickness", "unwell"],
    "immunization":["shot"],
    "itch":["irritation", "itchiness", "prickle",  "prickling", "tickle", "tickling","tickle","tickling"],
    "mania":["compulsion", "fixation", "preoccupation"],
    "medication":["medicament", "pharmaceutical"],
    "overweight":["chubby", "corpulent", "fat",  "fleshy", "heavyset", "meaty","paunchy", "plump", "portly",  "potbelied", "rotund", "stout"],
    "pain":["ache", "agony", "discomfort",  "harm", "hurt", "injure","pang", "pricking", "soreness",  "sting", "throb", "twinge"],
    "paraplegic":["crippled", "disabled", "lame"],
    "pill":["caplet", "lozenge", "pastille",  "pellet"],
    "poison":["toxicant", "venom"],
    "pregnant":["expectant"],
    "respiration":["breathe", "breath", "inhalation"],
    "sanitarium":["sanatorium"],
    "seizure":["attack", "bout", "fit"],
    "sprain":["twist", "wrench"],
    "sterile":["aseptic", "clean", "hygienic",  "immaculate", "sanitary", "spotless","unstained",  "unsullied"],
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
