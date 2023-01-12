import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchCard from '../components/SearchCard';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { clearVideos } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state['cn-tube'].videos);
  const searchTerm = useAppSelector((state) => state['cn-tube'].searchTerm);

  useEffect(() => {
    dispatch(clearVideos());

    if (searchTerm === '') {
      navigate('/');
    } else {
      dispatch(getSearchPageVideos(false));
    }

    return () => {};
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div
        className="flex"
        style={{ height: '92.6vh' }}
      >
        <Sidebar />
        {videos.length > 0 ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length <= 100}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((video) => (
                <div
                  className="my-5"
                  key={video.videoId}
                >
                  <SearchCard data={video} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Search;
