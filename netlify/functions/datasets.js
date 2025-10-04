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
				},
				{
					id: 4,
					title: 'Enlarged foramen mentale / Poszerzony otwór bródki',
					author: 'Zespół PCN2',
					date: '2024-07-10',
					reviews: 0,
					avgRating: 0,
					suggestions: 0,
					description: 'Czaszka człowieka składa się z 29 kości, połączonych najczęściej więzadłami i ruchomym stawem skroniowo-żuchwowym (articulatio temporomandibularis). Kości czaszki dzielą się na część mózgową (neurocranium) i twarzową (splanchnocranium), z wyróżnieniem kości parzystych i nieparzystych. Całość połączona jest około 31 szwami, które kostnieją w różnym czasie, a ich budowa odróżnia człowieka od innych naczelnych.'
				},
				{
					id: 5,
					title: 'Model anatomiczny czaszki ludzkiej',
					author: 'Zespół PCN2',
					date: '2024-06-15',
					reviews: 5,
					avgRating: 4.7,
					suggestions: 4,
					description: 'Model anatomiczny przedstawiający szczegółową budowę czaszki ludzkiej, przydatny w edukacji medycznej i nauce anatomii.'
				},
				{
					id: 6,
					title: 'Model anatomiczny kości udowej z kostniakiem',
					author: 'Zespół PCN2',
					date: '2024-05-30',
					reviews: 6,
					avgRating: 4.8,
					suggestions: 3,
					description: 'Model przedstawiający kość udową z widocznym kostniakiem, użyteczny w nauce patologii ortopedycznej.'
				},
				{
					id: 7,
					title: 'Model anatomiczny kości miednicy',
					author: 'Zespół PCN2',
					date: '2024-04-25',
					reviews: 4,
					avgRating: 4.5,
					suggestions: 2,
					description: 'Model anatomiczny kości miednicy, pomocny w nauce anatomii układu kostnego.'
				},
				{
					id: 8,
					title: 'Model anatomiczny dłoni ludzkiej',
					author: 'Zespół PCN2',
					date: '2024-03-18',
					reviews: 5,
					avgRating: 4.6,
					suggestions: 3,
					description: 'Model anatomiczny dłoni ludzkiej, idealny do nauki anatomii ręki i układu kostnego.'
				},
				{
					id: 9,
					title: 'Model anatomiczny mózgu w 2,5-krotnym powiększeniu',
					author: 'Zespół PCN2',
					date: '2024-02-10',
					reviews: 8,
					avgRating: 4.9,
					suggestions: 5,
					description: 'Model przedstawiający ludzki mózg w 2,5-krotnym powiększeniu, składający się z 14 demontowalnych części, umożliwiający szczegółowe badanie struktur mózgu.'
				},
				{
					id: 10,
					title: 'Model anatomiczny serca człowieka',
					author: 'Zespół PCN2',
					date: '2024-01-05',
					reviews: 6,
					avgRating: 4.7,
					suggestions: 4,
					description: 'Model przedstawiający szczegółową budowę serca człowieka, pomocny w nauce anatomii układu krążenia.'
				},
				{
					id: 11,
					title: 'Model anatomiczny układu pokarmowego',
					author: 'Zespół PCN2',
					date: '2023-12-20',
					reviews: 7,
					avgRating: 4.8,
					suggestions: 3,
					description: 'Model przedstawiający szczegółową budowę układu pokarmowego człowieka, pomocny w nauce anatomii i fizjologii.'
				},
				{
					id: 12,
					title: 'Model anatomiczny układu oddechowego',
					author: 'Zespół PCN2',
					date: '2023-11-15',
					reviews: 5,
					avgRating: 4.6,
					suggestions: 2,
					description: 'Model przedstawiający szczegółową budowę układu oddechowego człowieka, pomocny w nauce anatomii i fizjologii.'
				},
				{
					id: 13,
					title: 'Model anatomiczny układu nerwowego',
					author: 'Zespół PCN2',
					date: '2023-10-10',
					reviews: 6,
					avgRating: 4.7,
					suggestions: 3,
					description: 'Model przedstawiający szczegółową budowę układu nerwowego człowieka, pomocny w nauce anatomii i neurofizjologii.'
				},
				{
					id: 14,
					title: 'Model anatomiczny układu mięśniowego',
					author: 'Zespół PCN2',
					date: '2023-09-05',
					reviews: 7,
					avgRating: 4.8,
					suggestions: 4,
					description: 'Model przedstawiający szczegółową budowę układu mięśniowego człowieka, pomocny w nauce anatomii i fizjologii.'
				},
				{
					id: 15,
					title: 'Model anatomiczny układu moczowego',
					author: 'Zespół PCN2',
					date: '2023-08-01',
					reviews: 6,
					avgRating: 4.7,
					suggestions: 3,
					description: 'Model przedstawiający szczegółową budowę układu moczowego człowieka, pomocny w nauce anatomii i fizjologii.'
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