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
            r: Math.trunc(256 * colorObject.component1),
            g: Math.trunc(256 * colorObject.component2),
            b: Math.trunc(256 * colorObject.component3),
        }
    }

    rgbpToRgbb(colorObject) {
        return {
            r: Math.trunc((256 * colorObject.component1) / 100),
            g: Math.trunc((256 * colorObject.component2) / 100),
            b: Math.trunc((256 * colorObject.component3) / 100),
        };
    }

    rgbhToRgbb(colorObject) {
        return {
            r: Number(`0x${colorObject.component1}`),
            g: Number(`0x${colorObject.component2}`),
            b: Number(`0x${colorObject.component3}`),
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
}

export default ColorConverter;
