// ===== start drag and drop , zoom avatar user =====
const avatarImage = document.getElementById('avatar-image');
const previewImage = document.querySelector('.preview-image');
const overlayAvatar = document.querySelector('.overlay-avatar');
const formAvatar = document.querySelector('.form-avatar');
const zoomAvatar = document.querySelector('.zoom-avatar-js');
const zoomSlideAvatar = zoomAvatar?.querySelector('.zoom-slider');;
const saveAvatarBtn = document.querySelector('.save-avatar-btn');
const zoomInAvatar = document.querySelector(".zoom-in-avatar-js");
const zoomOutAvatar = document.querySelector(".zoom-out-avatar-js");


const zoomSliders = document.querySelectorAll('.zoom-slider');
const cancelBtns = document.querySelectorAll('.cancel-btn');



// show image uploaded
const mainAvatarUser = document.querySelector('.main-avatar-user');
const previewAvatarUser = document.querySelector('.preview-main-avatar-user');
const avatarFallback = document.querySelector('.avatar-fallback');

const mainHeaderUser = document.querySelector('.main-header-user');
const previewHeaderUser = document.querySelector('.preview-main-header-user');
const headerFallback = document.querySelector('.header-fallback');

//show avatar header all page
const headerAvatarUser = document.querySelector('.header-avatar-user');
const previewHeaderAvatarUser = document.querySelector('.preview-header-avatar-user');
const headerAvatarFallback = document.querySelector('.header-avatar-fallback');

console.log(headerAvatarFallback)

const isProfilePage = window.location.pathname.includes('profile');
const isHomePage = window.location.pathname.includes('home');

let scale = 1;
let isDragging = false;
let minScale = 1;
let startX, startY;
let posX = 0, posY = 0;
let activeTarget = null;
// start call function=====

onLoadImage(headerAvatarUser, previewHeaderAvatarUser, headerAvatarFallback);
if (isProfilePage) {
    onLoadImage(mainAvatarUser, previewAvatarUser, avatarFallback);
    onLoadImage(mainHeaderUser, previewHeaderUser, headerFallback);
}
if (isHomePage) onLoadImage(headerAvatarUser, previewHeaderAvatarUser, headerAvatarFallback);

// end call function====

// close form avatar
overlayAvatar?.addEventListener('click', (e) => {
    closeUploadFormByOverlay(formAvatar, avatarImage, e,overlayAvatar);
})

cancelBtns?.forEach(cancelBtn => {
    cancelBtn.addEventListener('click', () => {
        closeUploadFormByBtn(avatarImage,overlayAvatar);
    })
})

// show form avatar
avatarImage?.addEventListener('change', function() {
    const file = this.files[0];
    if(!file) return;

    showOverlay(previewImage, file, overlayAvatar);
    updateAvatarTransform();
})

previewImage?.addEventListener('load', () => {
    const size = 450;

    const scaleX = size / previewImage.naturalWidth;
    const scaleY = size / previewImage.naturalHeight;

    // giống SoundCloud: luôn cover
    onloadPreviewImage(scaleX, scaleY,zoomSlideAvatar);
    updateAvatarTransform();
});

// zoom image
zoomSlideAvatar?.addEventListener('input', () => {
    scale = zoomSlideAvatar.value;
    posX = Math.min(posX, 0);
    posY = Math.min(posY, 0);

    updateAvatarTransform();
})

zoomInAvatar?.addEventListener('click', (e) => {
    e.preventDefault();
    zoomIns(zoomSlideAvatar);
    updateAvatarTransform();
});

zoomOutAvatar?.addEventListener('click', (e) => {
    e.preventDefault();
    zoomOuts(zoomSlideAvatar);
    updateAvatarTransform();
});

// drag image
previewImage?.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeTarget = "avatar";
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    previewImage.style.cursor = "grabbing";
})




// update image
function updateAvatarTransform() {
    const containerSize = 450;

    const imgWidth = previewImage.naturalWidth * scale;
    const imgHeight = previewImage.naturalHeight * scale;

    const maxX = Math.max(0, (imgWidth - containerSize ) / 2);
    const maxY = Math.max(0, (imgHeight - containerSize ) / 2);

    // 🔥 Clamp tại đây
    updateTransform(previewImage, maxX, maxY);
}

//SAVE
saveAvatarBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    const canvas = document.createElement('canvas');
    const size = 450;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');

    const imgW = previewImage.naturalWidth * scale;
    const imgH = previewImage.naturalHeight * scale;

    const dx = (size - imgW) / 2 + posX;
    const dy = (size - imgH) / 2 + posY;

    ctx.drawImage(previewImage, dx, dy, imgW, imgH);

    canvas.toBlob( async (blob) => {
        const formData = new FormData();
        formData.append('image', blob);
        console.log(formData);
        changeAvatarAfterUpload(blob, mainAvatarUser, previewAvatarUser, avatarFallback);
        changeAvatarAfterUpload(blob, headerAvatarUser, previewHeaderAvatarUser, headerAvatarFallback);
        await fetch('/profile/update-avatar?_method=PATCH', {
            method: 'POST',
            body: formData
        })
        
    })

    overlayAvatar.classList.remove('show');
    avatarImage.value = '';
})   

// ============== end drag and drop , zoom avatar user =============

// ===== start drag and drop , zoom header user =====
const headerImage = document.getElementById('header-image');
const overlayHeader = document.querySelector('.overlay-header');
const previewHeaderImage = document.querySelector('.preview-header-image');
const formHeaderCropper = document.querySelector('.form-header-cropper');
const saveHeaderBtn = document.querySelector('.save-header-btn');


const zoomInHeader = document.querySelector(".zoom-in-header-js");
const zoomOutHeader = document.querySelector(".zoom-out-header-js");

const zoomHeader = document.querySelector('.zoom-header-js');
const zoomSlideHeader = zoomHeader?.querySelector('.zoom-slider');


console.log(zoomSlideHeader)


const WIDTH = 950;
const HEIGHT = 200;

// close form avatar
overlayHeader?.addEventListener('click', (e) => {
    closeUploadFormByOverlay(formHeaderCropper, headerImage, e, overlayHeader);
})

cancelBtns?.forEach(cancelBtn => {
    cancelBtn.addEventListener('click', () => {
        closeUploadFormByBtn(headerImage,overlayHeader);
    })
})

// show form avatar
headerImage?.addEventListener('change', function() {
    const file = this.files[0];
    if(!file) return;

   showOverlay(previewHeaderImage, file, overlayHeader);
   updateHeaderTransform();
})

previewHeaderImage?.addEventListener('load', () => {
    const scaleX = WIDTH / previewHeaderImage.naturalWidth;
    const scaleY = HEIGHT / previewHeaderImage.naturalHeight;

    onloadPreviewImage(scaleX, scaleY, zoomSlideHeader);
    updateHeaderTransform();
});

// zoom image
zoomSlideHeader?.addEventListener("input", () => {
    scale = parseFloat(zoomSlideHeader.value);
    if (scale < minScale) scale = minScale;
    updateHeaderTransform();
});

zoomInHeader?.addEventListener("click", (e) => {
    e.preventDefault();
    zoomIns(zoomSlideHeader);
    updateHeaderTransform();
});

zoomOutHeader?.addEventListener("click", (e) => {
    e.preventDefault();
    zoomOuts(zoomSlideHeader);
    updateHeaderTransform();
});

// drag image
previewHeaderImage?.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeTarget = "header";
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    previewHeaderImage.style.cursor = "grabbing";
})

// update image
function updateHeaderTransform() {
    const imgW = previewHeaderImage.naturalWidth * scale;
    const imgH = previewHeaderImage.naturalHeight * scale;

    const maxX = Math.max(0, (imgW - WIDTH) / 2);
    const maxY = Math.max(0, (imgH - HEIGHT) / 2);

    // 🔥 Clamp tại đây
    updateTransform(previewHeaderImage, maxX, maxY);
}


//SAVE
saveHeaderBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    const canvas = document.createElement('canvas');

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx = canvas.getContext('2d');

    const imgW = previewHeaderImage.naturalWidth * scale;
    const imgH = previewHeaderImage.naturalHeight * scale;

    const dx = (WIDTH - imgW) / 2 + posX;
    const dy = (HEIGHT - imgH) / 2 + posY;

    ctx.drawImage(previewHeaderImage, dx, dy, imgW, imgH);

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob);
        console.log(formData);
        changeAvatarAfterUpload(blob, mainHeaderUser, previewHeaderUser, headerFallback);
        await fetch('/profile/update-header?_method=PATCH', {
            method: 'POST',
            body: formData
        })
        
    })

    overlayHeader.classList.remove('show');
    headerImage.value = '';
})   

// cummon code upload form =============================================================================================


// update image
function updateTransform(preview, maxX, maxY) {
    // 🔥 Clamp tại đây
    posX = Math.min(maxX, Math.max(-maxX, posX));
    posY = Math.min(maxY, Math.max(-maxY, posY));
    preview.style.transform = `translate( -50%, -50%) translate(${posX}px, ${posY}px) scale(${scale})`;
}

// cover image
function onloadPreviewImage(scaleX, scaleY,zoom) {
    minScale = Math.max(scaleX, scaleY);
    scale = minScale;

    zoom.min = minScale;
    zoom.max = minScale * 3;
    zoom.value = scale;
    
    posX = 0;
    posY = 0;
    
}

// show form
function showOverlay(preview, file,overlay) {
    overlay.classList.add('show');
    
    const image = URL.createObjectURL(file);
    preview.src = image;
    
    scale = 1;
    posX = 0;
    posY = 0;
}

// close form
function closeUploadFormByOverlay(container, file,e, overlay) {
    if(!container.contains(e.target)) {
        overlay.classList.remove('show');
        file.value = '';
    }
}

function closeUploadFormByBtn(file,overlay) {
    overlay.classList.remove('show');
    file.value = '';
}

// zoom image
function zoomIns(zoomSlider) {
    scale = Math.min(scale + 0.1, zoomSlider.max);
    zoomSlider.value = scale;
}

function zoomOuts(zoomSlider) {
    scale = Math.max(scale - 0.1, zoomSlider.min);
    zoomSlider.value = scale;
}

// drag image
document.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    if(activeTarget == "avatar") updateAvatarTransform();
    if(activeTarget == "header") updateHeaderTransform();
})

document.addEventListener('mouseup', () => {
    isDragging = false;
    if(activeTarget == "avatar") previewImage.style.cursor = "grab";;
    if(activeTarget == "header") previewHeaderImage.style.cursor = "grab";;
})

// show image uploaded
export function onLoadImage(main , preview, fallback) {
    if(!main) {
        if(preview.getAttribute('src')) preview.style.display = 'block';
            else {
                preview.style.display = 'none'; 
                fallback.style.display = 'block';
            }
    }  
}

function changeAvatarAfterUpload(blob, main, preview, fallback) {
    const url = URL.createObjectURL(blob);
    console.log(url);
    if(main) {
        main.src = url;
    } else {
        preview.src = url;
        preview.style.display = 'block';
        fallback.style.display = 'none';
    }
}

