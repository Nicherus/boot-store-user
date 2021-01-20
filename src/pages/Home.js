import React from 'react';

import Header from '../components/Header';
import BestSellers from '../components/BestSellers';
import Categories from '../components/Categories';

export default function Home(){
    return(
        <>
            <Header />
            <BestSellers />
            <Categories />
        </>
    );
}