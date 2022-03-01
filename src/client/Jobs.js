import React from 'react';
import useHistory from 'react-router-dom';

const Jobs = (props) => {
  const history = useHistory();
  return (
    <>
      <h1>Jobs Page</h1>
      <br />
      <button onClick={() => history.goBack()}>Go Back</button>
    </>
  );
};

export default Jobs;