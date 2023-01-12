import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../types';
import { getHomePageVideos } from './reducers/getHomePageVideos';
import { getRecommendedVideos } from './reducers/getRecommendedVideos';
import { getSearchPageVideos } from './reducers/getSearchPageVideos';
import { getVideoDetails } from './reducers/getVideoDetails';

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: '',
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const CNTubeSlice = createSlice({
  name: 'cn-tube',
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = '';
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.parsedData;
    });
  },
});

export const store = configureStore({
  reducer: {
    'cn-tube': CNTubeSlice.reducer,
  },
});
export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  CNTubeSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
