export interface GetLineTestsOptions {
    isOverReals?: boolean;
}
export const getLineTests = async (lines: string[], {
    isOverReals = true
} = {}) => {
    const results: string[] = [];
    if (lines.length <= 1) {
        return results;
    }
    for (let i = 0; i < lines.length - 1; i += 1) {
        const desired_lines = lines.slice(i, i + 2).filter((entry) => entry.trim() !== '');
        console.log({ desired_lines });
        if (desired_lines.length !== 2) {
            continue;
        }
        const step = desired_lines.join('\n');
        console.log({ step });
        try {
            const formData = new FormData();
            formData.append('txt', step);
            formData.append("over_reals", isOverReals ? "true" : "false");

            const res = await fetch('/validate', {
                method: 'POST', //the method to use. GET or POST
                body: formData
            });

            const resJson = await res.json();
            results.push((resJson && resJson.result) || "");
        } catch (err) {
            console.error(err);
            results.push(`${err}`);
        }
    }
    console.log({ results });
    return results;
}