import axios from "axios";
import moment from "moment/moment";
import { appConstants } from './constant';

export const appHelpers = {
    formatDate: (d, format) => {
        return moment(d).format(format || "MMM DD, YYYY");
    },
    interpretError : error => {
        let errorMessage;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(error.response.status === 500){
                errorMessage = "Oops, something went wrong";
            }else if(error.response.status === 404){
                errorMessage = "Resource not found";
            }else{
                errorMessage = "Oops, unable to process request"
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errorMessage = 'Connection refused';
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
        }
        return { status: appConstants.REQUEST_ERROR, error: errorMessage}
    },
    getRequest: function (url) {
        let reqHeader = {"Content-Type": "application/json"};
        let config = {headers: reqHeader};
        return axios
            .get(url, config)
            .then(function (res) {
                return { status: appConstants.REQUEST_SUCCESS, response: res.data }
            })
            .catch((error) => {
                const errorMessage = this.interpretError(error);
                return { status: appConstants.REQUEST_ERROR, error: errorMessage}
            });
    },
    postRequest: function (url, payload) {
        let reqHeader = {"Content-Type": "application/json"};

        let config = {headers: reqHeader};

        return axios.post(url, payload, config)
            .then(res => {
                return { status: appConstants.REQUEST_SUCCESS, response: res.data }
            }).catch((error) => {
                const errorMessage = this.interpretError(error);
                return { status: appConstants.REQUEST_ERROR, error: errorMessage}
            });
    }
};