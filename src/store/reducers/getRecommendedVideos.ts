import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';
import { type RecommendedVideos } from '../../types';
import { parseRecommendedData } from '../../utils';
import { YOUTUBE_API_URL } from '../../utils/constants';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  'cn-tube/getRecommendedVideos',
  async (videoId: string, { getState }) => {
    let channelId = '';
    const {
      'cn-tube': { currentPlaying },
    } = getState() as RootState;

    if (currentPlaying) {
      channelId = currentPlaying.channelInfo.id;
    }

    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );

    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    );

    return { parsedData };
  }
);
