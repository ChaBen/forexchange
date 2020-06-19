jest.setTimeout(120000);
Error.stackTraceLimit = Infinity;

// test in node env https://stackoverflow.com/a/43020260
global.XMLHttpRequest = undefined;
