import React, {Component} from 'react';
import './Home.css';
import {Carousel, Card, CardDeck, Container} from 'react-bootstrap';
import Image from "react-bootstrap/Image";

export default class Home extends Component {
    state = {}

    render() {
        return (
            <div className={"container-fluid px-0 pb-5"}>

                <Carousel className={"img_overlay img-hover-zoom"}>
                    <Carousel.Item interval={10}>
                        <img
                            width={100}
                            className="d-block w-100"
                            src={require(`../../Assets/karate3.jpg`)}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={10}>
                        <img
                            width={100}
                            className="d-block w-100"
                            src={require(`../../Assets/karate2.jpg`)}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            width={100}
                            className="d-block w-100"
                            src={require(`../../Assets/karate1.jpg`)}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>

                <Container fluid style={{backgroundColor: '#E5E5E5', height:'350px'}}>

                    <Container className={"p-5"}>
                        <p className={"vision-text"}>
                            "we are for the purpose of mutual exchange <br/>
                            of martial arts, combat"
                        </p>
                    </Container>
                </Container>

                <Container className={"py-5 mt-5"}>
                    <h1 className={"pb-5"}>Welcome</h1>
                    <p style={{textAlign: 'justify', fontSize: '18px'}}>
                        Welcome to the official web site of the International Fumonkai Karate-Do Federation.
                        The purpose of these pages are to describe the various aspects of our organisation, its
                        people, schools, and events.
                        Within our organisation one of our core values is loyalty. It is this deep rooted belief
                        why only our senior instructors and students have constantly followed
                        sensei throughout his life and continued with his vision of the One Family after his
                        passing.
                        The loyalty we feel to our Sensei, Tatsuo Suzuki is what he always demonstrated toward
                        his Sensei, Hironori Ohtsuka,
                        and is the true meaning of Shingi O Omanji. It is hoped that this site will bring all
                        members around the world closer together uniting us as one large family as Sensei
                        wished.
                        For non-members, we hope you find the material both useful and informative, and that you
                        gain some insight into our organisation and its values.
                    </p>
                </Container>

                {/*<Container>*/}
                {/*    <Card style={{borderRadius: '25px'}}>*/}
                {/*        <Card.Body>*/}
                {/*            <p className={"vision-text"}>*/}
                {/*                "we are for the purpose of mutual exchange <br/>*/}
                {/*                of martial arts, combat"*/}
                {/*            </p>*/}
                {/*        </Card.Body>*/}
                {/*    </Card>*/}
                {/*</Container>*/}

                <Container fluid style={{backgroundColor: '#E5E5E5'}}>
                    <Container className={"my-5 py-5"}>

                        <CardDeck>
                            <Card className={"coach-card my-5"}>
                                <div className={"coach-badge"}>
                                    <Image className={"coach-badge-img"} roundedCircle
                                           src={require(`../../Assets/coach2.jpg`)}/>
                                </div>
                                <Card.Body style={{textAlign: 'center', padding: '20px 25px'}}>
                                    <Card.Title>Honmen Yamato</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        President of the International Karate Federation
                                    </Card.Subtitle>
                                </Card.Body>
                                <Card.Body style={{padding: 0, backgroundColor: '#f5f5f5'}}>
                                    <Card.Subtitle className={"text-muted"} style={{padding: '20px 25px'}}>
                                        Rank qualification
                                    </Card.Subtitle>
                                    <Card.Text className={"mb-4"} style={{padding: '0px 25px'}}>
                                        Ninth-Dan in Teachers' College of All Japan Budo Association <br/><br/>
                                        International Karate Instructors Association Normal Sixth Duan
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body style={{padding: 0}}>
                                    <div>
                                        <Card.Text style={{padding: '25px 25px'}}>
                                            Children Sports Association Sports Instructor
                                        </Card.Text>
                                    </div>
                                    <div style={{borderTop: '1px solid rgba(0,0,0,0.2)'}}>
                                        <Card.Text style={{padding: '25px 25px'}}>
                                            The Chief Teacher of the Japanese Karate Homon Club
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className={"coach-card my-5"}>
                                <div className={"coach-badge"}>
                                    <Image className={"coach-badge-img"} roundedCircle
                                           src={require(`../../Assets/coach1.jpg`)}/>
                                </div>
                                <Card.Body style={{textAlign: 'center', padding: '20px 25px'}}>
                                    <Card.Title>Nimal Kalupahana</Card.Title>
                                    {/*<Card.Subtitle className="mb-2 text-muted">*/}
                                    {/*    President of the International Karate Federation*/}
                                    {/*</Card.Subtitle>*/}
                                </Card.Body>
                                <Card.Body style={{padding: 0, backgroundColor: '#f5f5f5'}}>
                                    <Card.Subtitle className={"text-muted"} style={{padding: '20px 25px'}}>
                                        Rank qualification
                                    </Card.Subtitle>
                                    <Card.Text className={"mb-4"} style={{padding: '0px 25px'}}>
                                        7th Dan Black belt (WKF) <br/>
                                        7th Dan Black belt (AKF) <br/>
                                        7th Dan Black belt (SLKF)<br/>
                                        7th Dan Black belt (UKF) <br/>
                                        7th Dan Black belt (UKAI)<br/>
                                        7th Dan Black belt (SLNF)
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body style={{padding: 0}}>
                                    <div>
                                        <Card.Text style={{padding: '25px 25px'}}>
                                            B grade refree (WKF)
                                        </Card.Text>
                                    </div>
                                    <div style={{borderTop: '1px solid rgba(0,0,0,0.2)'}}>
                                        <Card.Text style={{padding: '25px 25px'}}>
                                            A grade refree (SLKF)
                                        </Card.Text>
                                    </div>
                                    <div style={{borderTop: '1px solid rgba(0,0,0,0.2)'}}>
                                        <Card.Text style={{padding: '25px 25px'}}>
                                            Instructor of Sri Lanka Army
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className={"coach-card my-5"}>
                                <div className={"coach-badge"}>
                                    <Image className={"coach-badge-img"} roundedCircle
                                           src={require(`../../Assets/coach3.jpg`)}/>
                                </div>
                                <Card.Body style={{textAlign: 'center', padding: '20px 25px'}}>
                                    <Card.Title>Chathuranga Viraj</Card.Title>
                                    {/*<Card.Subtitle className="mb-2 text-muted">*/}
                                    {/*    President of the International Karate Federation*/}
                                    {/*</Card.Subtitle>*/}
                                </Card.Body>
                                <Card.Body style={{padding: 0, backgroundColor: '#f5f5f5'}}>
                                    <Card.Subtitle className={"text-muted"} style={{padding: '20px 25px'}}>
                                        Rank qualification
                                    </Card.Subtitle>
                                    <Card.Text className={"mb-4"} style={{padding: '25px 25px'}}>
                                        1st Dan Black Belt (SLKF) <br/><br/><br/>
                                        4th Dan Black Belt (IFKF) <br/><br/><br/>
                                        3rd Dan Black Belt (UKAI)
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body style={{padding: 0}}>
                                    <Card.Text style={{padding: '25px 25px'}}>
                                        B grade refree (SLKF)
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>

                    </Container>
                </Container>


            </div>


        );
    }
}