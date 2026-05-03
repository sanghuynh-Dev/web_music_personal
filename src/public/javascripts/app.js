// import { render } from 'sass';
import { songs } from './songs.js';
import { onLoadImage } from './views/profile.js';
console.log('app.js loaded');

const isProfilePage = window.location.pathname.includes('profile');
const isHomePage = window.location.pathname.includes('home');
const userBadge = document.querySelectorAll('.user-badge-js');

// start call function
changeFollowBtnOnLoad();
// end call function


userBadge.forEach(userBadge => {
    const mainAvatarUser = userBadge.querySelector('.main-avatar-user');
    const previewAvatarUser = userBadge.querySelector('.preview-main-avatar-user');
    const avatarFallback = userBadge.querySelector('.avatar-fallback');

    onLoadImage(mainAvatarUser, previewAvatarUser, avatarFallback);
})


const iconLikeBtns = document.querySelectorAll('.icon-like-btn');
// console.log(iconLikeBtns);
if(iconLikeBtns) {
    iconLikeBtns.forEach(iconLikeBtn => {
        iconLikeBtn.addEventListener('click', async (e) => {
             if(isProfilePage || isHomePage) await eventLikeBtn(e);
        })
    })
}
const likedList = document.querySelector('.list-liked');

likedList?.addEventListener('click', async (e) => {
    const btn = e.target.closest('.icon-like-btn-js');
    console.log(btn);
    if (!btn) return;

    await eventLikeBtn(e);
});


function renderTop3(allSongLiked, songID, likedList) {
    likedList.innerHTML = '';
    allSongLiked.slice(0, 3).forEach((song) => {
        addInnerSongLike(song, songID, likedList);
    })
}

async function eventLikeBtn(event) {
    const btn = event.target.closest('.icon-like-btn-js');
    console.log(btn);
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
        changeColorIconLikeBtn(songID, data.liked);
        if (countLiked) countLiked.innerHTML = data.count + ' likes';
        if(countLimitLiked.length >= 3) return;
        renderTop3(allSongLiked, songID, likedList);
    } else {
        changeColorIconLikeBtn(songID, data.liked);
        const item = likedList.querySelector(`[data-id="${songID}"]`);
        if(item) {
            item.remove();
        }
        allSongLiked =  await allSongLiked.filter(song => song._id !== songID);
        console.log(allSongLiked);
        renderTop3(allSongLiked, songID, likedList);
        if (countLiked) countLiked.innerHTML = data.count + ' likes';  
    }
    console.log(data);
}

function changeColorIconLikeBtn( songID , liked) {
    const iconLikeBtns = document.querySelectorAll('.icon-like-btn');

    for(const iconLikeBtn of iconLikeBtns) {
        const songId = iconLikeBtn.dataset.id;
        if(songId === songID && liked) {
            iconLikeBtn.classList.add('liked');
            break;
        } else if (songId === songID && !liked){
            iconLikeBtn.classList.remove('liked');
            break;
        }
    }
}

function addInnerSongLike(infoSongCurrent, songID, likedList) {
    const item = document.createElement('div');
    item.className = 'song-card js-song-card';
    item.dataset.id = songID;

    if(isHomePage || isProfilePage) {
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
                            <button class="thumbnail-like-btn cursor-point icon-like-btn-js" data-id="${infoSongCurrent._id}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                        <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9 8.7 4.6c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5L12 21l8.8-10.9c1.5-1.5 1.5-4 0-5.5z"/>
                                    </svg>
                            </button>
                        </div>`; 
    } else {
        item.innerHTML = `<div class="container-thumbnail">
                            <a href=""><img src="${infoSongCurrent.image}" alt="" class="thumbnail-song"></a>
                            <button class="thumbnail-play-btn cursor-pointer js-play-btn">
                                <svg class="icon-play" width="40" height="40" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"></path>
                                </svg>

                                <svg class="icon-pause"  width="40" height="40" viewBox="0 0 24 24">
                                    <path d="M6 5h4v14H6zm8 0h4v14h-4z"></path>
                                </svg>
                            </button>
                            <button class="icon-like-btn cursor-pointer icon-like-btn-js {{#if liked}} liked {{/if}}" data-id="${infoSongCurrent._id}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                    <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9 8.7 4.6c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5L12 21l8.8-10.9c1.5-1.5 1.5-4 0-5.5z"/>
                                </svg>
                            </button>
                            
                        </div>
                        <a href="" class="song-name shows-3-dots">${infoSongCurrent.song_name}</a>
                        <p class="artist-name shows-3-dots">${infoSongCurrent.artist}</p>
                        <audio class="js-audio"  src="${infoSongCurrent.file}" preload="metadata"></audio>
                       `; 
    }
    
    likedList.appendChild(item);
}

// follow

const listUsers = document.querySelector('.list-user-js');

listUsers.addEventListener('click', async (e) => {
    e.preventDefault();
    const btn = e.target.closest('.follow-btn-js');
    if(!btn) return;
    eventFollowBtn(btn);
})

async function eventFollowBtn(btn) {
    const container = btn.closest('.following-info-js');
    const countFollowers = container?.querySelector('.follower-count-js');
    const userID = btn.dataset.id;
    let isFollowing = btn.dataset.following === 'true';

    const res = await fetch(`/you/followed/${userID}?_method=PATCH`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            target: userID,
            targetType: 'artist',
            action: isFollowing ? 'unfollow' : 'follow'
        })
    });
    const data = await res.json();
    if (data.success) {
        isFollowing = !isFollowing;

        btn.dataset.following = isFollowing;
        if(countFollowers) countFollowers.textContent = data.count;
        btn.textContent = isFollowing ? 'Following' : 'Follow';
        btn.classList.toggle('following', isFollowing);
    }
    console.log(data);
}

function changeFollowBtnOnLoad() {
    const followBtns = document.querySelectorAll('.follow-btn-js');
    followBtns.forEach(followBtn => {
        const isFollowing = followBtn.dataset.following === 'true';
        followBtn.textContent = isFollowing ? 'Following' : 'Follow';
        followBtn.classList.toggle('following', isFollowing);
        
    })
}

// <button class="thumbnail-play-btn js-play-btn"><i class="ti-control-play icon-play"></i></button>
console.log(songs);