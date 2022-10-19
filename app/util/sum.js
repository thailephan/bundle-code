export function sum(a, b) {
    return a + b;
}

export function sumMultiple(...args) {
    let total = args.reduce((p, c) => p + c);
    return total;
}