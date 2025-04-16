function convertToMinutesSeconds(decimalMinutes: number): number {
    const minutes = Math.floor(decimalMinutes);
    const seconds = Math.round((decimalMinutes - minutes) * 60);
    return parseFloat(`${minutes}.${seconds.toString().padStart(2, "0")}`);
};

export default convertToMinutesSeconds;