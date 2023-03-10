import React from 'react';
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../types';

type SearchCardProps = {
  data: HomePageVideos;
};

function SearchCard({ data }: SearchCardProps) {
  return (
    <div className="flex gap-3">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-52 w-96"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 flex-col">
        <div className="max w-2xl">
          <h3>
            <a
              href="#"
              className="line-clamp-2"
            >
              {data.videoTitle}
            </a>
          </h3>
          <h3>
            <div className="text-xs text-gray-400 ">
              <div>
                <div>
                  <span className="after:content-['•'] after:mx-1">
                    {data.videoViews} views
                  </span>
                  <span>{data.videoAge} ago</span>
                </div>
              </div>
            </div>
          </h3>
        </div>
        <div className="min-w-fit my-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 ">
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
            <span>{data.channelInfo.name}</span>
          </div>
          <div className="max-w-2xl line-clamp-3 text-sm text-gray-400">
            <p>{data.videoDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
