const table = document.getElementById('list-body') as HTMLTableSectionElement;
const inputShowAll = document.getElementById('list-show-all') as HTMLInputElement;
const inputOwnerName = document.getElementById('details-owners') as HTMLInputElement;
const inputOwnerError = document.getElementById('details-owners-error') as HTMLDivElement;
const listMenu = document.getElementById('list-menu') as HTMLDivElement;
const detailsId = document.getElementById('details-id') as HTMLSpanElement;
const detailsMenu = document.getElementById('details-menu') as HTMLDivElement;
const detailsName = document.getElementById('details-name') as HTMLInputElement;
const detailsType = document.getElementById('details-type') as HTMLSelectElement;
const detailsNotes = document.getElementById('details-notes') as HTMLTextAreaElement;
const detailsStatus = document.getElementById('details-status') as HTMLSelectElement;
const detailsOwners = document.getElementById('details-owners') as HTMLInputElement;
const detailsOwnersList = document.getElementById('details-owners-list') as HTMLDivElement;
const detailsDelete = document.getElementById('details-delete') as HTMLButtonElement;
const detailsTypeA = document.getElementById('details-type-a') as HTMLDivElement;
const detailsTypeB = document.getElementById('details-type-b') as HTMLDivElement;
const detailsTypeC = document.getElementById('details-type-c') as HTMLDivElement;
const detailsTypeD = document.getElementById('details-type-d') as HTMLDivElement;
const detailsTypes = {A: detailsTypeA, B: detailsTypeB, C: detailsTypeC, D: detailsTypeD};
let owners: string[] = [];
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
    notesContent.innerHTML = notesData.notes.replaceAll('\n', '<br>');
}

async function updateTable(nostate: boolean = false) {
    listMenu.style.display = 'block';
    detailsMenu.style.display = 'none';
    if (!nostate) window.history.pushState({}, "", "?");
    document.title = "Locations | MTR Quest";
    table.innerHTML = '';
    const showAll = inputShowAll.checked;
    const q = new URLSearchParams();
    q.append('showAll', showAll ? '1' : '0');
    const locations = await fetch('/api/locations?' + q.toString(), {
        method: 'GET',
        credentials: 'same-origin'
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
        if (owners.includes(user)) cells.edit.innerHTML = `<button onclick="loadEditPanel(${location.locID})">Edit</button>`;
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

async function loadEditPanel(locId: number, nostate: boolean = false) {
    const q = new URLSearchParams();
    q.append('id', locId.toString());
    const response = await fetch(`/api/locations/details?` + q.toString(), {
        method: 'GET',
        credentials: 'same-origin'
    });
    if (response.status !== 200) {
        if (nostate) {
            window.history.replaceState({}, "", "?");
            updateTable(true);
        }
        return;
    }
    listMenu.style.display = 'none';
    detailsMenu.style.display = 'block';
    if (!nostate) window.history.pushState({edit: locId}, "", "?edit=" + locId);
    document.title = "Edit " + locId + " | MTR Quest";
    const data = await response.json();
    const built = data.status === 'built' || data.status === 'active';
    detailsId.innerHTML = data.locID;
    detailsName.value = data.name;
    detailsType.disabled = built;
    const typeOptions = detailsType.options;
    for (let i = 0; i < typeOptions.length; i++) {
        typeOptions[i].selected = typeOptions[i].value === data.type;
    }
    detailsTypeA.style.display = data.type === 'A' ? 'block' : 'none';
    detailsTypeB.style.display = data.type === 'B' ? 'block' : 'none';
    detailsTypeC.style.display = data.type === 'C' ? 'block' : 'none';
    detailsTypeD.style.display = data.type === 'D' ? 'block' : 'none';
    detailsNotes.value = data.notes;
    detailsStatus.disabled = built;
    const statusOptions = detailsStatus.options;
    for (let i = 0; i < statusOptions.length; i++) {
        statusOptions[i].selected = statusOptions[i].value === data.status;
    }
    owners = data.owners.map((owner: any) => owner.ownerID);
    detailsOwnersList.innerHTML = '';
    for (const owner of data.owners) {
        const ownerDiv = document.createElement('div');
        ownerDiv.classList.add('details-row');
        const ownerName = document.createElement('span');
        ownerName.innerHTML = owner.ownerName;
        ownerName.style.flexGrow = '1';
        ownerName.style.textAlign = 'left';
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '- Remove';
        removeButton.onclick = () => {
            detailsOwnersList.removeChild(ownerDiv);
            const index = owners.indexOf(owner.ownerID);
            if (index > -1) owners.splice(index, 1);
        }
        ownerDiv.appendChild(ownerName);
        if (owner.ownerName !== user) ownerDiv.appendChild(removeButton);
        detailsOwnersList.appendChild(ownerDiv);
    }
    detailsDelete.disabled = built;
}

async function createNew(nostate: boolean = false) {
    listMenu.style.display = 'none';
    detailsMenu.style.display = 'block';
    if (!nostate) window.history.pushState({edit: 0}, "", "?edit=0");
    document.title = "Create New | MTR Quest";
    detailsId.innerHTML = 'Not Assigned';
    detailsName.value = '';
    detailsType.disabled = false;
    const typeOptions = detailsType.options;
    for (let i = 0; i < typeOptions.length; i++) {
        typeOptions[i].selected = typeOptions[i].value === 'A';
    }
    detailsTypeA.style.display = 'block';
    detailsTypeB.style.display = 'none';
    detailsTypeC.style.display = 'none';
    detailsTypeD.style.display = 'none';
    detailsNotes.value = '';
    detailsStatus.disabled = false;
    const statusOptions = detailsStatus.options;
    for (let i = 0; i < statusOptions.length; i++) {
        statusOptions[i].selected = statusOptions[i].value === 'pending';
    }
    detailsOwnersList.innerHTML = '';
    owners = [];
    const q = new URLSearchParams();
    q.append('name', user);
    const userId = await fetch('/api/userid?' + q.toString(), {
        method: 'GET',
        credentials: 'same-origin'
    });
    if (userId.status === 404) {
        inputOwnerError.innerHTML = 'User not found';
        inputOwnerError.style.display = 'block';
        return;
    }
    const userIdData = await userId.json();
    const ownerId = userIdData.ID;
    if (owners.includes(ownerId)) {
        inputOwnerError.innerHTML = 'User already added';
        inputOwnerError.style.display = 'block';
        return;
    }
    owners.push(ownerId);
    const ownerDiv = document.createElement('div');
    ownerDiv.classList.add('details-row');
    const ownerLabel = document.createElement('span');
    ownerLabel.innerHTML = user;
    ownerLabel.style.flexGrow = '1';
    ownerLabel.style.textAlign = 'left';
    ownerDiv.appendChild(ownerLabel);
    detailsOwnersList.appendChild(ownerDiv);
}

async function addOwner() {
    inputOwnerError.style.display = 'none';
    const ownerName = inputOwnerName.value;
    if (ownerName.length === 0) {
        inputOwnerError.innerHTML = 'Please enter a name';
        inputOwnerError.style.display = 'block';
        return;
    }
    const q = new URLSearchParams();
    q.append('name', ownerName);
    const userId = await fetch('/api/userid?' + q.toString(), {
        method: 'GET',
        credentials: 'same-origin'
    });
    if (userId.status === 404) {
        inputOwnerError.innerHTML = 'User not found';
        inputOwnerError.style.display = 'block';
        return;
    }
    const userIdData = await userId.json();
    const ownerId = userIdData.ID;
    if (owners.includes(ownerId)) {
        inputOwnerError.innerHTML = 'User already added';
        inputOwnerError.style.display = 'block';
        return;
    }
    owners.push(ownerId);
    const ownerDiv = document.createElement('div');
    ownerDiv.classList.add('details-row');
    const ownerLabel = document.createElement('span');
    ownerLabel.innerHTML = ownerName;
    ownerLabel.style.flexGrow = '1';
    ownerLabel.style.textAlign = 'left';
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '- Remove';
    removeButton.onclick = () => {
        detailsOwnersList.removeChild(ownerDiv);
        const index = owners.indexOf(ownerId);
        if (index > -1) owners.splice(index, 1);
    }
    ownerDiv.appendChild(ownerLabel);
    if (ownerName !== user) ownerDiv.appendChild(removeButton);
    detailsOwnersList.appendChild(ownerDiv);
}

async function deleteLocation() {
    const locId = detailsId.innerHTML;
    const q = new URLSearchParams();
    q.append('id', locId);
    const response = await fetch(`/api/locations?` + q.toString(), {
        method: 'DELETE',
        credentials: 'same-origin'
    });
    if (response.status !== 200) return;
    updateTable();
}

async function saveLocation() {
    const locId = parseInt(detailsId.innerHTML);
    const locName = detailsName.value;
    const locType = detailsType.value;
    const locNotes = detailsNotes.value;
    const locStatus = detailsStatus.value;
    const response = await fetch(`/api/locations`, {
        method: isNaN(locId) ? 'POST' : 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: locId,
            name: locName,
            type: locType,
            notes: locNotes,
            status: locStatus,
            owners: owners,
        })
    });
    console.log(response);
    if (response.status !== 200) return;
    updateTable();
}

document.getElementById('notes-close')?.addEventListener('click', () => {
    const notesBox = document.getElementById('notes-popup')!;
    notesBox.style.display = 'none';
});

detailsType.onchange = () => {
    detailsTypeA.style.display = detailsType.value === 'A' ? 'block' : 'none';
    detailsTypeB.style.display = detailsType.value === 'B' ? 'block' : 'none';
    detailsTypeC.style.display = detailsType.value === 'C' ? 'block' : 'none';
    detailsTypeD.style.display = detailsType.value === 'D' ? 'block' : 'none';
}

loadUserInfo().then(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const edit = params.get('edit');
    if (edit === null) {
        updateTable(true);
        return;
    }
    const num = parseInt(edit);
    if (num == 0) createNew(true);
    else if (num > 0) loadEditPanel(num, true);
});

window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (!state || !state.edit) updateTable(true);
    if (state.edit == 0) createNew(true);
    else if (state.edit > 0) loadEditPanel(state.edit, true);
});

window.viewNotes = viewNotes;
window.updateTable = updateTable;
window.loadUserInfo = loadUserInfo;
window.loadEditPanel = loadEditPanel;
window.addOwner = addOwner;
window.createNew = createNew;
window.deleteLocation = deleteLocation;
window.saveLocation = saveLocation;
