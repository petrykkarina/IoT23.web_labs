(function() {
    const API_URL = 'http://localhost:3001/api/hotels';
    const form = document.getElementById('hotelForm');
    const nameInput = document.getElementById('hotelName');
    const descriptionInput = document.getElementById('hotelDescription');
    const roomsInput = document.getElementById('hotelRooms');
    const visitorsInput = document.getElementById('hotelVisitors');
    const imageInput = document.getElementById('hotelImage');

    localStorage.removeItem('hotel_to_edit');

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

    form.addEventListener('submit', async e => {
        e.preventDefault();

        if (!validateForm()) return;

        const file = imageInput.files[0];
        const newHotel = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            rooms: roomsInput.value.trim(),
            visitors: visitorsInput.value.trim(),
            image: null 
        };

        const saveAndRedirect = async (imageBase64 = null) => {
            if (imageBase64) {
                newHotel.image = imageBase64;
            }

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newHotel)
                });

                if (response.ok) {
                    form.reset();
                    window.location.href = 'index.html';
                } else {
                    alert('Failed to create hotel.');
                }
            } catch (error) {
                console.error('Error creating hotel:', error);
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