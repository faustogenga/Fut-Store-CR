import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const VendorStarRating = ({ rating }) => {
  return (
    <div className='starsContainer'>
      {[1, 2, 3, 4, 5].map((index) =>
        rating >= index ? (
          <AiFillStar key={index} style={{ color: 'orange' }} />
        ) : (
          <AiOutlineStar key={index} style={{ color: 'orange' }} />
        )
      )}
    </div>
  );
};

export default VendorStarRating;