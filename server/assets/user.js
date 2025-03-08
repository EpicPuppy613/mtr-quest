async function loadUserInfo() {
    const response = await fetch('/api/user', {
        method: 'GET',
        credentials: 'same-origin'
    });
    const user = await response.json();
    const userName = document.getElementById('user-name');
    userName.innerHTML = user.discordName;
    const userAvatar = document.getElementById('user-avatar');
    userAvatar.src = `https://cdn.discordapp.com/avatars/${user.discordID}/${user.discordAvatar}.png`;
    if (user.discordAvatar == null) {
        userAvatar.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadUserInfo);