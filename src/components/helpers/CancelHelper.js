import React, { useState } from "react";
import UserService from "../../services/user_service";



const Cancel =()=>{
    
     
    const [bookingData, setBookingData]= useState([]);
   
    const CancelHelper=UserService.getBooking().then(
        (response)=>{
            console.log(response);
            setBookingData(response.data);

        },(error)=>{
            console.log(error);
        }
    );

   

    }



   



    // bookingData.forEach((element)=>{
    //     console.log({element});
    // }






export default Cancel;