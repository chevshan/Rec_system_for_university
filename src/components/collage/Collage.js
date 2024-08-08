import './collage.css'
import React from 'react';
import bsu from '../../resources/img/bsu.jpg'
import bguir from '../../resources/img/bguir.jpg'
import bgeu from '../../resources/img/bgeu.jpg'
import bntu from '../../resources/img/bntu.jpg'
import gomel_syxoy from '../../resources/img/gomel_syxoy.jpg'
import vitebsk_univ from '../../resources/img/vitebsk_univ.jpg'

const Collage = () => {
    return (
        <div class="collage">
            <h1>Рассматриваем все высшие учебные заведения</h1>
            <div class="images">
                <img src={bsu} alt="Building 1" />
                <img src={bguir} alt="Building 2" />
                <img src={bntu} alt="Building 3" />
                <img src={bgeu} alt="Building 4" />
                <img src={vitebsk_univ} alt="Building 5" />
                <img src={gomel_syxoy} alt="Building 6" />
            </div>
        </div>
    )
}

export default Collage; 