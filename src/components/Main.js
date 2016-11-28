import React, { Component } from 'react';
import Color from './Color';
import ModelSelector from './ModelSelector';
import ColorConverter from '../ColorConverter';

import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props);

        this.converter = new ColorConverter;

        this.handleConvert = this.handleConvert.bind(this);

        this.state = {
            rgb: {r: 0, g: 0, b: 0}
        }
    }

    handleConvert(colorObject, model) {
        this.setState({
            rgb: this.converter.toRgb(colorObject, model),
        });
    }

    render() {
        return  (
            <section className="container">
                <h2>Color resultante:</h2>
                <Color rgb={this.state.rgb} />
                <ModelSelector onConvert={this.handleConvert} />
                <div>
                    <h4>RGB normalizado:</h4>
                </div>
                <div>
                    <h4>RGB porcentaje:</h4>
                </div>
                <div>
                    <h4>RGB bytes:</h4>
                </div>
                <div>
                    <h4>RGB hexadecimal:</h4>
                </div>
                <div>
                    <h4>XYZ:</h4>
                </div>
                <div>
                    <h4>CMY:</h4>
                </div>
                <div>
                    <h4>CMYK:</h4>
                </div>
                <div>
                    <h4>HSV:</h4>
                </div>
                <div>
                    <h4>YIQ:</h4>
                </div>
            </section>
        );
    }
}

export default Main;
