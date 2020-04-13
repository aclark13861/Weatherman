import React, { Component } from 'react';

class Weather extends Component {
    render() {
        return (
            <div className="container">
                <div className="cards">
                    <h5 className="py-4"></h5>
                    { this.props.city && this.props.country && <h1>{ this.props.city }, { this.props.country } </h1>}
                    { this.props.city && this.props.country && <i className={`wi ${this.props.weatherIcon} display-1`}/>}
                    { this.props.temperature && <h1 className="py-2">{this.props.temperature}&deg;</h1>}
        <h3>
            { this.props.min && <span className="px-4">{ this.props.min }&deg;</span>}
            { this.props.max && <span className="px-4">{ this.props.max }&deg;</span>}
        </h3>

                { this.props.description && <h4 className="py-3">{ this.props.description }</h4>}
    
                { this.props.humidity && <p>Humidity: { this.props.humidity }</p>}
                { this.props.error && <p>{ this.props.error }</p>}
            </div>
        </div>
        );
    }
};


export default Weather