import React, { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from "axios";

import colors from '../components/colors';

import Header from '../components/Header';
import UserContext from "../contexts/UserContext";


export default function ChoosePaymentMethod(){
    const { user, setUser } = useContext(UserContext);
    const [paymentChoice, setPaymentChoice] = useState(false);
    const [creditCard, setCreditCard] = useState(false);
    const history = useHistory();

    function goToCreditCard(){
        console.log(paymentChoice);
        setPaymentChoice(true);
    }
    function backToChoosePaymentMethod(){
        console.log(paymentChoice);
        setPaymentChoice(false);
    }
    function goBack(){
        history.push('/checkout');
    }
    function goToViewOrder(){
        const body = {name: user.name,
            cep: user.cep,
            city: user.city,
            neighborhood: user.neighborhood,
            state: user.state,
            street: user.street,
            number: user.number,
            complement: user.complement,
            email: user.email,
            cpf: user.cpf,
            creditCard};
            console.log(body);
        axios.post('https://api-book-store.herokuapp.com/clients', body)
          .then(function (response) {
            console.log(response.data);
          }).catch((error) => console.log(error));

    }


    return(
        <>
            <Header />
            <Body>
                { paymentChoice 
                ? 
                <>
                    <Text>Insira o número do seu cartão de crédito</Text> 
                    <Input placeholder={"XXXX XXXX XXXX XXXX"} onChange={(e) => setCreditCard(e.target.value)}/>
                    <Button onClick={goToViewOrder}>Concluir compra</Button>
                    <BackButton onClick={backToChoosePaymentMethod}>Voltar</BackButton>
                </>
                :
                <>
                    <Text>Escolha seu método de pagamento</Text>
                    <Button onClick={() => console.log("IJAOISJDAOIDJADOIAJDOIASJDAOIDJ")}>Boleto</Button>
                    <Button onClick={goToCreditCard}>Cartao de Credito</Button>
                    <BackButton onClick={goBack}>Voltar</BackButton>
                </>}
            </Body>
        </>
    );
}

const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    height: 500px;
    margin: 150px auto;
    background-color: white;
    border-radius: 5px;
    button {

    }
`;

const Text = styled.p`
    margin-bottom: 60px;
    font-size: 27px;
    font-weight: bold;
`;

const Button = styled.button`
    width: 70%;
    height: 70px;
    background: ${colors.black};
    margin-top: 20px;
    border-radius: 4px;
    color: white;
    text-align: center;
    
`;

const BackButton = styled.button`
    width: 30%;
    height: 40px;
    background: ${colors.black};
    margin-top: 20px;
    border-radius: 4px;
    color: white;
    text-align: center;
    
`;

const Input = styled.input`
    width: 70%;
    height: 70px;
    background: white;
    margin-top: 20px;
    border-radius: 4px;
    color: black;
    text-align: center;
    border: 1px black solid;
    
`;