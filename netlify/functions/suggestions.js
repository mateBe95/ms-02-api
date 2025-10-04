const express = require('express');
const router = express.Router();

// Przykładowe dane
let suggestions = [
    {
        id: 1,
        datasetId: 1,
        author: 'Piotr Zieliński',
        title: 'Dodanie checksumów MD5',
        type: 'improvement',
        description: 'Proponuję dodanie sum kontrolnych MD5 dla każdego pliku w zbiorze, aby umożliwić weryfikację integralności pobranych danych. To standard w repozytoriach naukowych.',
        date: '2024-09-18',
        upvotes: 15,
        status: 'open'
    },
    {
        id: 2,
        datasetId: 1,
        author: 'Katarzyna Nowacka',
        title: 'Błąd w nazewnictwie kolumn',
        type: 'error',
        description: 'W pliku "samples_batch2.csv" kolumna "temprature" powinna być "temperature". Literówka może powodować problemy przy automatycznym przetwarzaniu.',
        date: '2024-09-22',
        upvotes: 23,
        status: 'acknowledged'
    },
    {
        id: 3,
        datasetId: 1,
        author: 'Jan Nowicki',
        title: 'Brakujące informacje o licencji',
        type: 'improvement',
        description: 'Zbiór nie zawiera wyraźnej informacji o licencji. Sugeruję dodanie pliku LICENSE z jasnym określeniem warunków użytkowania (np. CC BY 4.0).',
        date: '2024-09-25',
        upvotes: 19,
        status: 'open'
    },
    {
        id: 4,
        datasetId: 2,
        author: 'Anna Lewandowska',
        title: 'Nieaktualne dane pogodowe',
        type: 'error',
        description: 'Dane z 2022 roku nie zostały zaktualizowane o nowe pomiary z 2023 roku.',
        date: '2024-09-28',
        upvotes: 8,
        status: 'open'
    },
    {
        id: 5,
        datasetId: 2,
        author: 'Marek Wójcik',
        title: 'Brak metadanych stacji',
        type: 'improvement',
        description: 'Brakuje szczegółowych metadanych dotyczących lokalizacji stacji meteorologicznych.',
        date: '2024-09-30',
        upvotes: 12,
        status: 'open'
    },
    {
        id: 6,
        datasetId: 3,
        author: 'Ewa Piątek',
        title: 'Rozmyte obrazy RTG',
        type: 'error',
        description: 'Kilka obrazów RTG jest rozmytych i nie nadaje się do analizy.',
        date: '2024-10-02',
        upvotes: 5,
        status: 'open'
    },
    {
        id: 7,
        datasetId: 3,
        author: 'Tomasz Lis',
        title: 'Brak informacji o wieku pacjentów',
        type: 'improvement',
        description: 'Warto dodać przedział wiekowy pacjentów do metadanych obrazów.',
        date: '2024-10-03',
        upvotes: 7,
        status: 'open'
    },
    {
        id: 8,
        datasetId: 2,
        author: 'Karolina Maj',
        title: 'Błąd w jednostkach temperatury',
        type: 'error',
        description: 'W pliku "europe_temp.csv" jednostki temperatury są podane w F, a powinny być w C.',
        date: '2024-10-04',
        upvotes: 10,
        status: 'acknowledged'
    },
    {
        id: 9,
        datasetId: 3,
        author: 'Paweł Górski',
        title: 'Brak opisu klasyfikacji obrazów',
        type: 'improvement',
        description: 'Brakuje szczegółowego opisu klasyfikacji obrazów RTG w zbiorze.',
        date: '2024-10-05',
        upvotes: 4,
        status: 'open'
    }
];

// Wszystkie sugestie
router.get('/', (req, res) => {
    res.json({ success: true, data: suggestions });
});

// Sugestie dla konkretnego zbioru
router.get('/datasets/:id/suggestions', (req, res) => {
    const datasetId = parseInt(req.params.id);
    const filtered = suggestions.filter(s => s.datasetId === datasetId);
    res.json({ success: true, data: filtered });
});

// Dodaj nową sugestię
router.post('/', (req, res) => {
    const newSuggestion = {
        id: suggestions.length + 1,
        ...req.body,
        upvotes: 0,
        status: "open",
        date: new Date().toISOString().slice(0, 10)
    };
    suggestions.push(newSuggestion);
    res.json({ success: true, data: newSuggestion });
});

// Aktualizuj status sugestii
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return res.status(404).json({ success: false, message: "Sugestia nie znaleziona" });
    suggestion.status = req.body.status || suggestion.status;
    res.json({ success: true, data: suggestion });
});

// Głosowanie na sugestię
router.post('/:id/upvote', (req, res) => {
    const id = parseInt(req.params.id);
    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return res.status(404).json({ success: false, message: "Sugestia nie znaleziona" });
    suggestion.upvotes += 1;
    res.json({ success: true, data: suggestion });
});

module.exports = router;