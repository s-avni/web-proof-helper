export interface GetLineTestsOptions {
    isOverReals?: boolean;
}
export const getLineTests = async (lines: string[], {
    isOverReals = true
} = {}): Promise<string[]> => {
    const results: string[] = [];
    // We need at least two lines to run valiadtions of equivalency
    if (lines.length <= 1) {
        return results;
    }
    let baseLine = lines[0]
    for (let i = 1; i < lines.length; i += 1) {
        // Get the next line to check for equivalency
        const nextLine = lines[i].trim();
        if (!nextLine) {
            // Skip empty line
            results.push("")
            continue;
        }
        const linesToCompare = [baseLine, nextLine];
        console.log({ linesToCompare });
        // Format the step to check for the server
        const step = linesToCompare.join('\n');
        console.log({ step });
        try {
            // The server expects to get the data in form format
            const formData = new FormData();
            formData.append('txt', step);
            formData.append("over_reals", isOverReals ? "true" : "false");

            // Get the response from the server
            const res = await fetch('/validate', {
                method: 'POST',
                body: formData
            });

            // Parse the response frmo the server
            const resJson = await res.json();
            results.push((resJson && resJson.result) || "");
        } catch (err) {
            // Display errors
            console.error(err);
            results.push(`${err}`);
        }
        // Use the next line as a baseline for the next equivalency comparison
        baseLine = nextLine;
    }
    console.log({ results });
    return results;
}