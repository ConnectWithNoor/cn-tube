import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item } from '../../types';
import { convertRawViewstoString, timeSince } from '../../utils';

import { YOUTUBE_API_URL } from '../../utils/constants';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

const parseData = async (
  item: Item & {
    id: string;
    statistics: { viewCount: string; likeCount: string };
  }
) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount, 10).toLocaleString(),
    videoLikes: convertRawViewstoString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewstoString(subscriberCount, true),
    },
  };
};

export const getVideoDetails = createAsyncThunk(
  'yotubeApp/videoDetails',
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    return parseData(items[0]);
  }
);
