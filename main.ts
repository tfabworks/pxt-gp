enum BrightnessEvent {
    //% block="暗い"
    IsDark = 1,
    //% block="明るい"
    IsBrighter = 2,
}

//% weight=70 icon="\uf1e6" color=#0fbc11 block="電気の利用"
namespace gp {
    //% blockId=human_detection block="人が動いた"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true;
        } else {
            return false;
        }
    }
    //% blockId=turn_on block="スイッチON"
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
    //% blockId=turn_off block="スイッチOFF"
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    //% blockId=is_dark block="暗い"
    export function isDark(): boolean {
        if (input.lightLevel() < 20) {
            return true;
        } else {
            return false;
        }
    }
    //% blockId=get_analog_value block="%p からアナログ値を取得"
    export function getAnalogValue(p: AnalogPin): number {
        let val: number;
        for (; ;) {
            if ((val = pins.analogReadPin(p)) != 255)
                break;
        }
        return val;
    }
    /**
 *Set brightness.
 * @param v number of brightness, eg: 30
 */
    //% blockId=brightness_determination block="%v より %flag"
    //% v.min=0 v.max=255
    export function brightnessDetermination(v: number = 30, flag: BrightnessEvent): boolean {
        let res: boolean = true;
        if (flag == 2) {
            res = !res;
        }
        if (input.lightLevel() < v) {
            return res;
        } else {
            return !res;
        }
    }
}