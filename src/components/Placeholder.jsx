import React from 'react';
import ContentLoader from 'react-content-loader';

const Placeholder = props => (
  <ContentLoader
    height={300}
    width={300}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <circle cx="140.59" cy="109.5" r="79.5" />
    <rect x="28.84" y="208.67" rx="0" ry="0" width="225" height="20" />
  </ContentLoader>
);

export default Placeholder;
