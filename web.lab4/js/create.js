(function() {
  const STORAGE_KEY = 'keyroom_hotels_v1';
  const form = document.getElementById('hotelForm');
  const nameInput = document.getElementById('hotelName');
  const descriptionInput = document.getElementById('hotelDescription');
  const roomsInput = document.getElementById('hotelRooms');
  const visitorsInput = document.getElementById('hotelVisitors');
  const imageInput = document.getElementById('hotelImage');

  localStorage.removeItem('hotel_to_edit');

  function loadHotels() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  function saveHotels(hotels) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
  }

  function validateForm() {
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const rooms = roomsInput.value.trim();
    const visitors = visitorsInput.value.trim();

    if (!name) {
      alert('Please enter the hotel name.');
      nameInput.focus();
      return false;
    }

    if (!description) {
      alert('Please enter the hotel description.');
      descriptionInput.focus();
      return false;
    }

    if (!rooms || isNaN(rooms) || Number(rooms) <= 0) {
      alert('Please enter a valid number of rooms.');
      roomsInput.focus();
      return false;
    }

    if (!visitors || isNaN(visitors) || Number(visitors) < 0) {
      alert('Please enter a valid number of visitors.');
      visitorsInput.focus();
      return false;
    }

    return true;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateForm()) return;

    const hotels = loadHotels();
    const file = imageInput.files[0];

    const newHotel = {
      id: Date.now().toString(),
      name: nameInput.value.trim(),
      description: descriptionInput.value.trim(),
      rooms: roomsInput.value.trim(),
      visitors: visitorsInput.value.trim()
    };

    function saveAndRedirect(imageBase64 = null) {
      if (imageBase64) newHotel.image = imageBase64;
      hotels.push(newHotel);
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

  form.reset();
})();
