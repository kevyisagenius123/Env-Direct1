import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const QuoteStream = ({ quotes, isLoading }) => {
  if (isLoading) {
    return <div className="bg-lavaGrey-800 rounded-2xl p-8 animate-pulse h-64"></div>;
  }

  const defaultQuotes = [
    {
      text: "The environment and the economy are really both two sides of the same coin.",
      author: "Wangari Maathai",
      title: "Nobel Peace Prize Winner"
    }
  ];

  const displayQuotes = quotes || defaultQuotes;

  return (
    <section className="py-12">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-12">
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-sandGold-400" />
          <h2 className="font-display text-2xl font-bold text-white">Voices of Change</h2>
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-sandGold-400" />
        </div>

        <div className="max-w-4xl mx-auto">
          {displayQuotes.slice(0, 1).map((quote, index) => (
            <blockquote key={index} className="bg-gradient-to-r from-lavaGrey-800/50 to-lavaGrey-700/50 border border-envGreen-800/30 rounded-2xl p-8 text-center">
              <div className="text-4xl text-sandGold-400 mb-4">"</div>
              <p className="text-lg text-skyAsh-100 leading-relaxed mb-6 italic">{quote.text}</p>
              <div className="border-t border-envGreen-800/30 pt-4">
                <div className="text-envGreen-300 font-semibold">{quote.author}</div>
                <div className="text-skyAsh-400 text-sm">{quote.title}</div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteStream; 