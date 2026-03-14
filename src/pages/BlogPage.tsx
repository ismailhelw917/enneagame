import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { blogPosts, BlogPost } from '../data/blogPosts';
import CommentSection from '../components/CommentSection';

const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 overflow-y-auto p-6"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-3xl md:text-5xl font-black text-white mb-12 flex items-start md:items-center md:justify-center gap-4 uppercase italic tracking-tighter">
                <BookOpen className="w-12 h-12 text-[#40E0D0] mt-1" />
                <div className="flex flex-col items-center">
                  <span>Enneagaming</span>
                  <span className="text-[#40E0D0]">Blog</span>
                </div>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl hover:border-[#40E0D0]/50 transition-all cursor-pointer group flex flex-col gap-4"
                    onClick={() => setSelectedPost(post)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 rounded-2xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h2 className="text-2xl font-black text-white mb-3 group-hover:text-[#40E0D0] transition-colors uppercase italic tracking-tighter leading-tight">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#40E0D0] mb-4">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                      <span className="text-[#40E0D0] text-sm font-mono mt-2 inline-block group-hover:underline">Read Full Article →</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-sm font-mono text-[#40E0D0] hover:text-white transition-colors mb-8 uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </button>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">{selectedPost.title}</h1>
              <div className="flex items-center gap-2 text-sm font-mono text-[#40E0D0] mb-10">
                <Calendar className="w-4 h-4" />
                {selectedPost.date}
              </div>
              <div className="markdown-body text-gray-300 leading-relaxed text-lg space-y-6">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({ ...props }) => (
                      <img {...props} referrerPolicy="no-referrer" />
                    ),
                  }}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
              <CommentSection postId={selectedPost.id} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlogPage;
