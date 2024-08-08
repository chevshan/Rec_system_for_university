import React, { useState, useEffect } from 'react';
import './formPage.css'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Header from '../header/Header';
import { Link, useHistory } from 'react-router-dom';


const FormPage = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        studyType: [],
        interests: [],
        subjects: [],
        city: ''
    });

    const getCSRFToken = () => {
        const csrfCookie = document.cookie.match(/csrftoken=([^ ;]+)/);
        return csrfCookie ? csrfCookie[1] : null;
    };

    useEffect(() => {
        // Получаем CSRF токен при загрузке компонента
        setFormData(prevState => ({
            ...prevState,
            csrfmiddlewaretoken: getCSRFToken()
        }));
    }, []);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        if (type === 'checkbox') {
            // Если тип элемента checkbox, обновляем состояние в массиве
            setFormData(prevState => ({
                ...prevState,
                [name]: checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value)
            }));
        } else {
            // В остальных случаях просто обновляем состояние
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/api/submit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                history.push({
                    pathname: "/univPage",
                    state: {
                        specialties: data.specialties,
                        faculties: data.faculties
                    } // Передача данных через состояние
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <Header />
            <Form onSubmit={handleSubmit}>
                <div className="form-container">
                    <h1>Интересы</h1>
                    <h2>Как вы хотите учиться?</h2>
                    <Form.Check
                        type="checkbox"
                        label="Очно"
                        name="studyType"
                        value="Очно"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Очно-заочно"
                        name="studyType"
                        value="Очно-заочно"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Заочно"
                        name="studyType"
                        value="Заочно"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Онлайн"
                        name="studyType"
                        value="Онлайн"
                        onChange={handleChange}
                    />

                    <h2>Что Вы хотите изучать?</h2>
                    <h3>Выберите интересные Вам темы</h3>
                    <Form.Check
                        type="checkbox"
                        label="Управление и экономика"
                        name="interests"
                        value="Управление и экономика"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Гуманитарные и социальные науки"
                        name="interests"
                        value="Гуманитарные и социальные науки"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Техника и технологии"
                        name="interests"
                        value="Техника и технологии"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Информационные технологии"
                        name="interests"
                        value="Информационные технологии"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Медиа, дизайн и архитектура"
                        name="interests"
                        value="Медиа, дизайн и архитектура"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Исскуство и творчетсво"
                        name="interests"
                        value="Исскуство и творчетсво"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Точные и естественные науки"
                        name="interests"
                        value="Точные и естественные науки"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Безопасность и военное дело"
                        name="interests"
                        value="Безопасность и военное дело"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Медицина и здравоохранение"
                        name="interests"
                        value="Медицина и здравоохранение"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Сфера услуг"
                        name="interests"
                        value="Сфера услуг"
                        onChange={handleChange}
                    />

                    <h2>Укажите предметы и баллы</h2>
                    <Form.Group controlId="subject1">
                        <Form.Label>Предмет 1</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название предмета"
                            name="subjects"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="subject2">
                        <Form.Label>Предмет 2</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название предмета"
                            name="subjects"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="subject3">
                        <Form.Label>Предмет 3</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название предмета"
                            name="subjects"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* <form className="form-floating">
                    <input type="email" class="form-control" id="floatingInputValue" placeholder="name@example.com" value="" />
                    <label for="floatingInputValue">Предмет</label>
                </form>
                <form className="form-floating">
                    <input type="email" class="form-control" id="floatingInputValue" placeholder="name@example.com" value="" />
                    <label for="floatingInputValue">Предмет</label>
                </form>
                <form className="form-floating">
                    <input type="email" className="form-control" id="floatingInputValue" placeholder="name@example.com" value="" />
                    <label for="floatingInputValue">Предмет</label>
                </form> */}


                    <h2 className='city'> В каком городе Беларуси Вы планируете учиться?</h2>
                    <Form.Control
                        as="select"
                        name="city"
                        onChange={handleChange}
                    >
                        <option>Город</option>
                        <option value="Минск">Минск</option>
                        <option value="Гомель">Гомель</option>
                        <option value="Витебск">Витебск</option>
                    </Form.Control>

                    <Button type="submit" color="success">К выбору специальностей</Button>
                </div>
            </Form>
        </div>
    )
}

export default FormPage;