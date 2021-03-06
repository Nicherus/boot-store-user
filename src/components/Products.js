import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {IoIosArrowBack} from 'react-icons/io';
import {IoIosArrowForward} from 'react-icons/io';

import CategorieContext from '../contexts/CategorieContext';
import colors from './colors';

export default function Products(){
    const { categorieId } = useContext(CategorieContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        if (categorieId !== 0){
            const request = axios.get(`https://api-book-store.herokuapp.com/products/category/${categorieId}`);
            request.then( resp => {
                setBooks(resp.data.products);
                setLoading(false);
            }).catch( error => {
                console.log(error);
            });
        }
    },[categorieId]);  

    function nextBook(){
        const newOrder = books.slice(1,books.length);
        newOrder.push(books[0]);
        setBooks(newOrder);  
    }

    function previousBook(){
        const newOrder = books.slice(0,(books.length)-1);
        newOrder.unshift(books[(books.length)-1]);
        setBooks(newOrder);      
    }

    function selectProduct(id){
        history.push(`/product/${id}`);
    }

    return(
        <Container>
            <div>
                <IoIosArrowBack className='arrow' onClick={previousBook}/>
                {loading ? 
                    <Load>
                        <img src='/images/load.gif' alt='load' />
                        <h2>Loading...</h2>
                    </Load>
                    :
                    <ul>
                        {books.length !== 0 ?
                            books.map( b => {                        
                                const price = ((b.price)/100).toFixed(2);
                                return(
                                    <li key={b.id} onClick={() => selectProduct(b.id)}>
                                        <img src={b.photos[0] !== undefined ? b.photos[0].link: null} />
                                        <h2>{b.name}</h2>
                                        <h2>R$ {price}</h2>
                                    </li>
                                );                        
                            }) : 
                            <h2>Nenhum livro encontrado</h2>   
                        }
                    </ul>   
                }             
                <IoIosArrowForward className='arrow' onClick={nextBook}/>
            </div>            
        </Container>
    );
}

const Container = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;

    div{        
        width: 80%;
        padding: 10px 10px;
        border-radius: 5px;
        background: ${colors.black};
        margin-bottom: 10px;
        justify-content: space-between;
        align-items: center;
        display: flex;

        ul{
            overflow: hidden;
            display: flex;
            color: white;
            
            li{
                flex-shrink: 0;
                width: 20%;
                margin: 0 10px;
                padding: 10px;
                border-radius: 5px;            
                cursor: pointer;
                img{
                    width: 100%;
                    height: 80%;
                    margin-bottom: 10px;
                }
                h2{
                    max-width: 20ch;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                    margin-bottom: 5px;
                }
            }
        }  
         
        li:hover,.arrow:hover{
            background: ${colors.grey};
        }
        .arrow{
            flex-shrink: 0;
            margin: 0 3px;
            width: 40px;
            height: 40px;
            font-size: 40px;
            border-radius: 50%;
            color: white;
            border: 1px solid ${colors.grey};
            cursor: pointer;
        }
    }

    @media (max-width: 800px) {
        div{
            width: 100%;
            li {
            width: 80%;
            height: 300px;
        }
        }
        
    }
`;

const Load = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    img{
        border-radius: 10px;
    }
`;