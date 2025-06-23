import { Link } from 'react-router-dom';
function Error() {
  return (
    <div>
      
      <h1>Something went wrong. Please try again later.</h1>
      <Link to="/">Go Home  </Link>

    </div>
  );
}export default Error;