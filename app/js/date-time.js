function bulkTimestampToDateTime(timestamps) {
    const [a, b, c, ...rest] = timestamps;
    return new Date(a * 1000);
}

function timestampToDateTime(timestamp) {
    return new Date(timestamp * 1000);
}