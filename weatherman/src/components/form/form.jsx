import React, { Component } from 'react';
import './form.style.css'

class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <div className='col-md-3'>
                <input type='text' name='city' className='form-control' placeholder='City'/>
                </div>
                <div className='col-md-3'>
                <input type='text' name='country' className='form-control' placeholder='Country'/><br/>
                </div>
                <div className='col-md-3'>
                <button className='btn btn-warning'>Get Weather</button>
                </div>
            </form>
        );
    }
};

export default Form;