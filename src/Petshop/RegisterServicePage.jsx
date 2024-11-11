import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../services/api'; // Import do endpoint /servicos
import './RegisterServicePage.css';

const RegisterServicePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        timeInMinutes: ''
    });

    const navigate = useNavigate(); // Hook para redirecionamento

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const formattedValue = value.replace(/\D/g, '');
            const formattedPrice = (Number(formattedValue) / 100).toFixed(2).replace('.', ',');
            setFormData({ ...formData, [name]: formattedPrice });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerService({
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price.replace(',', '.')),
                timeInMinutes: parseInt(formData.timeInMinutes)
            });
            console.log("Serviço cadastrado:", response);
            alert("Serviço cadastrado com sucesso!");

            // Redireciona para o petshop-dashboard após o sucesso
            navigate('/petshop-dashboard');
        } catch (error) {
            console.error("Erro ao cadastrar serviço:", error);
            alert("Erro ao cadastrar serviço. Tente novamente.");
        }
    };

    return (
        <div className="register-service-page">
            <h1>Cadastrar Serviço</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Descrição:
                    <input 
                        type="text" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        maxLength="100"
                        required 
                    />
                </label>
                <label>
                    Preço:
                    <input 
                        type="text" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="00,00"
                        required 
                    />
                </label>
                <label>
                    Tempo em Minutos:
                    <input type="number" name="timeInMinutes" value={formData.timeInMinutes} onChange={handleChange} required />
                </label>
                <button type="submit">Cadastrar Serviço</button>
            </form>
        </div>
    );
};

export default RegisterServicePage;
