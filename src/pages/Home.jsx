import { useEffect } from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';

function Home() {
  const dispatch = useDataDispatch();
  useEffect(() => {
    console.log('hello');
    dispatch({ type: ACTIONS.CLEARFILTERS });
  });
  return (
    <div>
      <Banner />
      <Categories />
    </div>
  );
}

export default Home;
