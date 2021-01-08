import React from 'react';
import { Helmet } from 'react-helmet';

import withView from 'decorators/withView';
import logo from 'styles/images/371907300_INSTAGRAM_ICON_1080.png';

import './Home.css';

const Home = () => (
    <div className="Home">
        <Helmet>
            <title>INSTAGRAMANIA</title>
        </Helmet>
        <div className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <h2>INSTAGRAMANIA</h2>
        </div>
        <div className="Home-intro">
            <p>
                The easiest and most practical way to know what people are thinking about your Instagram posts without having to spend hours reading the comments
            </p>

        </div>

    </div>
);

export default withView()(Home);
