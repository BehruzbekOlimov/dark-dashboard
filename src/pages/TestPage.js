import React from 'react';
import {Helmet} from "react-helmet";

const TestPage = () => {
  return (
      <>
          <Helmet>
              <title>Test</title>
          </Helmet>
          <div className="TestPage">
              <h1 className="mt-0 h1">
                  Test
              </h1>
          </div>
      </>  );
};

export default TestPage;
