import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../bench_actions";
import * as ApiUtil from "../../util/bench_api_util";

import { testBenches, newBench } from "../../testUtil/bench_helper";
import { receiveBenches, receiveBench } from "../bench_actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("simple action creators", () => {
    test('receiveBenches should create an action to receive benches', () => {
        expect(receiveBenches(testBenches)).toEqual({
            type: actions.RECEIVE_BENCHES,
            benches: testBenches
        });
    });

    test('receiveBench should create an action to receive a bench', () => {
        expect(receiveBench(newBench)).toEqual({
            type: actions.RECEIVE_BENCH,
            bench: newBench
        });
    });
});

describe("async action creators", () => {
    test('fetchBenches creates RECEIVE_BENCHES after fetching benches', () => {
        const store = mockStore({ benches: {} });
        const expectedActions = [
            { type: actions.RECEIVE_BENCHES, benches: testBenches }
        ];

        ApiUtil.fetchBenches = jest.fn(() => {
            return Promise.resolve(testBenches);
        });

        return store.dispatch(actions.fetchBenches()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('fetchBench creates RECEIVE_BENCH after fetching a bench', () => {
        const store = mockStore({ benches: {} });
        const expectedActions = [
            { type: actions.RECEIVE_BENCH, bench: newBench }
        ];

        ApiUtil.fetchBench = jest.fn(() => {
            return Promise.resolve(newBench);
        });

        return store.dispatch(actions.fetchBench(newBench.id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
// Explanation of what Promise.resolve does:

// var promise1 = Promise.resolve([1, 2, 3]);

// promise1.then(function (value) {
//   console.log(value);
//   // expected output: Array [1, 2, 3]
// });
