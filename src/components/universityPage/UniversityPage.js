import React, { useEffect, useState } from 'react';
import './universityPage.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bsu from '../../resources/img/bsu.jpg';
import Header from '../header/Header';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';

const UniversityPage = () => {

    const location = useLocation(); 

    const [faculties, setFaculties] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        // Проверяем, есть ли переданные специальности и факультеты в состоянии location
        if (location.state && location.state.specialties && location.state.faculties) {
            setSpecialties(location.state.specialties); // Устанавливаем специальности из состояния location
            setFaculties(location.state.faculties); // Устанавливаем факультеты из состояния location
        } else {
            // Если специальности или факультеты отсутствуют в состоянии location, выполняем запрос на сервер
            fetch("http://localhost:8000/api/specialty")
                .then(response => response.json())
                .then(data => {
                    setFaculties(data.faculties);
                    setSpecialties(data.specialties);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [location.state]); // Используем location.state в качестве зависимости


    return (
        <div>
            <Header />
            <div class="container">
                <img src={bsu} alt="Building" className="image" />
                <div className="text-block">
                    <h1>Белорусский государственный университет (БГУ)</h1>
                    <p>Поступление в БГУ — это шаг к обучению в одном из самых престижных университетов страны. С 1921 г. он вырос до 20 факультетов и институтов, которые охватывают все основные области знаний. Высокие проходные баллы и тщательно продуманные учебные программы создают почву для формирования успешного студенческого сообщества с большим научным и профессиональным потенциалом. Это доказано и рейтингами: агентством “Эксперт РА” университету был присвоен класс “В”.</p>

                    <p>Перечень специальностей включает различные сферы, от дизайна и филологии до математического анализа и ядерной энергетики. Выпускники БГУ — это специалисты, которые готовы применять на практике традиционные и инновационные технологии и подходы, независимо от направления их деятельности. Также высокому уровню знаний способствует активная научная работа. Студенты участвуют в университетских, межуниверситетских и международных конференциях.</p>
                </div>
            </div>
            <div className='container-2'>
                <h2 className='container-2-text-block'>Факультеты, специальности, бюджетные места, проходные баллы, стоимость обучения в БГУ в Минске</h2>
                <Table striped bordered hover size="sm" className='table table-hover'>
                    <thead className="table-light">
                        <tr>
                            <th>СПЕЦИАЛЬНОСТЬ И КВАЛИФИКАЦИЯ</th>
                            <th>ФОРМА ОБУЧЕНИЯ</th>
                            <th>МЕСТА В БЮДЖЕТ/ПЛ</th>
                            <th>БАЛЛЫ ЦЭ/ЦТ БЮДЖЕТ/ПЛ</th>
                            <th>СТОИМОСТЬ В ГОД</th>
                        </tr>
                    </thead>
                    {faculties?.map((faculty) => (
                        <tbody>
                            <tr>
                                <td colSpan={5} className='head'>{faculty.theads}</td>
                            </tr>
                            {specialties?.map((specialty) => {
                                if (specialty.faculty === faculty.id) {
                                    return (
                                        <tr>
                                            <td size={5}>{specialty.specialties}</td>
                                            <td>{specialty.studying_forms}</td>
                                            <td>{specialty.places}</td>
                                            <td>{specialty.marks}</td>
                                            <td>{specialty.prices}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    ))}
                </Table>
            </div>
        </div>
    )
}

export default UniversityPage;