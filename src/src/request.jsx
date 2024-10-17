import React, {
    Component
} from 'react';
import axios from 'axios';
import {
    GET,
    POST,
    PUT
} from '../../utils/api.jsx';

import LoadingComponent from '../composition/LoadingComponent.jsx';

const httpMethods ={
    get:GET,
    post:POST,
    put:PUT
}

export default function RequestHandler( Target,config ) {

    return class handler extends Component {

        constructor(props){
            super(props);
            this.state={data:null,url:""}
            this.request = this.request.bind(this);
            this.cancel = this.cancel.bind(this);
            this.successHandler = this.successHandler.bind(this);
            this.errorHandler = this.errorHandler.bind(this);
            this.ismounted = true;
        }

        successHandler( res ){
            this.setState({data:res.data})
        }

        errorHandler( err ){
            if (!axios.isCancel(err))
                console.log(err)
        }

        request( {options,method,onSuccess,onError} ){
            const CancelToken = axios.CancelToken,
                opt = options(this.props.params),
                success = onSuccess
                    ? onSuccess
                    : this.successHandler,
                error = onError
                    ? onError
                    : this.errorHandler;
            httpMethods[method]({
                cancelToken:new CancelToken(
                    function( c ) {
                        this.cancelRequest = c;
                    }.bind(this)
                ),
                ...opt
            })
            .then( success )
            .catch( error )
        }

        cancel(){
            if ( this.cancelRequest )
                this.cancelRequest("the request has been cancelled");
        }

        componentDidMount(){
            let url;
            if ( this.props.requestOnMount ){
                this.request(config);
            } else this.setState({data:true})
        }

        componentWillUnmount(){
            this.cancel();
        }

        render(){
            const {data} = this.state;
            return (
                <LoadingComponent
                    data={data}>
                    <Target
                        {...this.props}
                        requestHandler = {this.request}
                        data={data}/>
                </LoadingComponent>
            )
        }
    }
}

import axios from 'axios';

// colocar este par de variables directamente en variables de entorno
export const BASE_URL = process.env.REACT_APP_BASE_URL

export const RESOURCE_URL = process.env.REACT_APP_RESOURCE_URL

export const API_BASE = `${BASE_URL}/api`;

export const FLASK_API_BASE = `http://localhost:8080/api`;

export const GET = (
    options
) => {
    return axios({
        method:'get',
        timeout: 10000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

export const POST = (
    options
) => {
    return axios({
        method: 'post',
        timeout: 8000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

export const DELETE = (
    options
) => axios({
        method: 'delete',
        url: options.endpoint,
        timeout: 1000,
        withCredentials:true,
        baseURL: API_BASE,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
    });

export const PUT = (
    options
) => {

    return axios({
        method: 'put',
        timeout: 5000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

