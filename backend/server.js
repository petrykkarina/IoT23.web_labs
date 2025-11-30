const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; 

app.use(cors()); 
app.use(express.json({ limit: '10mb' })); 

let hotels = [
    {
        id: "1",
        name: "Test Hotel",
        description: "A nice hotel.",
        rooms: "10",
        visitors: "100",
        image: null
    }
];

app.get('/api/hotels', (req, res) => {
    console.log('GET /api/hotels - Sending all hotels');
    res.json(hotels);
});


app.get('/api/hotels/:id', (req, res) => {
    const { id } = req.params;
    const hotel = hotels.find(h => h.id === id);
    if (hotel) {
        console.log(`GET /api/hotels/${id} - Found hotel: ${hotel.name}`);
        res.json(hotel);
    } else {
        console.log(`GET /api/hotels/${id} - Hotel not found`);
        res.status(404).json({ message: 'Hotel not found' });
    }
});

app.post('/api/hotels', (req, res) => {
    const newHotel = {
        ...req.body, 
        id: Date.now().toString() 
    };
    hotels.push(newHotel);
    console.log('POST /api/hotels - Created hotel:', newHotel.name);
    res.status(201).json(newHotel);
});


app.put('/api/hotels/:id', (req, res) => {
    const { id } = req.params;
    const hotelIndex = hotels.findIndex(h => h.id === id);

    if (hotelIndex === -1) {
        console.log(`PUT /api/hotels/${id} - Hotel not found`);
        return res.status(404).json({ message: 'Hotel not found' });
    }

    hotels[hotelIndex] = { ...hotels[hotelIndex], ...req.body };
    console.log('PUT /api/hotels - Updated hotel:', hotels[hotelIndex].name);
    res.json(hotels[hotelIndex]);
});


app.delete('/api/hotels/:id', (req, res) => {
    const { id } = req.params;
    const hotelIndex = hotels.findIndex(h => h.id === id);

    if (hotelIndex === -1) {
        console.log(`DELETE /api/hotels/${id} - Hotel not found`);
        return res.status(404).json({ message: 'Hotel not found' });
    }

    hotels = hotels.filter(h => h.id !== id);
    console.log('DELETE /api/hotels - Deleted hotel with id:', id);
    res.status(204).send(); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Test it by opening http://localhost:3001/api/hotels in your browser.');
});