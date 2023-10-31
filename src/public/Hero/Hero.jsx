import React, { Component } from 'react'
import './Hero.css'
import Heroimg from '../../assets/Component 1.svg'
import Button from 'react-bootstrap/Button';


const Hero = () => {
  return (
    <div className='container-fluid row justify-content-center align-items-center hero'>
        <div className=' col-lg-6 left-hero  '> 
        <h2 className='manage'>Manage your Tasks on <br /> <span>Task duty</span></h2>
        <div className='title'>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga earum, enim quia incidunt quod ipsam dicta deleniti ex sunt recusandae facere veritatis nisi, id molestias officia possimus iste hic itaque ratione repellat saepe quis porro repudiandae? Totam beatae voluptatibus nemo dignissimos atque, delectus, ab, quibusdam in placeat quos excepturi reprehenderit?</p>
        <Button style={{backgroundColor:'#974FD0'}} variant="secondary">Go  to my tasks</Button>{' '}
        </div>


        </div>
       
        <div className='col-lg-5 pt-3 align-items-end justify-content-end'>
            <img className='hero-pics' src={Heroimg} alt="" />
        </div>

    </div>
   
  )
}

export default Hero