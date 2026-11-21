import express from 'express';
import { getNews, getNewsById } from '../services/dataService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const news = await getNews(category);
    res.json({ success: true, count: news.length, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await getNewsById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
