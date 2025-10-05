const express = require("express");
const router = express.Router();
let comments = [
    {
        id: 1,
        reviewId: 1,
        author: 'Tomasz Lewandowski',
        content: 'Zgadzam się z oceną. Czy autor planuje uzupełnić dokumentację metodologiczną?',
        date: '2024-09-21',
        isReviewer: false,
        upvotes: 0,
        downvotes: 0,
    },
    {
        id: 2,
        reviewId: 1,
        author: 'Dr Anna Kowalska',
        content: 'Dziękuję za recenzję. Pracuję nad rozszerzeniem dokumentacji metodologicznej i planuję opublikować aktualizację do końca miesiąca.',
        date: '2024-09-22',
        isReviewer: false,
        upvotes: 2,
        downvotes: 2,
    },
    {
        id: 3,
        reviewId: 1,
        author: 'Maria Zielińska',
        content: 'Bardzo pomocna recenzja! Zastanawiam się, czy dane są dostępne również w formacie FASTA?',
        date: '2024-09-23',
        isReviewer: false,
        upvotes: 9,
        downvotes: 0,
    },
    {
        id: 4,
        reviewId: 2,
        author: 'Dr Michał Wójcik',
        content: 'Świetna recenzja. Uważam, że warto również dodać plik README w formacie Markdown dla przejrzystości.',
        date: '2024-09-26',
        isReviewer: false,
        upvotes: 15,
        downvotes: 0,
    },
    {
        id: 5,
        reviewId: 2,
        author: 'Katarzyna Kaczmarek',
        content: 'Zgadzam się, standaryzacja metadanych znacznie ułatwiłaby pracę z tym zbiorem.',
        date: '2024-09-27',
        isReviewer: false,
        upvotes: 10,
        downvotes: 0,
    },
    {
        id: 6,
        reviewId: 2,
        author: 'Prof. Ewa Mazur',
        content: 'Dziękuję za konstruktywne komentarze, przygotowuję poprawioną wersję danych z pełnymi metadanymi.',
        date: '2024-09-28',
        isReviewer: true,
        upvotes: 9,
        downvotes: 0,
    },
    {
        id: 7,
        reviewId: 3,
        author: 'Dr Adam Nowak',
        content: 'Ten zbiór to faktycznie przykład dobrej praktyki. Chciałbym zobaczyć więcej danych w podobnym standardzie.',
        date: '2024-09-12',
        isReviewer: false,
        upvotes: 0,
        downvotes: 10,
    },
    {
        id: 8,
        reviewId: 3,
        author: 'Joanna Król',
        content: 'Zgadzam się, dane klimatyczne są wzorcowo opisane. Czy planowane są aktualizacje kwartalne?',
        date: '2024-09-14',
        isReviewer: false,
        upvotes: 9,
        downvotes: 0,
    },
    {
        id: 9,
        reviewId: 4,
        author: 'Dr Łukasz Piątek',
        content: 'Warto byłoby dodać wykres trendów historycznych w podsumowaniu recenzji.',
        date: '2024-09-19',
        isReviewer: false,
        upvotes: 15,
        downvotes: 0,
    },
    {
        id: 10,
        reviewId: 4,
        author: 'Prof. Barbara Maj',
        content: 'Świetna recenzja! Uważam, że dane historyczne są kluczowe dla interpretacji wyników.',
        date: '2024-09-20',
        isReviewer: false,
        upvotes: 10,
        downvotes: 0,
    }
]

// 📘 GET /api/comments – wszystkie komentarze
router.get("/", (req, res) => {
    res.json({ success: true, data: comments });
});

// 📘 GET /api/reviews/:id/comments – komentarze do danej recenzji
router.get("/reviews/:id/comments", (req, res) => {
    const reviewId = Number(req.params.id);
    const reviewComments = comments.filter((c) => c.reviewId === reviewId);
    res.json({ success: true, data: reviewComments });
});

// ➕ POST /api/comments – nowy komentarz
router.post("/", (req, res) => {
    const { reviewId, author, content } = req.body;

    if (!reviewId || !author || !content) {
        return res.status(400).json({ success: false, message: "Brak wymaganych pól" });
    }

    const newComment = {
        id: comments.length ? comments[comments.length - 1].id + 1 : 1,
        reviewId,
        author,
        content,
        date: new Date().toISOString().split("T")[0],
    };

    comments.push(newComment);
    res.status(201).json({ success: true, data: newComment });
});

// ✏️ PUT /api/comments/:id – aktualizacja komentarza
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const comment = comments.find((c) => c.id === id);

    if (!comment) {
        return res.status(404).json({ success: false, message: "Komentarz nie znaleziony" });
    }

    const { content } = req.body;
    if (content) comment.content = content;

    res.json({ success: true, data: comment });
});

// ❌ DELETE /api/comments/:id – usunięcie komentarza
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = comments.findIndex((c) => c.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Komentarz nie znaleziony" });
    }

    const deleted = comments.splice(index, 1)[0];
    res.json({ success: true, data: deleted });
});

// POST /api/comments/:id/vote - głosowanie
router.post('/:id/vote', (req, res) => {
    const id = Number(req.params.id);
    const { type } = req.body; // "up" | "down"
    const comment = comments.find(c => c.id === id);

    if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (type === 'up') {
        comment.upvotes += 1;
    } else if (type === 'down') {
        comment.downvotes += 1;
    } else {
        return res.status(400).json({ success: false, message: 'Invalid vote type' });
    }

    res.json({ success: true, data: comment });
});

module.exports = router;
