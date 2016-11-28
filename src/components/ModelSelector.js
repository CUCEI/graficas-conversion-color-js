import React, { Component } from 'react';

class ModelSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: 'rgbN',
            components: {
                component1: 0,
                component2: 0,
                component3: 0,
                component4: 0,
            }
        }
    }

    get modelComponents() {
        switch(this.state.model) {
            case 'rgbN':
            case 'rgbP':
            case 'rgbB':
            case 'rgbH':
                return ['r', 'g', 'b'];
            case 'xyz':
                return ['x', 'y', 'z'];
            case 'cmy':
                return ['c', 'm', 'y'];
            case 'cmyk':
                return ['c', 'm', 'y', 'k'];
            case 'hsv':
                return ['h', 's', 'v'];
            case 'yiq':
                return ['y', 'i', 'q'];
            default:
                return [];
        }
    }

    handleSelect(evt) {
        this.setState({
            model: evt.target.value,
        })
    }

    renderInputs(element, index) {
        return (
            <input
                onChange={(e) => {
                    console.log(e.target.value);
                    this.setState({
                        components: {
                            ...this.state.components,
                            [`component${index + 1}`]: e.target.value
                        }
                    }, () => this.props.onConvert(this.state.components, this.state.model));
                }}
                key={index}
                placeholder={element}
                value={this.state.components[`component${index + 1}`]}
            />
        );
    }

    render() {
        console.log();
        return (
            <section>
                <h3>
                    Modelo a convertir:
                    <select onChange={::this.handleSelect}>
                        <option value="rgbN">RGB normalizado</option>
                        <option value="rgbP">RGB porcentaje</option>
                        <option value="rgbB">RGB bytes</option>
                        <option value="rgbH">RGB hexadecimal</option>
                        <option value="xyz">XYZ</option>
                        <option value="cmy">CMY</option>
                        <option value="cmyk">CMYK</option>
                        <option value="hsv">HSV</option>
                        <option value="yiq">YIQ</option>
                    </select>
                </h3>
                <form
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {this.modelComponents.map(::this.renderInputs)}
                </form>
                <hr />
            </section>
        );
    }
}

export default ModelSelector;
