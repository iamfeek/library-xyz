export function roundToNearest30(date = new Date()) {
    const interval = 30 * 60 * 1000; // 30 mins
    return new Date(Math.ceil(date.getTime() / interval) * interval)
}