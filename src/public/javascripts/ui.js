const trackSliders = document.querySelectorAll('.track-slider');

trackSliders.forEach(trackSlider => {
    const track = trackSlider.querySelector(".track");
    const arrowRightBtn = trackSlider.querySelector('.album-arrow-right');
    const arrowLeftBtn = trackSlider.querySelector('.album-arrow-left');
    const parentArrowR = arrowRightBtn.parentElement;
    const parentArrowL= arrowLeftBtn.parentElement;

    const countSongs = track.children.length;
    let currentIndex = 0;
    const cardWidth = 768;
    
    function checkArrow() {
        if(currentIndex <= 0){
            parentArrowL.style.display = 'none';
        } else {
            parentArrowL.style.display = 'block';
        }
    
        if(currentIndex >= 0 && currentIndex < Math.floor(countSongs / 4)){
            parentArrowR.style.display = 'block';
        } else {
            parentArrowR.style.display = ' none';
        }
    }
    
    arrowRightBtn.addEventListener('click', () => {
        currentIndex++;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        checkArrow()
        console.log(currentIndex)
    });
    
    arrowLeftBtn.addEventListener('click', () => {
        if(currentIndex > 0){
            currentIndex--;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;   
            checkArrow()
        }
        console.log(currentIndex)
    });
    
    checkArrow()
})

// 
// const playBtn = document.querySelector('.js-play-btn');
const loopBtn = document.querySelector('.js-ctrl-loop');
const volume = document.querySelector('.js-volume-slider');
const timePassed = document.querySelector('.js-timePassed');
const duration = document.querySelector('.js-duration');
const timeLine = document.querySelector('.js-timeLine-bar');
// const audio = document.getElementById('audio');

const playBtn = document.querySelector('.js-ctrl-playBtn');
const songCards = document.querySelectorAll('.js-song-card');

console.log(songCards)



let currentAudio = null;
let currentSongBtn = null;
let isLoop = false;
let currentSongID = null;
songCards.forEach(songCard => {
    
    const audio = songCard.querySelector('.js-audio');
    const songID = songCard.dataset.id;
    const songCardPlayBtn = songCard.querySelector('.js-play-btn');
    
    songCardPlayBtn.addEventListener('click', () => {
        if (currentSongID === songID){
            if (currentAudio.paused) {
                currentAudio.play();
                changeIconPlay(playBtn,songID, true);
            } else {
                currentAudio.pause();
                changeIconPlay(playBtn ,songID, false);
            }
            return;  
        } 

        if(currentSongID && currentSongID !== songID) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            changeIconPlay(playBtn, currentSongID, false);
        }
        

        audio.play();
        currentSongID = songID;
        currentAudio = audio;
        currentSongBtn = songCardPlayBtn;
        setVolume(currentAudio);
        loadDurationSong(currentAudio);
        isLoopSong()
        changeIconPlay(playBtn, songID, true);
    })
    volume.oninput = () => {
        setVolume(currentAudio);
    }

    loopBtn.onclick = () => {
        isLoop = !isLoop;
        currentAudio.loop = isLoop;
        if(currentAudio.loop){
            loopBtn.style.color = 'orange';
        } else {
            loopBtn.style.color = 'white'
        }
    }
    audio.ontimeupdate = () => {
        timePassed.textContent = formatTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration * 100);
    
        timeLine.style.width = percent + '%';
    }   
    // console.log(audio)     
})

playBtn.onclick = () => {
    changeIconPlay(playBtn);
};

function changeIconPlay(btn, songID, isPlaying) {

    const songCards = document.querySelectorAll(`.song-card[data-id="${songID}"]`);
    console.log(songCards)
    if(isPlaying) {
        songCards.forEach(songCard => {
            const songCardPlayBtn = songCard.querySelector('.js-play-btn');
            songCardPlayBtn.classList.add('playing');
        })
        btn.classList.add('playing');
    } else {
        songCards.forEach(songCard => {
            const songCardPlayBtn = songCard.querySelector('.js-play-btn');
            songCardPlayBtn.classList.remove('playing');
        })
        btn.classList.remove('playing');
    }
}

function isLoopSong() {
    currentAudio.loop = isLoop;
}

function loadDurationSong(audio) {
    duration.textContent = formatTime(audio.duration);
}

function setVolume(audio) {
    audio.volume = volume.value;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

const playerBar = document.querySelector('container-player-bar');
if(window.location.pathname === '/upload'){
    playerBar.style.display = 'none';
}


window.audio = audio;
console.log(audio)