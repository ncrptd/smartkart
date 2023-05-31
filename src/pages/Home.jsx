import { useEffect } from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { useData, useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';
import Loader from '../components/Loader';

function Home() {
  const dispatch = useDataDispatch();
  const { state } = useData();
  const { categories } = state;

  useEffect(() => {
    dispatch({ type: ACTIONS.CLEARFILTERS });
  }, []);
  return (
    <div>
      {categories.length >= 1 ? (
        <>
          <Banner />
          <Categories />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Home;
