import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="text-center mx-auto">
                <h1>Welcome to Fitness Tracker App</h1>
                <p>Manage your workouts easily!</p>
                {(localStorage.length !== 0) ?
                <Link className="btn btn-primary" to={"/workouts"}>Set your workouts</Link>
                :
                <Link className="btn btn-primary" to={"/login"}>Login to start</Link>
            	}
            </Col>
        </Row>
    )
}