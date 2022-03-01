import React from 'react';
import useHistory from 'react-router-dom';

const Home = (props) => {
  const history = useHistory();

  return (
    <>
      <h1>Home Page</h1>
      <hr />
      {/* Button */}
      <p>
        <button onClick={() => history.push('/jobs')}>Go to Jobs</button>
      </p>
    </>
  );
};

export default Home;