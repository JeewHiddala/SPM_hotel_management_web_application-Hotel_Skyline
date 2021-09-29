import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import axios from 'axios';
import Swal from "sweetalert2";
import profile from '../../images/profile-avatar.png';

import './profile-styles.css';

const UpdateProfileImage = () => {
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")


    useEffect(() => {
        if (url) {
            let currentUser = AuthService.getCurrentUser();
            console.log('id', currentUser.id);
            let profile= {
                pic: url
            }
            console.log('DATA TO SEND', url);
            axios.patch(`http://localhost:8100/user/updatepic/${currentUser.id}`, profile)
                .then(response => {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Profile image has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location = '/profile'

                })
                .catch(error => {
                    console.log("xxx", error.message);
                    //alert(error.message)
                })
        }
    }, [url])

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "skylight-web")
        data.append("cloud_name", "svxzwylz")
        fetch("https://api.cloudinary.com/v1_1/svxzwylz/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })


    }

    return (

        <div className="container-form">
            <div>
                <h2>Update my Image</h2>
                <div className="container">
                    <div className="row">

                        <form>
                            <div className="text-center">
                                <img src={profile} className="card-img" id="profile-image" alt="profile" />
                            </div>
                            <br /><br />
                            <div className="input-group mb-3">
                                <button className="btn btn-warning" type="button" id="inputGroupFileAddon03" onClick={() => uploadImage()}>Update</button>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload" />
                            </div>

                            {/* <div className="file-field input-field" style={{ margin: "10px" }}>
                                        <div className="btn #64b5f6 blue darken-1">
                                            <span>Update pic</span>
                                            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div> */}
                            <br /><br />
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default UpdateProfileImage;
// export default class UpdateProfile extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             currentUser: AuthService.getCurrentUser()
//         };
//         this.UpdateProfile = this.UpdateProfile.bind(this);
//         this.onChange = this.onChange.bind(this);

//     }



//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     UpdateProfile(e) {
//         e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
//         if (this.state.password.localeCompare(this.state.customer.password) && this.state.cpassword.localeCompare(this.state.password)) {
//             console.log("Mismatch");
//             alert("Passwords don't match.");

//         } else {
//             let user = {
//                 password: this.state.password,
//             }
//             console.log('DATA TO SEND', user);
//             axios.patch(`http://localhost:8100/auth/${this.state.currentUser.id}`, user)

//             if (this.state.role === "customer") {
//                 let customer = {
//                     fullname: this.state.name,
//                     address: this.state.address,
//                     nicNo: this.state.nicNo,
//                     mobileNumber: this.state.mobileNumber,
//                     email: this.state.email,
//                     password: this.state.password
//                 }
//                 console.log('DATA TO SEND1', customer);
//                 axios.patch(`http://localhost:8100/customer/${this.state.id}`, customer)
//                     .then(response => {
//                         Swal.fire({
//                             position: 'center',
//                             icon: 'success',
//                             title: 'Customer details have been updated',
//                             showConfirmButton: false,
//                             timer: 1500
//                         })
//                         window.location = '/profile'

//                     })
//                     .catch(error => {
//                         console.log("xxx", error.message);
//                         //alert(error.message)
//                     })
//             } else {

//             }
//         }


//     }

//     render() {
//         const { currentUser } = this.state;

//         return (
//             <div className="container-form">
//                 {currentUser ? (
//                     <div>
//                         <h2>Update my Image</h2>
//                         <div className="container">
//                             <div className="row">

//                                 <form onSubmit={this.UpdateProfile}>
//                                     <div className="text-center">
//                                         <img src={profile} className="card-img" id="profile-image" alt="profile" />
//                                     </div>
//                                     <br /><br />
//                                     <div className="input-group mb-3">
//                                         <button className="btn btn-warning" type="button" id="inputGroupFileAddon03">Update</button>
//                                         <input type="file" className="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload" />
//                                     </div>

//                                     {/* <div className="file-field input-field" style={{ margin: "10px" }}>
//                                         <div className="btn #64b5f6 blue darken-1">
//                                             <span>Update pic</span>
//                                             <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
//                                         </div>
//                                         <div className="file-path-wrapper">
//                                             <input className="file-path validate" type="text" />
//                                         </div>
//                                     </div> */}
//                                     <br /><br />
//                                 </form>
//                             </div>
//                         </div>

//                     </div>
//                 ) : (
//                     <div className="container">
//                         <header className="jumbotron">
//                             <h3>Please Login to continue! </h3>
//                         </header>
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }