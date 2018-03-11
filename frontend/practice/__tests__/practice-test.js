import { sum, screamify, quietfy } from "../practice.js";

describe('practice functions', () => {
    test('sum adds two numbers together', () => {
        expect(sum(2, 3)).toEqual(5);
    });

    test('capitalize everything', ()=> {
        expect(screamify('a phrase')).toEqual("A PHRASE");
    });

    test('lowercases everything', ()=> {
        expect(quietfy('A PHRASE')).toEqual("a phrase");
    });
});