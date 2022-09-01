import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import { addDays, subDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../services/user_service";

import Table from 'react-bootstrap/Table';



const containerStyle = {
    // width : "60%",
    display :  "flex",
    flexDirection:"column",
    alignContent : "space-evenly",
    // border:"2px solid red",
    borderRadius: 10,
    backgroundColor : "#f7f7f7",
    padding : 10,
    marginBottom:'7px'
    
}

const dropDownItemStyle = {
    // border:"2px solid red",
    width: "20%",
    alignSelf:"center" ,
    marginBottom:'7px'

}

//current variable value is used in Date Picker element, value is incremented here to store the next day w.r.t current day
const current = new Date();   
// console.log(current.toDateString());

current.setDate(current.getDate() + 1);

console.log(current.toDateString());
const queryDate = current.toDateString();


const SearchBar = () => {


    const [place,setPlace] = useState('Location');
    const [slot,setSlot] = useState('');

    //Date Picker related attributes
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };
    
    let seatsAvailable = 44;
  


    const [codes, setCodes] = useState([]);

  
    const [locationCode,setLocationCode] =useState('');
 
    //funtion to handle click event triggered by search button
    const handleSearch =()=>{
       
        UserService.getLocationData(startDate,place,slot).then(
            (response) => {
                const locationData = response.data;
                console.log(locationData);
                setCodes(locationData);
            },
            (error) => {
                const _codes =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) ||
                    error.message ||
                    error.toString();
                setCodes(_codes);
            }
            
            );

                
    };
    
    const [book,setBook] =useState('');
    let booked=true;

    const createBooking =(startDate,slot,locationCode)=>{


        UserService.createBooking(startDate,slot,locationCode).then(
        (response) =>{
            booked=true;
            console.log(response.data);
            //alert(response.data);
            setBook(response.data);
        }, (error) => {
           // booked=false;
            console.log(startDate);
            console.log(slot);
            console.log(locationCode);
            const _book =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            setBook(_book);
            }
        )
    }

    const conditionalRender= codes && codes.length>0;
    return (
            <>
            <div className="container" style={containerStyle}>
                {/* Location */}
                <div className="input-group" style={dropDownItemStyle}>
                    <input type="text" value={place} className="form-control" 
                        aria-label="Text input with dropdown button"/>
                        
                  
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary dropdown-toggle" 
                        type="button" data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"></button>

                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Gurgaon")}>Gurgaon</a>
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Noida")}>Noida</a>
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Hyderabad")}>Hyderabad</a>
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Bangalore")}>Bangalore</a>
                            
                        </div>

                    </div>
                </div>
                {/* date picker*/}
                <div className="input-group" style={dropDownItemStyle}>
                    <div className="container" style={{ border:"0.5px solid grey", borderRadius:"5px",backgroundColor:"white"}}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        includeDateIntervals={[
                            { start: new Date(), end: addDays(new Date(), 6) },
                          ]}
                        placeholderText="Click to select a date"
                        
                    />
                    </div>
                </div>
                {/* Slots */}
                <div className="input-group" style={dropDownItemStyle}>
                    <input type="text" value={"Slot "+slot} className="form-control" 
                        aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary dropdown-toggle"  
                        type="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"></button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" onClick={()=>setSlot("I")}>8:30AM-5:00PM</a>
                            <a className="dropdown-item" href="#" onClick={()=>setSlot("II")}>11:00AM-8:30PM</a>
                            
                        </div>
                    </div>
                </div>

                {/* Search button */}
                <div className="input-group" style={dropDownItemStyle}>
                    <button className="btn btn-primary" type="button" onClick={()=>handleSearch()}   style={{width:'fit-content'}}>Search</button>
                </div>
            </div>

        

            {/* Table */}

            <Table responsive stripped="true" size="small">
            <thead>
                <tr>
                    <th>Location Code</th>
                    <th>Slots Available</th>
                    
                    <th>Slot Selected</th>
                    <th>Book</th>

                </tr>
            </thead>
            <tbody>
                {   
                    conditionalRender?
                    codes.map(item => 
                        <tr>
                            <td>{item.code}</td>
                            <td>{item.seatLeft}</td>
                            <td>{slot}</td>
                            <td><button className='btn btn-primary' onClick={()=>createBooking(startDate,slot,item.code)}
                            data-toggle="modal" data-target="#bookingSuccessModal">Book</button></td>

                             {/* Booking Success Modal */}

                             <div class="modal fade" id="bookingSuccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                 <div class="modal-dialog modal-dialog-centered" role="document">
                                 <div class="modal-content">
                                
                            <div class="modal-body">
                              {book}
                             </div>
                             <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                           
                             </div>
                            </div>
                            
                        </div>
                        </div>


                        
                        </tr>
                        ): 'No data'
                }
            </tbody>
            </Table>
            </>
        );
    
};

export default SearchBar;

