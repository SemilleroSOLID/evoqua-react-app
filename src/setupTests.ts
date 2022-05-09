// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// window.URL.createObjectURL jest fail · Issue #115 · plotly/react-plotly.js
// https://github.com/plotly/react-plotly.js/issues/115#issuecomment-569299410
window.URL.createObjectURL = jest.fn();
window.HTMLCanvasElement.prototype.getContext = jest.fn();
