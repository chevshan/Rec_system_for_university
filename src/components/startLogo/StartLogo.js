import React from 'react';
import './startLogo.css'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const StartLogo = () => {
    return (
        <div className="startLogo">
            <div className="line">Не знаешь, куда поступить?</div>
            <div className="line">Учеба.by поможет тебе с этим!</div>
            <div className="small-line">Простой и удобный сервис для подбора подходящего Вам вуза!</div>
            <Link to="/test">
                <Button
                    color="success"
                >
                    Подобрать ВУЗ!
                </Button>
            </Link>
        </div>
    )
}

export default StartLogo;
