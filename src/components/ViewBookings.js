import React, { useState, useEffect } from "react";
import UserService from "../services/user_service";

const ViewBookings = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getLastUserBookings().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, [])

  if(!content){ //conditional rendering
    return (
        <div>No bookings!</div>
    )
  } else{
    return (
        <div>{JSON.stringify(content)}</div>          
      );
  }
  
};

export default ViewBookings;