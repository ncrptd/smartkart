import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { useData } from '../contexts/DataContext';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

function Home() {
  const { state } = useData();
  const { categories } = state;

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
