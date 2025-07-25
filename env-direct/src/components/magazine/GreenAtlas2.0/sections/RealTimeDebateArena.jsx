// 🏛️ REAL-TIME DEBATE ARENA - Live Environmental Policy Discussions
// Reddit + Discord community features with WebSocket real-time updates

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Award, 
  Users, 
  Flame,
  Shield,
  Star,
  Crown,
  Zap
} from 'lucide-react';

// 🎖️ USER REPUTATION SYSTEM
const ReputationBadge = ({ user }) => {
  const getBadgeConfig = (reputation) => {
    if (reputation >= 10000) return { icon: Crown, color: 'text-yellow-400', label: 'Climate Champion', bg: 'bg-yellow-400/10' };
    if (reputation >= 5000) return { icon: Star, color: 'text-purple-400', label: 'Expert', bg: 'bg-purple-400/10' };
    if (reputation >= 1000) return { icon: Award, color: 'text-blue-400', label: 'Advocate', bg: 'bg-blue-400/10' };
    if (reputation >= 100) return { icon: Zap, color: 'text-green-400', label: 'Contributor', bg: 'bg-green-400/10' };
    return { icon: Shield, color: 'text-slate-400', label: 'Newcomer', bg: 'bg-slate-400/10' };
  };
  
  const { icon: Icon, color, label, bg } = getBadgeConfig(user.reputation);
  
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${bg} ${color}`}>
      <Icon className="w-3 h-3" />
      <span className="text-xs font-medium">{label}</span>
      <span className="text-xs opacity-70">({user.reputation.toLocaleString()})</span>
    </div>
  );
};

// 💬 DEBATE COMMENT COMPONENT
const DebateComment = ({ comment, onVote, onReply, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const getVoteColor = (type, hasVoted) => {
    if (!hasVoted) return 'text-slate-400 hover:text-slate-300';
    return type === 'up' ? 'text-green-400' : 'text-red-400';
  };
  
  const handleVote = (type) => {
    onVote(comment.id, type);
  };
  
  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-l-2 border-slate-700 pl-4 ${depth > 0 ? 'ml-6 mt-4' : 'mb-6'}`}
    >
      {/* Comment Header */}
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={comment.user.avatar} 
          alt={comment.user.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{comment.user.name}</span>
            <ReputationBadge user={comment.user} />
          </div>
          <span className="text-slate-400 text-sm">{comment.timestamp}</span>
        </div>
        
        {comment.isPinned && (
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4" />
            <span className="text-xs">Pinned</span>
          </div>
        )}
      </div>
      
      {/* Comment Content */}
      <div className="mb-4">
        <p className="text-slate-200 leading-relaxed">{comment.content}</p>
        
        {comment.sources && (
          <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-700">
            <h5 className="text-envGreen-400 text-sm font-medium mb-2">Sources:</h5>
            <ul className="space-y-1">
              {comment.sources.map((source, index) => (
                <li key={index}>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Comment Actions */}
      <div className="flex items-center gap-4 mb-4">
        
        {/* Voting */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote('up')}
            className={`p-1 rounded hover:bg-slate-700 transition-colors ${
              getVoteColor('up', comment.userVote === 'up')
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <span className="text-sm font-mono">
            {comment.upvotes - comment.downvotes}
          </span>
          <button
            onClick={() => handleVote('down')}
            className={`p-1 rounded hover:bg-slate-700 transition-colors ${
              getVoteColor('down', comment.userVote === 'down')
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
        
        {/* Reply Button */}
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Reply
        </button>
        
        {/* Show Replies */}
        {comment.replies?.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-envGreen-400 hover:text-envGreen-300 text-sm transition-colors"
          >
            {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
          </button>
        )}
      </div>
      
      {/* Reply Input */}
      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Share your perspective..."
                className="w-full bg-transparent text-white placeholder-slate-400 resize-none focus:outline-none"
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setIsReplying(false)}
                  className="px-3 py-1 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-1 bg-envGreen-600 hover:bg-envGreen-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Nested Replies */}
      <AnimatePresence>
        {showReplies && comment.replies?.map(reply => (
          <DebateComment
            key={reply.id}
            comment={reply}
            onVote={onVote}
            onReply={onReply}
            depth={depth + 1}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// 🔥 TRENDING DEBATES SIDEBAR
const TrendingDebates = ({ debates, onSelectDebate }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-400" />
        Trending Debates
      </h3>
      
      <div className="space-y-3">
        {debates.map((debate, index) => (
          <motion.button
            key={debate.id}
            onClick={() => onSelectDebate(debate)}
            whileHover={{ scale: 1.02 }}
            className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded transition-colors"
          >
            <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
              {debate.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {debate.commentCount}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {debate.participantCount}
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                {debate.heatScore}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// 📊 DEBATE STATISTICS
const DebateStats = ({ stats }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">Debate Analytics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-mono text-envGreen-400">{stats.totalParticipants}</div>
          <div className="text-xs text-slate-400">Active Debaters</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-mono text-blue-400">{stats.totalComments}</div>
          <div className="text-xs text-slate-400">Comments</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-mono text-purple-400">{stats.expertContributions}</div>
          <div className="text-xs text-slate-400">Expert Posts</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-mono text-yellow-400">{stats.sourcesShared}</div>
          <div className="text-xs text-slate-400">Sources</div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <h4 className="text-white text-sm font-medium mb-2">Recent Activity</h4>
        <div className="space-y-2">
          {stats.recentActivity?.map((activity, index) => (
            <div key={index} className="text-xs text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-envGreen-400 rounded-full"></div>
              <span>{activity.user} {activity.action}</span>
              <span className="text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 🚀 MAIN DEBATE ARENA COMPONENT
const RealTimeDebateArena = ({ onViewportEnter }) => {
  const arenaRef = useRef(null);
  const [activeDebate, setActiveDebate] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('hot'); // 'hot', 'new', 'top'
  
  const isInView = useInView(arenaRef, { threshold: 0.3 });
  
  // Mock data
  const [debates] = useState([
    {
      id: 1,
      title: "Should nuclear energy be part of the climate solution?",
      description: "Examining the role of nuclear power in achieving net-zero emissions",
      commentCount: 247,
      participantCount: 89,
      heatScore: 94,
      category: "Energy Policy"
    },
    {
      id: 2,
      title: "Carbon tax vs. cap-and-trade: Which is more effective?",
      description: "Comparing market-based approaches to carbon pricing",
      commentCount: 182,
      participantCount: 67,
      heatScore: 87,
      category: "Climate Policy"
    },
    {
      id: 3,
      title: "Geoengineering: Necessary intervention or dangerous gamble?",
      description: "The ethics and risks of large-scale climate intervention",
      commentCount: 156,
      participantCount: 54,
      heatScore: 91,
      category: "Climate Science"
    }
  ]);
  
  const [mockComments] = useState([
    {
      id: 1,
      user: {
        name: "Dr. Sarah Chen",
        avatar: "/avatars/sarah-chen.jpg",
        reputation: 12450
      },
      content: "Nuclear energy provides the reliable baseload power needed for a carbon-free grid. France's success with 70% nuclear electricity shows this isn't theoretical - it's proven technology. The waste issue, while serious, is manageable with proper geological storage.",
      timestamp: "2 hours ago",
      upvotes: 34,
      downvotes: 8,
      userVote: null,
      isPinned: true,
      sources: [
        {
          title: "France's Nuclear Energy Success Story - IAEA Report",
          url: "https://example.com/iaea-france-nuclear"
        }
      ],
      replies: [
        {
          id: 11,
          user: {
            name: "Alex Rivera",
            avatar: "/avatars/alex-rivera.jpg",
            reputation: 3240
          },
          content: "But what about the massive upfront costs? New nuclear plants are taking 15+ years to build and going billions over budget. Renewables + storage is becoming cost-competitive much faster.",
          timestamp: "1 hour ago",
          upvotes: 28,
          downvotes: 5,
          userVote: null
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Prof. Michael Barnes",
        avatar: "/avatars/michael-barnes.jpg",
        reputation: 8930
      },
      content: "The learning curve for solar and wind is incredibly steep - costs have dropped 90% in the last decade. Nuclear costs, meanwhile, have been increasing. We need solutions that can scale rapidly and economically.",
      timestamp: "3 hours ago",
      upvotes: 42,
      downvotes: 12,
      userVote: 'up',
      sources: [
        {
          title: "Renewable Energy Learning Curves - IRENA",
          url: "https://example.com/irena-learning-curves"
        }
      ]
    }
  ]);
  
  const [stats] = useState({
    totalParticipants: 1247,
    totalComments: 3892,
    expertContributions: 234,
    sourcesShared: 456,
    recentActivity: [
      { user: "Dr. Elena Martinez", action: "posted expert analysis", time: "2 min ago" },
      { user: "James Thompson", action: "shared research paper", time: "5 min ago" },
      { user: "Lisa Park", action: "joined debate", time: "8 min ago" }
    ]
  });
  
  useEffect(() => {
    if (isInView && onViewportEnter) {
      onViewportEnter();
    }
  }, [isInView, onViewportEnter]);
  
  useEffect(() => {
    if (!activeDebate) {
      setActiveDebate(debates[0]);
      setComments(mockComments);
    }
  }, [debates, mockComments, activeDebate]);
  
  const handleVote = (commentId, voteType) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const newVote = comment.userVote === voteType ? null : voteType;
        return {
          ...comment,
          userVote: newVote,
          upvotes: comment.upvotes + (newVote === 'up' ? 1 : comment.userVote === 'up' ? -1 : 0),
          downvotes: comment.downvotes + (newVote === 'down' ? 1 : comment.userVote === 'down' ? -1 : 0)
        };
      }
      return comment;
    }));
  };
  
  const handleReply = (parentId, content) => {
    // In a real app, this would make an API call
    console.log(`Reply to ${parentId}: ${content}`);
  };
  
  const handleNewComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: {
          name: "You",
          avatar: "/avatars/default.jpg",
          reputation: 150
        },
        content: newComment,
        timestamp: "Just now",
        upvotes: 0,
        downvotes: 0,
        userVote: null
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };
  
  return (
    <section ref={arenaRef} className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Environmental Debate Arena
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join the global conversation on climate policy. Share evidence, challenge assumptions, 
            and help shape the future of environmental action.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Main Debate Area */}
          <div className="lg:col-span-3">
            
            {/* Active Debate Header */}
            {activeDebate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {activeDebate.title}
                </h3>
                <p className="text-slate-300 mb-4">{activeDebate.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {activeDebate.commentCount} comments
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {activeDebate.participantCount} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    Heat: {activeDebate.heatScore}%
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Comment Composer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700"
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your perspective on this debate..."
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-envGreen-500"
                rows={4}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="text-slate-400 text-sm">
                  Tip: Include sources to increase credibility
                </div>
                <button
                  onClick={handleNewComment}
                  disabled={!newComment.trim()}
                  className="px-6 py-2 bg-envGreen-600 hover:bg-envGreen-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </motion.div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-400">Sort by:</span>
              {['hot', 'new', 'top'].map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    sortBy === option 
                      ? 'bg-envGreen-600 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Comments */}
            <div className="space-y-6">
              {comments.map(comment => (
                <DebateComment
                  key={comment.id}
                  comment={comment}
                  onVote={handleVote}
                  onReply={handleReply}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TrendingDebates debates={debates} onSelectDebate={setActiveDebate} />
            <DebateStats stats={stats} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeDebateArena;
