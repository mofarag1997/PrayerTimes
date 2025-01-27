import React from 'react'
import chefClaude from '../images/chef-claude-icon.png'
import './css.css'

const Header = () => {
    return (
    <div className='img-header'>
        <img src={chefClaude} alt="" />
        <h1 className='chef'>Chef Claude</h1>
    </div>
    )
}

export default Header
