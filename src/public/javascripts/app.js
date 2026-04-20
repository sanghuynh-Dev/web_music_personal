import { songs } from './songs.js';

const songList = document.querySelector('.track');

songs.forEach((song,index) => {
    const html = `
         <div class="song-card js-song-card" data-index='${index}'>
                <div class="container-thumbnail">
                    <a href=""><img src="${song.image}" alt="" class="thumbnail-song"></a>
                    <button class="thumbnail-play-btn cursor-pointer js-play-btn">
                        <svg class="icon-play" width="40" height="40" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>

                        <svg class="icon-pause"  width="40" height="40" viewBox="0 0 24 24">
                            <path d="M6 5h4v14H6zm8 0h4v14h-4z"></path>
                        </svg>
                    </button>
                    
                </div>
                <a href="" class="song-name shows-3-dots">${song.name}</a>
                <p class="artist-name shows-3-dots">${song.artist}</p>
                <audio class="js-audio"  src="${song.src}" preload="metadata"></audio>
        </div>
        `;
        songList.innerHTML += html;
});

// <button class="thumbnail-play-btn js-play-btn"><i class="ti-control-play icon-play"></i></button>
console.log(songs);