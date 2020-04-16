import React, { Component } from 'react';
import './weather.style.css';

class Weather extends Component {
    render() {
        return (
            <span className='all'>
            <div className="container">
                <div className="cards"><br/>
                    { this.props.city && this.props.country && <h1>{ this.props.city }, { this.props.country } </h1>}<br/>
                    { this.props.city && this.props.country && <i id='iconz' className={`wi ${this.props.weatherIcon} display-1`}/>}
                    { this.props.temperature && <h1 className="py-2">{this.props.temperature}&deg;</h1>}
        <h3>
            { this.props.min && <span id='iconz' className="px-4">Min: { this.props.min }&deg;</span>}
            { this.props.max && <span id='iconz' className="px-4">Max: { this.props.max }&deg;</span>}
        </h3>

                { this.props.description && <h4 className="py-3">{ this.props.description }</h4>}
    
                { this.props.humidity && <h6>Humidity: { this.props.humidity }</h6>}
                { this.props.error && <p>{ this.props.error }</p>}
            </div>
        </div>
    </span>
        );
    }
};


export default Weather