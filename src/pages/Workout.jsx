import { useState, useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddWorkout from '../components/AddWorkout'
import UpdateWorkout from '../components/UpdateWorkout'
import DeleteWorkout from '../components/DeleteWorkout'
import CompleteWorkout from '../components/CompleteWorkout'

export default function Workouts() {

	const [workout, setWorkout] = useState([]);
    const [workoutUser, setWorkoutUser] = useState([]);

        const fetchWorkout = () => {
        let fetchUrl = "https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts"

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {         

            if(data.message === "No Workouts found."){
                setWorkout([])
            } else {
                setWorkout(data.workouts);
            }
        });
    }

   useEffect(() => {

        fetchWorkout();
        
    });

       useEffect(() => {

        const workoutArr = workout.map(work => {
            return (
              
                <tr key={work._id}>
                    <td>{work.name}</td>
                    <td>{work.duration}</td>
                    <td>{work.status}</td>
                    <td>{new Date(work.dateAdded).toLocaleString()}</td>
                    
                  <td className="text-center">
                  		{(work.status === "pending")
        				?
        				<>
                  		<CompleteWorkout workout={work._id} fetchWorkout={fetchWorkout}/>
                  		<UpdateWorkout workout={work._id} fetchWorkout={fetchWorkout}/>
                        <DeleteWorkout workout={work._id} fetchWorkout={fetchWorkout}/>
                        </>
                  		:
                  		<>
                        <UpdateWorkout workout={work._id} fetchWorkout={fetchWorkout}/>
                        <DeleteWorkout workout={work._id} fetchWorkout={fetchWorkout}/>
                        </>
                    }
                    </td>
                </tr>
                )
        })

        setWorkoutUser(workoutArr)
    }, [workout])


    return(
        (workout.length === 0)
        ?
        <>

        <Row>
            <Col className="text-center mx-auto">
                <h1>No Workouts</h1>
                <AddWorkout fetchWorkout={fetchWorkout}/>
            </Col>
        </Row>
        </>
        : 
        <>
            <h2 className="text-center my-4">Your Workout List</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center table-dark">
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th colSpan="2"> Actions </th>
                    </tr>
                </thead>

                <tbody>
                 	{workoutUser}
                </tbody>
            </Table>    
            <AddWorkout fetchWorkout={fetchWorkout}/>
        </>

        )
}