import axios from 'axios';

import { SERVICES_CONST } from '../Constants/appConstants';

const URL = 'http://localhost:1337/172.23.36.8:8080/marvel/';

function Services(value, params={}) {
    let data = {};
    console.log("login", params);
            const Login_URL = URL + 'login';
            axios.post(Login_URL, params)
                .then(res => {
                    console.log(res.data);
                    data = res.data;
                    return data;
                })
                .catch(err => {
                    console.log(err.response.data);
                    data = err.response.data;
                    return data;
                });
    // switch(value) {
    //     case SERVICES_CONST.LOGIN: 
    //         console.log("login", params);
    //         const Login_URL = URL + 'login';
    //         axios.post(Login_URL, params)
    //             .then(res => {
    //                 console.log(res.data);
    //                 data = res.data;
    //             })
    //             .catch(err => {
    //                 console.log(err.response.data);
    //                 data = err.response.data;
    //             });
    //         break;
    //     case SERVICES_CONST.SIGNUP:
    //         console.log("SignUp", params);
    //         const SignUp_URL = URL + 'registration';
    //         axios.post(SignUp_URL, params)
    //             .then(res => {
    //                 console.log(res.data);
    //                 data = res.data;
    //             })
    //             .catch(err => {
    //                 console.log(err.response.data);
    //                 data = err.response.data;
    //             });
    //         break;
    //     case SERVICES_CONST.DASHBOARD:
    //         break;
    //     default:
    //         break;
    // }
    return data;
}

export default Services;