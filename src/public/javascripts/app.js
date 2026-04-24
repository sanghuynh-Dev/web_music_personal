// import { render } from 'sass';
import { songs } from './songs.js';
console.log('app.js loaded');
// const songList = document.querySelector('.track');

// songs.forEach((song,index) => {
//     const html = `
//          <div class="song-card js-song-card" data-index='${index}'>
//                 <div class="container-thumbnail">
//                     <a href=""><img src="${song.image}" alt="" class="thumbnail-song"></a>
//                     <button class="thumbnail-play-btn cursor-pointer js-play-btn">
//                         <svg class="icon-play" width="40" height="40" viewBox="0 0 24 24">
//                             <path d="M8 5v14l11-7z"></path>
//                         </svg>

//                         <svg class="icon-pause"  width="40" height="40" viewBox="0 0 24 24">
//                             <path d="M6 5h4v14H6zm8 0h4v14h-4z"></path>
//                         </svg>
//                     </button>
                    
//                 </div>
//                 <a href="" class="song-name shows-3-dots">${song.name}</a>
//                 <p class="artist-name shows-3-dots">${song.artist}</p>
//                 <audio class="js-audio"  src="${song.src}" preload="metadata"></audio>
//         </div>
//         `;
//         songList.innerHTML += html;
// });

const iconLikeBtns = document.querySelectorAll('.icon-like-btn');
console.log(iconLikeBtns);
if(iconLikeBtns) {
    iconLikeBtns.forEach(iconLikeBtn => {
        iconLikeBtn.addEventListener('click', async (e) => {
            const btn = e.target.closest('.icon-like-btn');
            const songID = btn.dataset.id;
            console.log(songID);
    
            const res = await fetch(`/you/liked/${songID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    target: songID,
                    targetType: 'music',
                })
            });
            const data = await res.json();
            let allSongLiked = data.allSongLiked;
            const likedList = document.querySelector('.list-liked');
            const countLiked = document.querySelector('.title-liked-js');
            const countLimitLiked = likedList.querySelectorAll('.song-card');
            console.log(allSongLiked);
    
            if(data.liked) {
                btn.classList.add('liked');
                countLiked.innerHTML = data.count + ' likes';
                if(countLimitLiked.length >= 3) return;
                renderTop3(allSongLiked, songID, likedList);
            } else {
                btn.classList.remove('liked');
                const item = likedList.querySelector(`[data-id="${songID}"]`);
                if(item) {
                    item.remove();
                }
                allSongLiked = allSongLiked.filter(song => song._id !== songID);
                renderTop3(allSongLiked, songID, likedList);
                countLiked.innerHTML = data.count + ' likes';   
            }
            console.log(data);
            
        })
    })
}


function renderTop3(allSongLiked, songID, likedList) {
    likedList.innerHTML = '';
    allSongLiked.slice(0, 3).forEach((song) => {
        addInnerSongLike(song, songID, likedList);
    })
}

function addInnerSongLike(infoSongCurrent, songID, likedList) {
    const item = document.createElement('div');
    item.className = 'song-card js-song-card';
    item.dataset.id = songID;
    item.innerHTML = `<div class="container-thumbnail">
                            <div class="control-btn">
                                <img src="${infoSongCurrent.image}" alt="" class="thumbnail-song">
                                <button class="thumbnail-play-btn cursor-pointer js-play-btn">
                                    <svg class="icon-play" width="40" height="40" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"></path>
                                    </svg>

                                    <svg class="icon-pause"  width="40" height="40" viewBox="0 0 24 24">
                                        <path d="M6 5h4v14H6zm8 0h4v14h-4z"></path>
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                        <div class="song-info">
                            <p class="artist-name shows-3-dots">${infoSongCurrent.artist}</p>
                            <a href="" class="song-name shows-3-dots">${infoSongCurrent.song_name}</a>
                            <audio class="js-audio"  src="${infoSongCurrent.file}" preload="metadata"></audio>
                        <div class="song-stats">
                                <span class="play">
                                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    2,086
                                </span>

                                <span class="likes">
                                    <svg class="icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                        <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9 8.7 4.6c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5L12 21l8.8-10.9c1.5-1.5 1.5-4 0-5.5z"/>
                                    </svg>
                                    64
                                </span>
                            </div>
                            
                        </div>
                        <div class="like-btn">
                            <button class="thumbnail-like-btn cursor-point">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                        <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9 8.7 4.6c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5L12 21l8.8-10.9c1.5-1.5 1.5-4 0-5.5z"/>
                                    </svg>
                            </button>
                        </div>`; 
    likedList.appendChild(item);
}

// <button class="thumbnail-play-btn js-play-btn"><i class="ti-control-play icon-play"></i></button>
console.log(songs);