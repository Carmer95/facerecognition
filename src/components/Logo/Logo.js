import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './Brain.png';
import './Logo.css';
	
const Logo = () => {
	return (
         <Tilt tiltMaxAngleX='35' tiltMaxAngleY='35' className='ma4 mt0 Tilt' style={{ height: '150px', width: '150px'}}>
             <div className='rounded-edge'>
                <img style={{paddingLeft: '5px', paddingTop: '12px', height: '130px', width: '150px', opacity:'85%'}} alt='logo' src={brain} />
             </div>
	     </Tilt>
	);
}

export default Logo;