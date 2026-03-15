import React from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

const BookRecommendations: React.FC = () => {
  const books = [
    {
      title: "The Wisdom of the Enneagram",
      author: "Don Richard Riso & Russ Hudson",
      description: "The definitive guide to psychological and spiritual growth through the Enneagram.",
      link: "https://amzn.to/4b8mJVp",
      image: "https://m.media-amazon.com/images/I/71sxuH5mcyL._SY522_.jpg"
    },
    {
      title: "The Enneagram Guide to Waking Up: Find Your Path, Face Your Shadow, Discover Your True Self",
      author: "Beatrice Chestnut & Uranio Paes",
      description: "A comprehensive guide to using the Enneagram for personal growth and transformation.",
      link: "https://amzn.to/4bn8aMq",
      image: "https://m.media-amazon.com/images/I/71bCePosDZL._SY522_.jpg"
    },
    {
      title: "My Enneagram: A Visual Guide to Find Your Personality Type, Stress Less, and Live Your Dreams",
      author: "Kathryn McCulley",
      description: "A visual guide to understanding your Enneagram type and applying it to daily life.",
      link: "https://amzn.to/4rxqF7g",
      image: "https://m.media-amazon.com/images/I/81qVTK0qvOL._SL1500_.jpg"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 overflow-y-auto p-6"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-cyan-500" />
          Book Recommendations
        </h1>
        <div className="grid gap-6">
          {books.map((book, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              {book.image && (
                book.link ? (
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-32 h-48 sm:w-24 sm:h-36 object-cover rounded-md flex-shrink-0 hover:opacity-80 transition-opacity shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                ) : (
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-32 h-48 sm:w-24 sm:h-36 object-cover rounded-md flex-shrink-0 shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                )
              )}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-white mb-1">
                  {book.link ? (
                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      {book.title}
                    </a>
                  ) : (
                    book.title
                  )}
                </h2>
                <p className="text-cyan-500 font-medium mb-3">{book.author}</p>
                <p className="text-gray-300 mb-4">
                  {book.link ? (
                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      {book.description}
                    </a>
                  ) : (
                    book.description
                  )}
                </p>
                {book.link && (
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors w-fit mx-auto sm:mx-0"
                  >
                    View on Amazon
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookRecommendations;
