import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { useData, useDataDispatch } from '../contexts/DataContext';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { ACTIONS } from '../reducer/dataReducer';
import { useEffect } from 'react';

function Home() {
  const { state } = useData();
  const dispatch = useDataDispatch();
  const { categories } = state;
  useEffect(() => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  }, []);
  return (
    <div>
      {categories.length >= 1 ? (
        <>
          <Banner />
          <Categories />
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Home;
