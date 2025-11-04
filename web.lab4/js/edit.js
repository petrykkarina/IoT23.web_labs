(function() {
  const STORAGE_KEY = 'keyroom_hotels_v1';
  const form = document.getElementById('hotelForm');
  const idInput = document.getElementById('hotelId');
  const nameInput = document.getElementById('hotelName');
  const descriptionInput = document.getElementById('hotelDescription');
  const roomsInput = document.getElementById('hotelRooms');
  const visitorsInput = document.getElementById('hotelVisitors');
  const imageInput = document.getElementById('hotelImage');

  const hotelToEdit = JSON.parse(localStorage.getItem('hotel_to_edit'));
  if (!hotelToEdit) {
    alert('No hotel selected for editing');
    window.location.href = 'index.html';
    return;
  }

  idInput.value = hotelToEdit.id;
  nameInput.value = hotelToEdit.name;
  descriptionInput.value = hotelToEdit.description;
  roomsInput.value = hotelToEdit.rooms;
  visitorsInput.value = hotelToEdit.visitors;

  localStorage.removeItem('hotel_to_edit');

  function loadHotels() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  function saveHotels(hotels) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const hotels = loadHotels();
    const file = imageInput.files[0];
    const hotelId = idInput.value;

    function saveAndRedirect(imageBase64 = null) {
      const index = hotels.findIndex(h => h.id === hotelId);
      if (index === -1) return;

      if (imageBase64) hotels[index].image = imageBase64;

      hotels[index].name = nameInput.value.trim();
      hotels[index].description = descriptionInput.value.trim();
      hotels[index].rooms = roomsInput.value.trim();
      hotels[index].visitors = visitorsInput.value.trim();

      saveHotels(hotels);
      window.location.href = 'index.html';
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = e => saveAndRedirect(e.target.result);
      reader.readAsDataURL(file);
    } else {
      saveAndRedirect();
    }
  });
})();
