import React from 'react'
import Nav from '../components/nav.js'
import { HomeView } from '../components/homeView'
import Footer from '../components/footer.js'

export default function Home() {

    return (
        <div>
            <Nav></Nav>
            <HomeView></HomeView>
            <Footer></Footer>
        </div>
    )


}