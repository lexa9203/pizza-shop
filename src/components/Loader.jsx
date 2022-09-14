import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={288}
    height={466}
    viewBox="0 0 288 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="270" rx="10" ry="10" width="288" height="27" />
    <rect x="0" y="314" rx="10" ry="10" width="288" height="90" />
    <rect x="0" y="420" rx="10" ry="10" width="100" height="45" />
    <rect x="138" y="420" rx="10" ry="10" width="150" height="45" />
    <circle cx="142" cy="130" r="115" />
  </ContentLoader>
);

export default Loader;
