let notesOpen = false;

function viewNotes(locId: number) {
    console.log(locId);
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
        const checkbox = document.createElement('td');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const type = document.createElement('td');
        const status = document.createElement('td');
        const owner = document.createElement('td');
        const notes = document.createElement('td');
        const edit = document.createElement('td');
        checkbox.innerHTML = `<input type="checkbox">`;
        id.innerHTML = location.locID;
        name.innerHTML = location.name;
        type.innerHTML = location.type;
        status.innerHTML = location.status;
        const owners = location.owners.split(',');
        if (owners.length > 1) {
            owner.innerHTML = owners[0] + ` (<span class="hover" title="${owners.slice(1).join(', ')}">+${owners.length - 1}</span>)`;
        } else if (owners.length === 1) {
            owner.innerHTML = owners[0];
        }
        notes.innerHTML = `<button>View</button>`;
        edit.innerHTML = `<button>Edit</button>`;
        row.appendChild(checkbox);
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(type);
        row.appendChild(status);
        row.appendChild(owner);
        row.appendChild(notes);
        row.appendChild(edit);
        type.classList.add('list-type-' + location.type.toLowerCase());
        table?.appendChild(row);
    }
}

main();