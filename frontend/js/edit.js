(function() {
    const API_URL = 'http://localhost:3001/api/hotels';
    const form = document.getElementById('hotelForm');
    const idInput = document.getElementById('hotelId');
    const nameInput = document.getElementById('hotelName');
    const descriptionInput = document.getElementById('hotelDescription');
    const roomsInput = document.getElementById('hotelRooms');
    const visitorsInput = document.getElementById('hotelVisitors');
    const imageInput = document.getElementById('hotelImage');

    let hotelId = null;

    const urlParams = new URLSearchParams(window.location.search);
    hotelId = urlParams.get('id');

    if (!hotelId) {
        alert('No hotel ID specified for editing.');
        window.location.href = 'index.html';
        return;
    }

   
    function validateForm() {
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const rooms = roomsInput.value.trim();
        const visitors = visitorsInput.value.trim();

        if (!name) { alert('Please enter the hotel name.'); nameInput.focus(); return false; }
        if (!description) { alert('Please enter the hotel description.'); descriptionInput.focus(); return false; }
        if (!rooms || isNaN(rooms) || Number(rooms) <= 0) { alert('Please enter a valid number of rooms.'); roomsInput.focus(); return false; }
        if (!visitors || isNaN(visitors) || Number(visitors) < 0) { alert('Please enter a valid number of visitors.'); visitorsInput.focus(); return false; }
        return true;
    }
    
    async function loadHotelData() {
        try {
            const response = await fetch(`${API_URL}/${hotelId}`);
            if (!response.ok) {
                throw new Error('Hotel not found');
            }
            const hotelToEdit = await response.json();

            idInput.value = hotelToEdit.id;
            nameInput.value = hotelToEdit.name;
            descriptionInput.value = hotelToEdit.description;
            roomsInput.value = hotelToEdit.rooms;
            visitorsInput.value = hotelToEdit.visitors;

        } catch (error) {
            console.error('Error fetching hotel:', error);
            alert('Could not load hotel data for editing.');
            window.location.href = 'index.html';
        }
    }

    document.addEventListener('DOMContentLoaded', loadHotelData);


    form.addEventListener('submit', async e => {
        e.preventDefault();
        
        if (!validateForm()) return; 

        const file = imageInput.files[0];
        
        const updatedHotel = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            rooms: roomsInput.value.trim(),
            visitors: visitorsInput.value.trim()
        };

        const saveAndRedirect = async (imageBase64 = null) => {
            if (imageBase64) {
                updatedHotel.image = imageBase64;
            }

            try {
                const response = await fetch(`${API_URL}/${hotelId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedHotel)
                });

                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    alert('Failed to update hotel.');
                }
            } catch (error) {
                console.error('Error updating hotel:', error);
                alert('An error occurred. Check the console.');
            }
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = e => saveAndRedirect(e.target.result);
            reader.readAsDataURL(file);
        } else {
            saveAndRedirect();
        }
    });
})();