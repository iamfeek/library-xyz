// A function to validate Singapore NRIC and FIN number
export function validateNRICFIN(nric: string): boolean {
    // Check if the input is null or empty
    if (!nric) return false;

    // Check if the input length is 9
    if (nric.length !== 9) return false;

    // Check if the first letter is S, T, F or G
    let firstLetter = nric[0].toUpperCase();
    if (!['S', 'T', 'F', 'G'].includes(firstLetter)) return false;

    // Check if the last letter is A - Z
    let lastLetter = nric[8].toUpperCase();
    if (lastLetter < 'A' || lastLetter > 'Z') return false;

    // Calculate the checksum based on the first letter and the digits
    let checksum = 0;
    let weights = [2, 7, 6, 5, 4, 3, 2];
    for (let i = 1; i < 8; i++) {
        checksum += parseInt(nric[i]) * weights[i - 1];
    }

    // Adjust the checksum based on the first letter
    if (firstLetter === 'T' || firstLetter === 'G') checksum += 4;

    // Get the remainder and the check digit
    let remainder = checksum % 11;
    let checkDigit = '';

    // Get the check digit based on the first letter
    if (firstLetter === 'S' || firstLetter === 'T') {
        let st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        checkDigit = st[remainder];
    } else if (firstLetter === 'F' || firstLetter === 'G') {
        let fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
        checkDigit = fg[remainder];
    }

    // Return true if the check digit matches the last letter, false otherwise
    return checkDigit === lastLetter;
}