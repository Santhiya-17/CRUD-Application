document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const updateBtn = document.getElementById('updateBtn');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const itemList = document.getElementById('itemList');

    let items = [];
    let editIndex = -1;

    const renderItems = () => {
        itemList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name}: ${item.description}
                <div>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </div>
            `;
            itemList.appendChild(li);
        });
    };

    const addItem = () => {
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();

        if (name && description) {
            items.push({ name, description });
            renderItems();
            nameInput.value = '';
            descriptionInput.value = '';
        }
    };

    const updateItem = () => {
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();

        if (name && description && editIndex !== -1) {
            items[editIndex] = { name, description };
            renderItems();
            nameInput.value = '';
            descriptionInput.value = '';
            editIndex = -1;
            addBtn.style.display = 'inline-block';
            updateBtn.style.display = 'none';
        }
    };

    window.editItem = (index) => {
        nameInput.value = items[index].name;
        descriptionInput.value = items[index].description;
        editIndex = index;
        addBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
    };

    window.deleteItem = (index) => {
        items.splice(index, 1);
        renderItems();
    };

    addBtn.addEventListener('click', addItem);
    updateBtn.addEventListener('click', updateItem);

    renderItems();
});