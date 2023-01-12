import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { YOUTUBE_API_URL } from '../../utils/constants';
import { parseData } from '../../utils/index';
import { RootState } from '../index';

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  'cn-tube/searchPageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      'cn-tube': { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ''
      }`
    );

    const parsedData = await parseData(items);
    return { parsedData: [...videos, ...(parsedData || [])], nextPageToken };
  }
);
