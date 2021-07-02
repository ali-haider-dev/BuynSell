import React from 'react'
import './style.css'
import cloud from '../../images/time.png'
const LoadingScreen = () =>{
    return <>
    <div className="ld-container">
        <div className="ld-icon">
        <img src={cloud}></img>
        
        </div>
  
    </div>
    
   
    </>
}
export default LoadingScreen