import React, { Component } from 'react' 

import {Link} from 'react-router-dom'

import axios from 'axios'
import { baseurl } from '../APIurl'

class Profile extends Component{


    constructor(props){
        super(props)
        this.state = {
            name:"",
            email:"",
            aaid:"",
            status:"",
        }
    }

    componentDidMount(){
        axios.get(baseurl+"pro/")
            .then(res => {
                let resp = res.data
                console.log(resp)
                this.setState({
                    name:resp.name,
                    email: resp.email ,
                    aaid: resp.AA,
                    status: resp.status,     
                })
            })
    }

    render(){
        return(
            <section className="text-gray-500 body-font bg-gray-900">
                <div className="container px-5 py-4 mx-auto">
                    <div className="flex flex-wrap w-full mb-2">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                                Profile :
                            </h1>
                            <div className="h-1 w-20 bg-orange-500 rounded" />
                        </div>
                    </div>
                    <section className="text-gray-500 bg-gray-900 body-font">
                        <div className="container px-5 mx-auto">
                            <div className="flex flex-col text-center w-full mb-8">
                            
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                                        <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                            <img
                                                alt="team"
                                                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                                src="https://pickaface.net/gallery/avatar/20120409_230759_3646_Fake.png"
                                            />
                                            <div className="flex-grow">
                                                <h2 className="text-white title-font font-medium">
                                                    {this.state.name}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="text-gray-500 bg-gray-900 body-font">
                        <div className="container px-5 pb-3">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-2 lg:w-1/3">
                                    <div className="h-full bg-gray-800 px-8 py-8 rounded-lg overflow-hidden relative">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-600 mb-1">
                                        DETAILS
                                    </h2>
                                    <div className="justify-start">
                                        <span className="text-md pb-2 text-white">
                                        Email Id : <span className="text-md font-bold text-orange-500">{this.state.email}</span>
                                        </span>
                                        
                                        <br />
                                        <span className=" text-md pb-2 text-white">
                                            AA Id : <span className="font-bold text-white">{this.state.aaid}</span>
                                        </span>
                                        <br />
                                        <span className="text-md pb-2 text-white">
                                            Account Link Status : <span className="font-bold text-green-500">{this.state.status}</span>
                                        </span>
                                        <br />
                                        
                                        
                                
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start pt-10">
                                <Link to="/home">
                                    <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded-full text-sm">Sign Out
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5 ml-1" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        )
    }
}

export default Profile