import React from './node_modules/react';

const RestaurantItem = ({
  restaurant: { name, image_url, review_count, rating, is_Closed }
}) => {
  const imgStyle = {
    backgroundImage: `url(${image_url})`
  };
  return (
    <div className='container'>
      <div className='d-flex justify-content-center'>
        <h3>{name}</h3>
      </div>
      <div className='d-flex justify-content-center'>
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

export default RestaurantItem;
