import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function RemoveItemFromCart({ workout, fetchWorkout }) {

    const removeToggle = async () => {
   
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to remove this workout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton: 'sweet-confirm',
                cancelButton: 'sweet-cancel'
            }
        });

        if (result.isConfirmed) {
      
            try {
                const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workout}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data.message);

                if (data.error !== "No Workout deleted" || data.error !== "Error in deleting an Workout." ) {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Workout deleted successfully',
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                    fetchWorkout(); 
                } else {
                    Swal.fire({
                        title: 'Something Went Wrong',
                        icon: 'error',
                        text: 'Please try again',
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                }

            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to remove workout. Please try again later.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        } else if (result.isDismissed) {
          
            Swal.fire({
                title: 'Cancelled',
                text: 'The item was not removed from the cart.',
                icon: 'info',
                customClass: {
                    confirmButton: 'sweet-warning'
                }
            });
        }
    }

    return (
        <Button className="btnRemove" variant="danger" size="sm" onClick={removeToggle}>
            Remove
        </Button>
    )
}
