const table = document.getElementById('list-body') as HTMLTableSectionElement;
const inputShowAll = document.getElementById('list-show-all') as HTMLInputElement;
let user = '';

async function viewNotes(locId: number) {
    const notes = await fetch(`/api/notes?id=${locId}`, {
        method: 'GET',
        credentials: 'same-origin',
    });
    const notesData = await notes.json();
    const notesBox = document.getElementById('notes-popup')!;
    notesBox.style.display = 'block';
    const notesTitle = document.getElementById('notes-name')!;
    notesTitle.innerHTML = `Notes - ${notesData.name}`;
    const notesContent = document.getElementById('notes-content')!;
    notesContent.innerHTML = notesData.notes;
}

async function updateTable() {
    table.innerHTML = '';
    const showAll = inputShowAll.checked;
    const locations = await fetch('/api/locations', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'show-all': showAll ? '1' : '0',
        }
    });
    const locationsData = await locations.json();
    for (const location of locationsData) {
        const row = document.createElement('tr');
        const cellNames = ['id', 'name', 'type', 'status', 'owner', 'notes', 'edit'];
        const cells: {[key: string]: HTMLTableCellElement} = {};
        for (const cellName of cellNames) {
            const cell = document.createElement('td');
            cells[cellName] = cell;
        }
        cells.id.innerHTML = location.locID;
        cells.name.innerHTML = location.name;
        cells.type.innerHTML = location.type;
        cells.status.innerHTML = location.status;
        const owners = location.owners.split(',');
        if (owners.length > 2) {
            cells.owner.innerHTML = owners[0] + ` (<span class="hover" title="${owners.slice(1).join(', ')}">+${owners.length - 1}</span>)`;
        } else {
            cells.owner.innerHTML = owners.join(', ');
        }
        cells.notes.innerHTML = `<button onclick="viewNotes(${location.locID})">View</button>`;
        if (owners.includes(user)) cells.edit.innerHTML = `<button>Edit</button>`;
        for (const cellName of cellNames) {
            row.appendChild(cells[cellName]);
        }
        cells.type.classList.add('list-type-' + location.type.toLowerCase());
        cells.status.classList.add('list-status-' + location.status.toLowerCase());
        table?.appendChild(row);
    }
}

async function loadUserInfo() {
    const response = await fetch('/api/user', {
        method: 'GET',
        credentials: 'same-origin'
    });
    const data = await response.json();
    const userName = document.getElementById('user-name') as HTMLSpanElement;
    userName.innerHTML = data.discordName;
    user = data.discordName;
    const userAvatar = document.getElementById('user-avatar') as HTMLImageElement;
    userAvatar.src = `https://cdn.discordapp.com/avatars/${data.discordID}/${data.discordAvatar}.png`;
    if (data.discordAvatar == null) {
        userAvatar.style.display = 'none';
    }
}

document.getElementById('notes-close')?.addEventListener('click', () => {
    const notesBox = document.getElementById('notes-popup')!;
    notesBox.style.display = 'none';
});

loadUserInfo().then(() => {
    updateTable();
});

window.viewNotes = viewNotes;
window.updateTable = updateTable;
window.loadUserInfo = loadUserInfo;
