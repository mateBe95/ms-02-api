// routes/datasets.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: [
        {
          id: 1,
          title: 'Zbiór danych genomicznych bakterii E. coli',
          author: 'Dr Anna Kowalska',
          date: '2024-09-15',
          reviews: 3,
          avgRating: 4.2,
          suggestions: 5,
          description: 'Kompletny zbiór sekwencji genomowych z 500 próbek bakterii E. coli zebranych w latach 2020-2024 z różnych środowisk.'
        },
        {
          id: 2,
          title: 'Dataset klimatyczny - Temperatura Europa 1950-2023',
          author: 'Prof. Jan Nowak',
          date: '2024-08-20',
          reviews: 7,
          avgRating: 4.8,
          suggestions: 2,
          description: 'Dane temperaturowe zebrane z 250 stacji meteorologicznych w całej Europie, zawierające pomiary dzienne oraz miesięczne.'
        },
        {
          id: 3,
          title: 'Zbiór obrazów medycznych - RTG klatki piersiowej',
          author: 'Dr Katarzyna Lewandowska',
          date: '2024-10-01',
          reviews: 2,
          avgRating: 4.5,
          suggestions: 8,
          description: 'Anonimizowany zbiór 10,000 zdjęć RTG klatki piersiowej z opisami diagnostycznymi, przydatny do trenowania modeli ML.'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/datasets', async (req, res) => {
  // ... twoja logika
});

module.exports = router;