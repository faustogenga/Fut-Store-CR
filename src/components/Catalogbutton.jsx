import React from 'react';

export const Catalogbutton = ({ className, onClickHandler, value, title }) => {
    return (
        <button className={className} onClick={() => onClickHandler(value)}>
            {title}
        </button>
    );
};

export default Catalogbutton;