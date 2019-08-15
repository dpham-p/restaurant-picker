import React from 'react';

const restaurantItem = ({
  restaurant: { name, image_url, review_count, rating }
}) => {
  const imgStyle = {
    backgroundImage: `url(${image_url})`
  };
  return (
    <div className='container'>
      <div className='d-flex justify-content-between'>
        <h3>{name}</h3>
        <p>
          <strong>Rating: </strong>
          {rating} <strong>Reviews: </strong>
          {review_count}
        </p>
      </div>

      <div className='img-fluid img-thumbnail img-box' style={imgStyle} />
    </div>
  );
};

export default restaurantItem;
