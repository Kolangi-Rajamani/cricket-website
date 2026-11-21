import React, { useState } from 'react';
import { Newspaper, Clock, BookOpen, X, Tag } from 'lucide-react';

export default function NewsSection({ news = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featured = news.find(n => n.featured) || news[0];
  const list = news.filter(n => n._id !== featured?._id && n.id !== featured?.id);

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-emerald-400" />
            <span>Cricket News, Match Reports & Exclusive Analysis</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time coverage from around the global cricketing world.
          </p>
        </div>
      </div>

      {/* Featured Hero Story */}
      {featured && (
        <div
          onClick={() => setSelectedArticle(featured)}
          className="cursor-pointer group relative rounded-2xl overflow-hidden bg-[#142833] border border-[#203746] hover:border-emerald-500/50 shadow-xl transition grid grid-cols-1 md:grid-cols-2"
        >
          <div className="h-64 md:h-full relative overflow-hidden">
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#009270] text-white shadow">
                {featured.category}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1.5 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{featured.readTime || '4 min read'} • {featured.author}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition leading-snug">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                {featured.subtitle || featured.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e3442] text-xs">
              <div className="flex flex-wrap gap-1.5">
                {(featured.tags || ['Match Report', 'ICC']).slice(0, 3).map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-[#0e1d25] text-slate-400 text-[11px]">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-emerald-400 font-bold group-hover:underline flex items-center space-x-1">
                <span>Read Full Story</span>
                <BookOpen className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Other Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(item => (
          <div
            key={item._id || item.id}
            onClick={() => setSelectedArticle(item)}
            className="cursor-pointer group bg-[#142833] hover:bg-[#172e3c] border border-[#203746] hover:border-emerald-500/40 rounded-2xl overflow-hidden shadow transition flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#009270] text-white text-[10px] font-bold shadow">
                {item.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                  {item.author} • {item.readTime || '3 min'}
                </span>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {item.subtitle || item.content}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1e3442] flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>Read Story</span>
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#11222c] border border-[#223947] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#009270] text-white">
              {selectedArticle.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <span>By <strong className="text-slate-200">{selectedArticle.author}</strong></span>
              <span>•</span>
              <span>{selectedArticle.readTime || '4 min read'}</span>
            </div>

            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-xl border border-slate-700 shadow"
            />

            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line pt-2">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-[#1e3442] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
