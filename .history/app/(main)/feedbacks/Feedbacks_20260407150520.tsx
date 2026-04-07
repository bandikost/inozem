'use client'

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Star } from 'lucide-react';
import { Feedback } from '@/app/types/feedback';

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const fetchFeedbacks = async () => {
    const res = await fetch(`/api/feedbacks?page=${page}&limit=${limit}`);
    const json = await res.json();
    const newData = json.data;

    setFeedbacks(prev => [...prev, ...newData]);
    setPage(prev => prev + 1);
    if (newData.length < limit) setHasMore(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <InfiniteScroll
      dataLength={feedbacks.length}
      next={fetchFeedbacks}
      hasMore={hasMore}
      loader={<h4 className="text-center mt-4">Загрузка...</h4>}
      endMessage={<p className="text-center mt-4">Больше отзывов нет</p>}
    >
      {feedbacks.map(feed => (
        <div key={feed.id} className="border border-gray-300 shadow rounded-md p-4 mt-5">
          <p className="!text-xl mb-1">{feed.last_name} {feed.name} {feed.patronymic}</p>
          <hr className="border border-gray-300" />
          <p className="mt-2 mb-4 !text-lg">{feed.user_text}</p>
          <div className="grid grid-cols-2 w-full mt-6">
            <p className="text-left opacity-80">
              {new Date(feed.created_at).toLocaleDateString("ru-RU", {day: "2-digit", month: "long", year: "numeric"})}
            </p>
            <p className="flex justify-end items-center opacity-80">
              {feed.rate} <Star className="-mt-1" fill="#FFCC00" stroke="none" size={18} />
            </p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}