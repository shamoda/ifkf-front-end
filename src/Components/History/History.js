import React, {Component} from 'react';
import {
    Alert,
    Button,
    Card,
    CardDeck,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFastBackward, faFastForward,
    faList,
    faSearch,
    faStepBackward,
    faStepForward,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default class History extends Component {


    render() {
        return (
            <Container fluid className={"p-0 mb-5"}>

                <Container fluid className={"contact-container-background p-5 mb-5"}>
                    <div className="row justify-content-sm-center pt-5">
                        <h1 className={"display-4 pt-4"}>Our History</h1>
                    </div>
                    <div className="row justify-content-sm-center">
                        <p className={"p-2"}>The history of International Fumonkai Karate-do Federation</p>
                    </div>
                </Container>

                <Container className={"py-5"}>
                    <p style={{textAlign:'justify'}}>
                        The first constituted organization was the European Karate Union (UEK).
                        To understand the World Karate general organisation, it is necessary to
                        start with this Union. Karate, on technical plan, was introduced in many
                        countries, as soon as 1950, by Japanese masters from mainly the JKA
                        (Japan Karate Association). They did teach but they did not care about
                        creating national and international organisations, as in other sports.
                        A French, M. Henry PLEE, was one of the most important promoters,
                        he trained hundreds of black belts. In 1961, in France, a pupil of M.
                        Pleee, working as a jurist, also 4th Dan black belt and Karate Teacher
                        (he used to teach after his work at the famous « Club Franccais ») ;
                        named Jacques DELCOURT, was elected President of French Karate, then
                        associated member of the Judo Federation.
                    </p>
                    <p style={{textAlign:'justify'}}>
                        After having organised Karate in France from 1961 to 1963,
                        he invited afterwards the few federations known in Europe (they were 7!)
                        to come to France at the occasion of the 1st International Karate Event
                        of all time : Belgium/ France/ Great Britain. On the 15th of December 1963
                        (remember this date, it is the departure point of the world karate),
                        he gathers in Paris the representants of 7 known nations, it was the 1st
                        Karate European Congress! Remember also the names of the attending persons,
                        they are the one who began the future WKF. For Italy, M. Augusto BASILE, for
                        Belgium, MM. AARTS Leeo and STAS, for Switzerland, M. CHERIX Bernard, for
                        Germany, M. Karl HEINZ KILTZ for Great Britain, M. BELL, for France,
                        MM DELCOURT et SEBBAN.
                    </p>
                    <p style={{textAlign:'justify'}}>
                        The representative for Spain, M. P. GARCIA was excused. An inventory of the
                        establishment of Karate, then very disorganised not to say not organised
                        at all was done. It was decided to contact the different Judo federations, which,
                        in many countries, headed up Karate. The question of different styles and techniques
                        was approached and the delegates noted - already! - That the unification of techniques
                        was impossible. The question of refereeing unification, which differed significantly
                        from a country to another, was approached and put on the agenda for next meeting. An
                        inventory of the practitioners was done: Germany 5 to 7000, Belgium, 1200 to 1500,
                        Great Britain around 5000, France, 4000. M. DELCOURT was in charge of coordinating
                        actions and to prepare the next meeting.
                    </p>

                </Container>

            </Container>
        )
    }
}