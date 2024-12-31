import React from 'react';
import './FaceRecognition.css';
	
const FaceRecognition = ({ imageURL }) => {
	return (
		<div className='center'>
            <img id="inputimage" alt='' src={imageURL} width="500px" height="auto"/>
        </div>
	);
}

export default FaceRecognition;