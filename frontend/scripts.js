document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('itemForm');
  const nameInput = document.getElementById('nameInput');
  const descInput = document.getElementById('descInput');
  const itemList = document.getElementById('itemList');

  // Function to fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      itemList.innerHTML = '';
      data.forEach(item => {
         // Création d'un élément div pour la carte
      const itemCard = document.createElement('div');
      itemCard.classList.add('item-card');

      // Ajout du nom de l'élément comme titre (h2)
      const title = document.createElement('h2');
      title.textContent = item.name;
      itemCard.appendChild(title);

      // Ajout de la description de l'élément comme paragraphe (p)
      const description = document.createElement('p');
      description.textContent = item.description;
      itemCard.appendChild(description);

      // Création d'un conteneur pour les boutons
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      // Ajout des boutons pour modifier et supprimer l'élément
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      // Ajoutez un gestionnaire d'événements pour gérer l'édition de l'élément
      // editButton.addEventListener('click', () => { /* Votre logique d'édition ici */ });
      buttonContainer.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      // Ajoutez un gestionnaire d'événements pour gérer la suppression de l'élément
      // deleteButton.addEventListener('click', () => { /* Votre logique de suppression ici */ });
      buttonContainer.appendChild(deleteButton);

      // Ajout du conteneur de boutons à la carte d'élément
      itemCard.appendChild(buttonContainer);

      // Ajout de la carte d'élément à la liste des éléments
      itemList.appendChild(itemCard);
      });
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Fetch items when the page loads
  fetchItems();

  // Event listener for form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const description = descInput.value;
    if (!name || !description) {
      alert('Please enter both name and description.');
      return;
    }
    try {
      await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });
      nameInput.value = '';
      descInput.value = '';
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  });
});
