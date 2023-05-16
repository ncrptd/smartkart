import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function RootLayout() {
  return (
    <div className="root-latyout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
