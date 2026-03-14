import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Comment } from '../types';
import { MessageSquare, Send } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Comment));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        userId: 'anonymous',
        userName: userName.trim(),
        userPhoto: '',
        text: newComment.trim(),
        createdAt: Date.now()
      });
      setNewComment('');
      setUserName('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#40E0D0]" />
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#40E0D0]/50"
          placeholder="Your Name"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#40E0D0]/50"
          placeholder="Add a comment..."
          rows={3}
        />
        <button
          type="submit"
          disabled={loading || !newComment.trim() || !userName.trim()}
          className="px-6 py-2 bg-[#40E0D0] text-black font-bold rounded-full hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img src={comment.userPhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(comment.userName)} alt={comment.userName} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{comment.userName}</span>
                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-300 mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
