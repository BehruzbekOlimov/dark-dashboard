import React from 'react';
import {Helmet} from "react-helmet";

const HomePage = () => {

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="HomePage">
                <h1 className="mt-0 h1">
                    Home
                </h1>
            </div>
        </>
    );
};

export default HomePage;
