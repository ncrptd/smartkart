import { Link } from 'react-router-dom';
export default function PageNotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl ">Page Not Found</h1>
      <Link to="/" className="mt-5 px-2 py-1 bg-pink-500 text-white rounded-md">
        Go to Homepage
      </Link>
    </div>
  );
}
