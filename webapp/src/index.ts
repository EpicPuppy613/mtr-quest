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

async function main() {
    const table = document.getElementById('list-body');
    const locations = await fetch('/api/locations', {
        method: 'GET',
        credentials: 'same-origin',
    });
    const locationsData = await locations.json();
    for (const location of locationsData) {
        const row = document.createElement('tr');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const type = document.createElement('td');
        const status = document.createElement('td');
        const owner = document.createElement('td');
        const notes = document.createElement('td');
        const edit = document.createElement('td');
        id.innerHTML = location.locID;
        name.innerHTML = location.name;
        type.innerHTML = location.type;
        status.innerHTML = location.status;
        const owners = location.owners.split(',');
        if (owners.length > 2) {
            owner.innerHTML = owners[0] + ` (<span class="hover" title="${owners.slice(1).join(', ')}">+${owners.length - 1}</span>)`;
        } else {
            owner.innerHTML = owners.join(', ');
        }
        notes.innerHTML = `<button onclick="viewNotes(${location.locID})">View</button>`;
        edit.innerHTML = `<button>Edit</button>`;
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(type);
        row.appendChild(status);
        row.appendChild(owner);
        row.appendChild(notes);
        row.appendChild(edit);
        type.classList.add('list-type-' + location.type.toLowerCase());
        status.classList.add('list-status-' + location.status.toLowerCase());
        table?.appendChild(row);
    }
}

document.getElementById('notes-close')?.addEventListener('click', () => {
    const notesBox = document.getElementById('notes-popup')!;
    notesBox.style.display = 'none';
});

main();

window.viewNotes = viewNotes;