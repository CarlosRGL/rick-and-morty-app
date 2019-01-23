import React from 'react';
import LazyLoad from 'react-lazyload';
import Placeholder from './Placeholder';

function Character(props) {
  const { item } = props;
  return (
    <LazyLoad
      height={300}
      key={item.id}
      offset={[-200, 0]}
      placeholder={<Placeholder />}
    >
      <div className="character">
        <div
          className="character__image"
          style={{ backgroundImage: `url(${item.image})` }}
          alt={item.name}
        />
        <h2 className="character__name">{item.name}</h2>
        <span>
          <strong>Status : </strong>
          {item.status}
        </span>
        <span>
          <strong>Species : </strong>
          {item.species}
        </span>
      </div>
    </LazyLoad>
  );
}

export default Character;
