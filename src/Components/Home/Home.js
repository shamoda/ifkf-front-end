import React, {Component} from 'react';
import './Home.css';
import {Carousel, Card, ListGroup, CardDeck, Container, Row, Col} from 'react-bootstrap';

class Home extends Component {
    state = {}

    render() {
        return (
            <div className={"container-fluid px-0 pb-5"}>

                <Carousel className={"img_overlay img-hover-zoom"}>

                    <Carousel.Item interval={10}>
                        {/*<img*/}
                        {/*    width={100}*/}
                        {/*    className="d-block w-100"*/}
                        {/*    src={require(`../../Assets/carousel2.jpg`)}*/}
                        {/*    alt="First slide"*/}
                        {/*/>*/}
                        <Carousel.Caption className="centered" style={{width: '80%'}}>
                            <h4>“The ultimate aim of Karate lies not in victory or defeat, but in the perfection of the
                                character of its participants.”</h4>
                            <p>- Gichin Funakoshi</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={10}>
                        <img
                            width={100}
                            className="d-block w-100"
                            src={require(`../../Assets/carousel1.jpg`)}
                            alt="Third slide"
                        />
                        <Carousel.Caption className="centered" style={{width: '80%'}}>
                            <h4>“Karate-Do is a lifetime study”</h4>
                            <p>- Kenwa Mabuni</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            width={100}
                            className="d-block w-100"
                            src={require(`../../Assets/carousel3.jpg`)}
                            alt="Third slide"
                        />
                        <Carousel.Caption className="centered" style={{width: '80%'}}>
                            <h4>“Karate aims to build character, improve human behavior, and cultivate modesty; it does
                                not, however, guarantee it.”</h4>
                            <p>- Yasuhiro Konishi</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                </Carousel>

                <Container className={"py-5 mt-5"}>

                    <Row className={"py-5"}>

                        <Col>
                            <h1 className={"pb-5"}>What is Karate ?</h1>
                            <p style={{textAlign:'justify', fontSize:'18px'}}>
                                Karate is a Japanese martial art whose physical aspects seek the development of
                                defensive and counter-attacking body movements.
                                The themes of traditional karate training are fighting and self-defense, though its
                                mental and moral aspects target the overall improvement of the individual.
                                This is facilitated by the discipline and persistent effort required in training. If
                                karate had to be described in only one sentence, then the most suitable one may arguably
                                be "You never attack first in karate."
                            </p>
                        </Col>
                        {/*<Col>*/}
                        {/*    <CardDeck>*/}

                        {/*        <Card>*/}
                        {/*            <Card.Header>Quote</Card.Header>*/}
                        {/*            <Card.Body>*/}
                        {/*                <h5>*/}
                        {/*                    {' '}*/}
                        {/*                    Karate-do may be referred to as the conflict within yourself,*/}
                        {/*                    or a life-long marathon which can be won only through self-discipline,*/}
                        {/*                    hard training, and your own creative efforts..{' '}*/}
                        {/*                </h5>*/}
                        {/*                <footer className="blockquote-footer">*/}
                        {/*                    Shoshin Nagamine (2011). <cite title="Source Title">Essence of Okinawan Karate-Do”, p.45, Tuttle Publishing</cite>*/}
                        {/*                </footer>*/}
                        {/*            </Card.Body>*/}
                        {/*        </Card>*/}

                        {/*        <Card>*/}
                        {/*            <Card.Header>What is Karate ?</Card.Header>*/}
                        {/*            <Card.Body>*/}
                        {/*                <Card.Text>*/}
                        {/*                    <p>*/}
                        {/*                        {' '} Karate is a Japanese martial art whose physical aspects seek the development of defensive and counter-attacking body movements.*/}
                        {/*                        The themes of traditional karate training are fighting and self-defense, though its mental and moral aspects target the overall improvement of the individual.*/}
                        {/*                        This is facilitated by the discipline and persistent effort required in training. If karate had to be described in only one sentence, then the most suitable one may arguably*/}
                        {/*                        be "You never attack first in karate."*/}
                        {/*                    </p>*/}
                        {/*                </Card.Text>*/}
                        {/*            </Card.Body>*/}
                        {/*        </Card>*/}

                        {/*    </CardDeck>*/}
                        {/*</Col>*/}

                    </Row>

                    <Row className={"mt-5 pt-5"}>
                        <Col>

                            <CardDeck className={"my-5"}>

                                <Card style={{width: '18rem'}}>
                                    <Card.Img variant="top" width={100}
                                              src={require(`../../Assets/coach2.jpg`)}/>
                                    <Card.Body>
                                        <Card.Title>Honmen Yamato</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">President of the International Karate
                                            Federation</Card.Subtitle>

                                    </Card.Body>
                                    <ListGroup variant="flush">
                                        <Card.Body>
                                            <Card.Text>
                                                The Chief Teacher of the Japanese Karate Homon Club <br/><br/>
                                                Kokushikan University.
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup>
                                    <ListGroup variant="flush">
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">Rank
                                                qualification</Card.Subtitle>
                                            <Card.Text><br/>
                                                Ninth-Dan in Teachers' College of All Japan Budo Association<br/><br/>
                                                International Karate Instructors Association Normal Sixth Duan<br/><br/>
                                                Children Sports Association Sports Instructor.<br/><br/>
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup>
                                </Card>

                                <Card style={{width: '18rem'}}>
                                    <Card.Img variant="top" width={100}
                                              src={require(`../../Assets/coach1.jpg`)}/>
                                    <Card.Body>
                                        <Card.Title>Nimal Kalupahana</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Text text text</Card.Subtitle>

                                    </Card.Body>
                                    <ListGroup variant="flush">
                                        <Card.Body>
                                            <Card.Text>
                                                The Chief Teacher of the Japanese Karate Homon Club <br/><br/>
                                                Kokushikan University.
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup>
                                    <ListGroup variant="flush">
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">Rank
                                                qualification</Card.Subtitle>
                                            <Card.Text><br/>
                                                Ninth-Dan in Teachers' College of All Japan Budo Association<br/><br/>
                                                International Karate Instructors Association Normal Sixth Duan<br/><br/>
                                                Children Sports Association Sports Instructor.<br/><br/>
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup>
                                </Card>

                                <Card style={{width: '18rem'}}>
                                    <Card.Img variant="top" width={100}
                                              src={"https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"}/>
                                    <Card.Body>
                                        <Card.Title>Honmen Yamato</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">President of the International Karate
                                            Federation</Card.Subtitle>

                                    </Card.Body>
                                    <ListGroup variant="flush">
                                        <Card.Body>
                                            <Card.Text>
                                                The Chief Teacher of the Japanese Karate Homon Club <br/><br/>
                                                Kokushikan University.
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup>
                                    <ListGroup variant="flush">
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">Rank
                                                qualification</Card.Subtitle>
                                            <Card.Text><br/>
                                                Ninth-Dan in Teachers' College of All Japan Budo Association<br/><br/>
                                                International Karate Instructors Association Normal Sixth Duan<br/><br/>
                                                Children Sports Association Sports Instructor.<br/><br/>
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup>
                                </Card>

                            </CardDeck>

                        </Col>

                    </Row>


                </Container>
                {/*<Footer/>*/}

            </div>


        );
    }
}

export default Home;