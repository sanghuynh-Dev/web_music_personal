function avatarColor(name) {
    console.log(name);
    if (!name) return;
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
        '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
        '#ff9800', '#ff5722', '#795548', '#6c6c6c', '#607d8b'
    ];

    return colors[Math.abs(hash) % colors.length];
}

function backgroundColor(name) {
    if (!name) return;
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
        '#ec3471', '#a039b2', '#4f5eb7', '#3b9dee', '#22aef0', '#1fc0d6',
        '#4b9991', '#67ae69', '#95c064', '#ccd85d', '#fbeb5d', '#fecf40',
        '#fcb141', '#ff835d', '#7d6156', '#9e9e9e', '#6c7f88'
    ];

    const index = Math.abs(hash) % colors.length;
    const color = colors[index];

    return `linear-gradient(to right, ${color}, #fff)`;
}

function firstChar(name) {
    if (!name) return;
    return name.charAt(0).toUpperCase();
} 

module.exports = {
    avatarColor,
    backgroundColor,
    firstChar
}