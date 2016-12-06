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
            rgbb: {
                component1: 0,
                component2: 0,
                component3: 0
            },
        };
    }

    handleConvert(colorObject, model) {
        this.setState({
            rgbb: this.converter.toRgb(colorObject, model),
        });
    }

    render() {
        let rgbN = this.converter.rgbbToRgbn(this.state.rgbb);
        let rgbP = this.converter.rgbbToRgbp(this.state.rgbb);
        let rgbH = this.converter.rgbbToRgbh(this.state.rgbb);
        let xyz = this.converter.rgbbToXyz(this.state.rgbb);
        let cmy = this.converter.rgbbToCmy(this.state.rgbb);
        let cmyk = this.converter.rgbbToCmyk(this.state.rgbb);
        let hsv = this.converter.rgbbToHsv(this.state.rgbb);
        let yiq = this.converter.rgbbToYiq(this.state.rgbb);

        return  (
            <section className="container">
                <h2>Color resultante:</h2>
                <Color components={this.state.rgbb} />
                <ModelSelector
                    onConvert={this.handleConvert}
                    value={this.state.rgbb}
                />
                <div>
                    <h4>RGB normalizado: R = {rgbN.component1}, G = {rgbN.component2} B = {rgbN.component3}</h4>
                </div>
                <div>
                    <h4>RGB porcentaje: R = {rgbP.component1}, G = {rgbP.component2} B = {rgbP.component3}</h4>
                </div>
                <div>
                    <h4>RGB bytes: R = {Math.trunc(this.state.rgbb.component1)}, G = {Math.trunc(this.state.rgbb.component2)}, B = {Math.trunc(this.state.rgbb.component3)}</h4>
                </div>
                <div>
                    <h4>RGB hexadecimal: R = {rgbH.component1}, G = {rgbH.component2}, B = {rgbH.component3}</h4>
                </div>
                <div>
                    <h4>XYZ: X = {xyz.component1.toFixed(4)}, Y = {xyz.component2.toFixed(4)}, Z = {xyz.component3.toFixed(4)}</h4>
                </div>
                <div>
                    <h4>CMY: C = {cmy.component1}, M = {cmy.component2}, Y = {cmy.component3}</h4>
                </div>
                <div>
                    <h4>CMYK: C = {cmyk.component1}, M = {cmyk.component2}, Y = {cmyk.component3}, K = {cmyk.component4}</h4>
                </div>
                <div>
                    <h4>HSV: H = {hsv.component1}, S = {hsv.component2}, V = {hsv.component3}</h4>
                </div>
                <div>
                    <h4>YIQ: Y = {yiq.component1}, I = {yiq.component2}, Q = {yiq.component3}</h4>
                </div>
            </section>
        );
    }
}

export default Main;
