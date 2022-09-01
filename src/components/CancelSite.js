import React,{useEffect, useState} from "react";
import UserService from "../services/user_service";
import { Table } from "react-bootstrap";

const CancelSite =() =>{

    const [bookingData, setBookingData]= useState([]);

    let dateOfTransaction;
    let slot;
    let bookingId;

    useEffect(()=>{

        UserService.getBooking().then(
            (response)=>{
                console.log(response.data[0]);
               
                setBookingData(response.data);
    
            },(error)=>{
                console.log(error);
            }
        );

    },[]);
   
     const [cancel,setCancelData]=useState([]);
   

        const cancelBooking=(dateOfTransaction,slot,bookingId)=>{

            // alert("clicked!");

            UserService.cancelBooking(dateOfTransaction,slot,bookingId).then(
                (response)=>{
                   
                    console.log(response);
                    setCancelData(response.data);
                    
        
                },(error)=>{
                    console.log(error);
                   
                }
            );
    
            }


    
   
  

     
    

    


       
   
    
    
    return <div>
        <div className="jumbotron">
          <strong>Cancel Last Booking</strong>  

            </div> 
          <Table responsive stripped="true" size="small">
            <thead>
                <tr>
                 
                    <th>Date Selected</th>
                   
                    <th>Location Code</th>
                    <th>Slot Selected</th>
                    <th>Cancel</th>

                </tr>
            </thead>
            <tbody>
                  
                    {
                       
                       bookingData.map(items=>
                       
                        <tr>
                            
                            <td>{items.dateOfTransaction}</td>
                            
                            <td>{items.locationCode}</td>
                        
                            <td>{items.slotTime}</td>
                            <td><button onClick={()=>cancelBooking(items.dateOfTransaction,items.slotTime,items.transactionId)} className='btn btn-primary' data-toggle="modal" data-target="#cancelSuccessModal">Cancel</button></td>
                            
                            {/* Cancel Modal */}
                            <div class="modal fade" id="cancelSuccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                 <div class="modal-dialog modal-dialog-centered" role="document">
                                 <div class="modal-content">
                                
                            <div class="modal-body">
                              {cancel}
                             </div>
                             <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                           
                             </div>
                            </div>
                            
                        </div>
                        </div>

                            {/*  */} 
                        </tr>
                       )
                    }
            </tbody>
            </Table>

            {/* onClick={cancelBooking(bookingData.date,bookingData.slot)} */}
        {/* <button onClick={CancelHelper}>Get Data</button> */}
      
    </div>
}

export default CancelSite;