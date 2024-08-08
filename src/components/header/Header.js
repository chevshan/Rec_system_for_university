import './header.css'
import React from 'react';
import image from '../../resources/img/ucheba_by.jpg'


const Header = () => {
    return (
        <div class="header">
            <div class="logo">
                <img src={image} width="150" height="45" alt='' />
            </div>
            <div class="buttons">
                <button>РАСПИСАНИЕ ЦЭ И ЦТ</button>
                <button>ПОДОБРАТЬ КУРСЫ</button>
                <button>FAQ</button>
            </div>
        </div>
    )
}

export default Header;