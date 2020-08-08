import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const CarouselPage = () => {
    return (
        <Carousel >
            <Carousel.Item interval={10}>
                <img
                    width={100}
                    height={350}
                    className="d-block w-100"
                    src={require('../Home/images/evo-bags.webp')}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>VENUM BAG</h3>
                    <p>CARRY YOUR ALL THE THINGS TOGETHER ,WE RECOMMEND THIS 100% </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10}>
                <img
                    width={100}
                    height={350}
                    className="d-block w-100"
                    src={require('./images/stay-in-workout.jpg11.webp')}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>TORRENT PUNCHING BAG</h3>
                    <p>STAY HOME , STAY SAFE , KEEP PRACTICING ......</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    width={100}
                    height={350}
                    className="d-block w-100"
                    src={require('../Home/images/leslie-jones-urBiLDuUhMU-unsplash.jpg')}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <p>Karate has no philosophy. Some people think that the tradition of Karate came from Buddhism and Karate has a connection with the absolute, space and universe, but I don’t believe in that. My philosophy is to knock my opponent out, due to the use of only one technique. One finishing blow!”</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselPage;