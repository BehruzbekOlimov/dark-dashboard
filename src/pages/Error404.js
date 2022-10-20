import React from 'react';
import {Helmet} from "react-helmet";

const Error404 = () => {
  return (
    <div style={{paddingTop: 150}}>
        <Helmet>
            <title>Error not found!</title>
        </Helmet>
      <h1 style={{fontSize: 52, textAlign: 'center', color: 'gray'}}>
          Error not found!
      </h1>
    </div>
  );
};

export default Error404;
