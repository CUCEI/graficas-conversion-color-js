class ColorConverter {
    toRgb(colorObject, model) {
        switch (model) {
            case 'rgbN':
                return this.rgbnToRgbb(colorObject);
            case 'rgbP':
                return this.rgbpToRgbb(colorObject);
            case 'rgbH':
                return this.rgbhToRgbb(colorObject);
            case 'xyz':
                return this.xyzToRgbb(colorObject);
            case 'cmy':
                return this.cmyToRgbb(colorObject);
            case 'cmyk':
                return this.cmykToRgbb(colorObject);
            case 'hsv':
                return this.hsvToRgbb(colorObject);
            case 'yiq':
                return this.yiqToRgbb(colorObject);
            case 'rgbB':
            default:
                return colorObject;
        }
    }

    rgbnToRgbb(colorObject) {
        return {
            component1: 256 * colorObject.component1,
            component2: 256 * colorObject.component2,
            component3: 256 * colorObject.component3,
        }
    }

    rgbpToRgbb(colorObject) {
        return {
            component1: Math.trunc((256 * colorObject.component1) / 100),
            component2: Math.trunc((256 * colorObject.component2) / 100),
            component3: Math.trunc((256 * colorObject.component3) / 100),
        };
    }

    rgbhToRgbb(colorObject) {
        return {
            component1: Number(`0x${colorObject.component1}`),
            component2: Number(`0x${colorObject.component2}`),
            component3: Number(`0x${colorObject.component3}`),
        };
    }

    xyzToRgbb(colorObject) {
        const matrix = [
            [2.37067, -0.90004, -0.47063],
            [-0.51388, 1.42530, 0.08858],
            [0.00530, -0.01469, 1.00940],
        ]

        const colorObjectRgbn = {
            component1: (matrix[0][0] * colorObject.component1) + (matrix[0][1] * colorObject.component2) + (matrix[0][2] * colorObject.component3),
            component2: (matrix[1][0] * colorObject.component1) + (matrix[1][1] * colorObject.component2) + (matrix[1][2] * colorObject.component3),
            component3: (matrix[2][0] * colorObject.component1) + (matrix[2][1] * colorObject.component2) + (matrix[2][2] * colorObject.component3),
        }

        return this.rgbnToRgbb(colorObjectRgbn);
    }

    cmyToRgbb(colorObject) {
        const colorObjectRgbn = {
            component1: 1 - colorObject.component1,
            component2: 1 - colorObject.component2,
            component3: 1 - colorObject.component3,
        }

        return this.rgbnToRgbb(colorObjectRgbn);
    }

    cmykToRgbb(colorObject) {
        const colorObjectRgbn = {
            component1: 1 - (component1 + component4),
            component2: 1 - (component2 + component4),
            component3: 1 - (component3 + component4),
        }

        return this.rgbnToRgbb(colorObjectRgbn);
    }

    hsvToRgbb(colorObject) {
        let h = colorObject.component1;
        let s = colorObject.component2;
        let v = colorObject.component3;

        h = (h === 360) ? 1 : (h % 360 / 360 * 6)
        s = (s === 100) ? 1 : (s % 100 / 100)
        v = (v === 100) ? 1 : (v % 100 / 100)

        let i = Math.floor(h)
        let f = h - i
        let p = v * (1 - s)
        let q = v * (1 - f * s)
        let t = v * (1 - (1 - f) * s)
        let mod = i % 6
        let r = [v, q, p, p, t, v][mod]
        let g = [t, v, v, q, p, p][mod]
        let b = [p, p, t, v, v, q][mod]

        return this.rgbnToRgbb({
            component1: r,
            component2: g,
            component3: b,
        });
    }

    yiqToRgbb(colorObject) {
        const matrix = [
            [1, 1, 0],
            [1, -0.509, -.194],
            [1, 0, 1],
        ]

        const colorObjectRgbn = {
            component1: (matrix[0][0] * colorObject.component1) + (matrix[0][1] * colorObject.component2) + (matrix[0][2] * colorObject.component3),
            component2: (matrix[1][0] * colorObject.component1) + (matrix[1][1] * colorObject.component2) + (matrix[1][2] * colorObject.component3),
            component3: (matrix[2][0] * colorObject.component1) + (matrix[2][1] * colorObject.component2) + (matrix[2][2] * colorObject.component3),
        }

        return this.rgbnToRgbb(colorObjectRgbn);
    }

    rgbbToRgbn(colorObject) {
        return {
            component1: colorObject.component1 / 256,
            component2: colorObject.component2 / 256,
            component3: colorObject.component3 / 256,
        }
    }

    rgbbToRgbp(colorObject) {
        return {
            component1: Math.trunc((colorObject.component1 / 256) * 100),
            component2: Math.trunc((colorObject.component2 / 256) * 100),
            component3: Math.trunc((colorObject.component3 / 256) * 100),
        };
    }

    rgbbToRgbh(colorObject) {
        return {
            component1: colorObject.component1 === 0 ? 0 : Math.trunc(colorObject.component1 - 1).toString(16),
            component2: colorObject.component2 === 0 ? 0 : Math.trunc(colorObject.component2 - 1).toString(16),
            component3: colorObject.component3 === 0 ? 0 : Math.trunc(colorObject.component3 - 1).toString(16),
        };
    }

    rgbbToXyz(colorObject) {
        const matrix = [
            [0.48872, 0.31068, 0.2006],
            [0.1762, 0.81298, 0.01081],
            [0, 0.01020, 0.9898],
        ]

        const colorObjectRgbn = this.rgbbToRgbn(colorObject);

        return {
            component1: (matrix[0][0] * colorObjectRgbn.component1) + (matrix[0][1] * colorObjectRgbn.component2) + (matrix[0][2] * colorObjectRgbn.component3),
            component2: (matrix[1][0] * colorObjectRgbn.component1) + (matrix[1][1] * colorObjectRgbn.component2) + (matrix[1][2] * colorObjectRgbn.component3),
            component3: (matrix[2][0] * colorObjectRgbn.component1) + (matrix[2][1] * colorObjectRgbn.component2) + (matrix[2][2] * colorObjectRgbn.component3),
        }
    }

    rgbbToCmy(colorObject) {
        const colorObjectRgbn = this.rgbbToRgbn(colorObject);

        return {
            component1: 1 - colorObjectRgbn.component1,
            component2: 1 - colorObjectRgbn.component2,
            component3: 1 - colorObjectRgbn.component3,
        };
    }

    rgbbToCmyk(colorObject) {
        const colorObjectCmy = this.rgbbToCmy(colorObject);
        const KValue = Math.min.apply(null, [colorObjectCmy.component1, colorObjectCmy.component2, colorObjectCmy.component3]);

        return {
            component1: colorObjectCmy.component1 - KValue,
            component2: colorObjectCmy.component2 - KValue,
            component3: colorObjectCmy.component3 - KValue,
            component4: KValue,
        };
    }

    rgbbToHsv(colorObject) {
        const colorObjectRgbn = this.rgbbToRgbn(colorObject);

        let r = colorObjectRgbn.component1;
        let g = colorObjectRgbn.component2;
        let b = colorObjectRgbn.component3;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, v = max;

        let d = max - min;

        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            component1: Math.floor(h * 360),
            component2: Math.floor(s * 100),
            component3: Math.floor(v * 100),
        };
    }

    rgbbToYiq(colorObject) {
        const matrix = [
            [0.299, 0.587, 0.114],
            [0.701, -0.587, -0.114],
            [-0.299, -0.587, 0.886],
        ]

        const colorObjectRgbn = this.rgbbToRgbn(colorObject);

        return {
            component1: (matrix[0][0] * colorObjectRgbn.component1) + (matrix[0][1] * colorObjectRgbn.component2) + (matrix[0][2] * colorObjectRgbn.component3),
            component2: (matrix[1][0] * colorObjectRgbn.component1) + (matrix[1][1] * colorObjectRgbn.component2) + (matrix[1][2] * colorObjectRgbn.component3),
            component3: (matrix[2][0] * colorObjectRgbn.component1) + (matrix[2][1] * colorObjectRgbn.component2) + (matrix[2][2] * colorObjectRgbn.component3),
        }
    }
}

export default ColorConverter;
