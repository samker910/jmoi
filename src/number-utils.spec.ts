import * as assert from 'node:assert';
import {describe, it} from 'node:test';
import intToRoman from './number-utils';

describe('Testing arabic numeral to roman numeral transformer', {},() => {
    it('empty & unhandled value', {}, () => {
        assert.equal(intToRoman(null), null);
        assert.equal(intToRoman(undefined), null);
        assert.equal(intToRoman(-2), null);
        assert.equal(intToRoman(101), null);
    });

    it('unit', {}, () => {
        const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
        ones.forEach((oneDigit, idx) => {
            assert.strictEqual(intToRoman(idx), oneDigit);
        });
    });

    it('tens', {}, () => {
        const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];

        tens.forEach((tenDigit, idx) => {
            assert.strictEqual(intToRoman(idx * 10), tenDigit);
        });
    });

    it('hundreds', {}, () => {
        assert.strictEqual(intToRoman(100), 'C');
    });

    it('Fixed values', {}, () => {
        assert.strictEqual(intToRoman(99), 'XCIX');
        assert.strictEqual(intToRoman(39), 'XXXIX');
        assert.strictEqual(intToRoman(46), 'XLVI');
    });
});




