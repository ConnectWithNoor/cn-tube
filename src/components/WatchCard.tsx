import React from 'react';
import { Link } from 'react-router-dom';
import { RecommendedVideos } from '../types';

type WatchCardProps = {
  data: RecommendedVideos;
};

function WatchCard({ data }: WatchCardProps) {
  return (
    <div className="flex gap-3">
      <div className="relative min-w-fit">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-24 w-40"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 flex-col">
        <div className="text-sm">
          <h4>
            <a
              href="#"
              className="line-clamp-2"
            >
              {data.videoTitle}
            </a>
          </h4>
          <h3>
            <div className="text-xs text-gray-400">
              <div>
                <a
                  href="#"
                  className="hover:text-white"
                >
                  {data.channelInfo.name}
                </a>
                <div>
                  <div>
                    <span className="after:content-['•'] after:mx-1">
                      {data.videoViews} views
                    </span>
                    <span>{data.videoAge} ago</span>
                  </div>
                </div>
              </div>
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default WatchCard;
