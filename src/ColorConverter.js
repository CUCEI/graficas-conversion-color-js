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
        }
    }

    rgbhToRgbb(colorObject) {
        return {
            r: Number(`0x${colorObject.component1}`),
            g: Number(`0x${colorObject.component2}`),
            b: Number(`0x${colorObject.component3}`),
        }
    }
}

export default ColorConverter;
