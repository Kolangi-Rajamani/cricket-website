import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  category: { 
    type: String, 
    enum: ['Match Report', 'Exclusive', 'Preview', 'News', 'Analysis', 'Features'], 
    default: 'News' 
  },
  coverImage: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Cricbuzz Staff' },
  readTime: { type: String, default: '4 min read' },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  publishedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const News = mongoose.model('News', newsSchema);
export default News;
