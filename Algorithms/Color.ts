import { Color } from "../Common";

export function compositeAlpha(alphaFront: number, alphaBack: number): number {
    return alphaFront + (1 - alphaFront) * alphaBack;
}

export function compositeColors(sourceColor: Color, destinyColor: Color): Color {
    let compositedAlpha: number = compositeAlpha(sourceColor.a, destinyColor.a);

    let newColor = {
        a: compositedAlpha,
        r: Math.round(compositeColor(sourceColor.r * sourceColor.a, sourceColor.a, destinyColor.r * destinyColor.a) / compositedAlpha),
        g: Math.round(compositeColor(sourceColor.g * sourceColor.a, sourceColor.a, destinyColor.r * destinyColor.a) / compositedAlpha),
        b: Math.round(compositeColor(sourceColor.b * sourceColor.a, sourceColor.a, destinyColor.b * destinyColor.a) / compositedAlpha),
    };

    return newColor;
}

export function compositeColor(preComputedSourceColor: number, sourceAlpha: number, preComputedDestinyColor): number {
    return preComputedSourceColor + (1 - sourceAlpha) * preComputedDestinyColor;
}