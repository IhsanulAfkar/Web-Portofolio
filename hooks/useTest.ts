export const fakeFetch = (ms = 2000) =>
    new Promise((resolve) => setTimeout(resolve, ms));