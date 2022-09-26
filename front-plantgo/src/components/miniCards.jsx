import React from 'react';
import PropTypes from 'prop-types';

function Plant({id, korName, imgUrl}){
    return <h1>{korName}</h1>;
}
Plant.propTypes ={
    id:PropTypes.number.isRequired,
    korName:PropTypes.string.isRequired,
    imgUrl:PropTypes.string.isRequired,
};

export default Plant;