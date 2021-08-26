import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

const initialState = {
    selectedBookingID: '',
    id: '',
    createdDate:'',
    total:'',
    options1: [],
    bookings: []
}


class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onBookingIDSelect = this.onBookingIDSelect.bind(this);
        this.addService = this.addService.bind(this);
        this.backtoServiceListBillManagementDash = this.backtoServiceListBillManagementDash.bind(this);
    }

    backtoServiceListBillManagementDash(e) {
        window.location = '/create-serviceListBill'
    }
    componentDidMount() {
        axios.get('http://localhost:8100/booking/')
            .then(response => {
                this.setState({ bookings: response.data.data }, () => {
                    let data = [];
                    this.state.bookings.map((item, index) => {
                        let bookings = {
                            value: item._id,
                            label: item.bookingNo
                        }
                        data.push(bookings)
                        console.log("a" + bookings);
                    });
                    this.setState({ options1: data });
                })
            })

        }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
//  onBookingIDSelect(e) {
//         this.setState({ selectedBookingID: e ? e.map(item => item.value) : [] });
        
//     }
    onBookingIDSelect = selectedBookingID => {
        this.setState({ selectedBookingID });
        console.log('Option selected:', selectedBookingID);
    }

    addService(e, bookingNo,id) {
        if((bookingNo === '')){
            alert('Please enter booking ID!');
            
        }else{

        this.props.history.push({
            pathname: `/create-customerService/${id}`,
            data: `${bookingNo}`
        })
    }
    
      
}
      
      

/*onSubmit(e) {
    e.preventDefault();

    let serviceList = {
        bookings: this.state.selectedBookingID,
        createdDate: this.state.createdDate,
        total: this.state.total,

    }
    console.log('DATA TO SEND', serviceList);
    axios.post('http://localhost:8100/serviceList/create', serviceList)
        .then(response => {
            alert('Data successfully inserted')
            console.log("a");
        })

        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })


}
componentDidMount() {

    this.setState(state => {
        const { data } = this.props.location;
        state.ingredients.push(this.props.location);

    });
}
*/

render() {
    /*const { data } = this.props.location
    console.log("ingredient: " + data); */
    const { selectedBookingID } = this.state.selectedBookingID;
    console.log("bid: " + selectedBookingID); 
    return (
        <div className="container"><br />

            <h2>Create Customer Service List</h2>
            <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

            </h5>

            <form onSubmit={this.onSubmit} >

                <div className={"row"}>
                    <div className={"col-md-6"}>


                        
                    <label htmlFor="bookingID" className="form-label">Booking Number</label>
                            <Select
                                placeholder="Select Booking ID"
                                name="selectedBookingID"
                                value ={selectedBookingID}
                                options={this.state.options1}
                                
                                onChange={this.onBookingIDSelect}
                                className="basic-single"
                               
                            />
                            <br />

                        <div className="mb-3">
                            <label htmlFor="createdDate" className="form-label">Created Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="createdDate"
                                name="createdDate"
                                value={this.state.createdDate}
                                onChange={this.onChange}

                            />
                        </div>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn btn-secondary" onClick={e => this.backtoServiceListBillManagementDash(e)}>Back</button>
                        <button onClick={e => this.addService(e, this.state.selectedBookingID.label,this.state.selectedBookingID.value)} className="btn btn-primary">Add Service</button>
                        


                        
                    </div>
                </div>
                <br>
                </br>
                <br></br>
                <br></br>
            </form>


        </div>
    )
}
}

export default ServiceList;