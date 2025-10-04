const express = require('express');
const router = express.Router();

let reviews = [
    {
        id: 1,
        datasetId: 1,
        reviewer: 'Dr Marek Wiśniewski',
        title: 'Solidny zbiór z drobnymi brakami dokumentacji',
        rating: 4,
        date: '2024-09-20',
        status: 'published',
        content: 'Zbiór danych jest bardzo kompletny i dobrze zorganizowany. Dane są czyste i gotowe do analiz. Jedynym mankamentem jest brak szczegółowego opisu metodyki pobierania próbek oraz informacji o warunkach przechowywania materiału biologicznego.',
        upvotes: 12,
        comments: 3
    },
    {
        id: 2,
        datasetId: 1,
        reviewer: 'Prof. Ewa Mazur',
        title: 'Wartościowe dane, wymaga standaryzacji',
        rating: 3.5,
        date: '2024-09-25',
        status: 'published',
        content: 'Dataset zawiera cenne informacje genomiczne, jednak format danych nie jest zgodny ze standardami FAIR. Sugeruję dodanie metadanych w formacie JSON-LD oraz przygotowanie pliku README zgodnego z wytycznymi DataCite.',
        upvotes: 8,
        comments: 5
    },
    {
        id: 3,
        datasetId: 2,
        reviewer: 'Dr Piotr Kowalczyk',
        title: 'Wzorcowy zbiór danych klimatycznych',
        rating: 5,
        date: '2024-09-10',
        status: 'published',
        content: 'Doskonale przygotowany dataset z kompletnymi metadanymi, dokumentacją oraz skryptami do przetwarzania. Dane są wysokiej jakości i łatwe w użyciu. Idealny do badań zmian klimatu.',
        upvotes: 28,
        comments: 2
    },
    {
        id: 4,
        datasetId: 2,
        reviewer: 'Dr Anna Nowak',
        title: 'Potrzeba uzupełnienia danych historycznych',
        rating: 4,
        date: '2024-08-15',
        status: 'published',
        content: 'Dane są dobrze przygotowane, ale brakuje pełnych serii historycznych. Dobrze byłoby dodać dane z lat wcześniejszych dla pełnej analizy trendów.',
        upvotes: 5,
        comments: 1
    },
    {
        id: 5,
        datasetId: 3,
        reviewer: 'Prof. Jan Kowalski',
        title: 'Zbiór wymaga weryfikacji jakości danych',
        rating: 3,
        date: '2024-07-30',
        status: 'published',
        content: 'Niektóre rekordy mają brakujące wartości i niezgodności w metadanych. Zalecam weryfikację i oczyszczenie danych przed dalszym wykorzystaniem.',
        upvotes: 7,
        comments: 2
    },
    {
        id: 6,
        datasetId: 3,
        reviewer: 'Dr Katarzyna Wiśniewska',
        title: 'Bardzo wartościowy zbiór do badań porównawczych',
        rating: 5,
        date: '2024-09-01',
        status: 'published',
        content: 'Dane są kompletne, dobrze opisane i łatwe do wykorzystania w analizach porównawczych. Polecam dla wszystkich badań w tej dziedzinie.',
        upvotes: 15,
        comments: 3
    },
    {
        id: 7,
        datasetId: 5,
        reviewer: 'Dr Tomasz Lewandowski',
        title: 'Przydatny zbiór, ale wymaga dokumentacji',
        rating: 3.5,
        date: '2024-09-18',
        status: 'published',
        content: 'Dane są użyteczne, jednak brak szczegółowego opisu metodologii. Trzeba to uzupełnić, aby umożliwić pełną reprodukcję wyników.',
        upvotes: 4,
        comments: 1
    },
    {
        id: 8,
        datasetId: 5,
        reviewer: 'Prof. Magdalena Zielińska',
        title: 'Świetny zestaw danych do analizy statystycznej',
        rating: 4.5,
        date: '2024-09-22',
        status: 'published',
        content: 'Dane są kompletne i dobrze przygotowane do natychmiastowej analizy. Polecam do kursów i projektów badawczych.',
        upvotes: 10,
        comments: 2
    }
];

// GET - wszystkie recenzje
router.get('/', (req, res) => {
    res.json({ success: true, data: reviews });
});

// GET /api/reviews/:id - szczegóły recenzji
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const review = reviews.find(r => r.id === id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, data: review });
});

// GET /api/datasets/:id/reviews - recenzje dla zbioru
router.get('/datasets/:id/reviews', (req, res) => {
    const datasetId = parseInt(req.params.id);
    const datasetReviews = reviews.filter(r => r.datasetId === datasetId);
    res.json({ success: true, data: datasetReviews });
});

// POST /api/reviews - nowa recenzja
router.post('/', (req, res) => {
    const { datasetId, reviewer, title, content, rating } = req.body;
    if (!datasetId || !reviewer || !title || !content || rating === undefined) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const newReview = {
        id: reviews.length + 1,
        datasetId,
        reviewer,
        title,
        content,
        rating,
        date: new Date().toISOString().split('T')[0],
        status: 'published',
        upvotes: 0,
        comments: 0
    };

    reviews.push(newReview);
    res.status(201).json({ success: true, data: newReview });
});

// PUT /api/reviews/:id - aktualizacja recenzji
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const review = reviews.find(r => r.id === id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    const { title, content, rating, status } = req.body;
    if (title) review.title = title;
    if (content) review.content = content;
    if (rating !== undefined) review.rating = rating;
    if (status) review.status = status;

    res.json({ success: true, data: review });
});

// DELETE /api/reviews/:id - usunięcie recenzji
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Review not found' });

    const deleted = reviews.splice(index, 1)[0];
    res.json({ success: true, data: deleted });
});

// POST /api/reviews/:id/upvote - głosowanie
router.post('/:id/upvote', (req, res) => {
    const id = Number(req.params.id);
    const review = reviews.find(r => r.id === id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    review.upvotes += 1;
    res.json({ success: true, data: review });
});

module.exports = router;