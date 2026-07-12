/* WDromi 
 * Compatibile con Dromi v1.1.x
 */

import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.mjs";
const pyodide = await loadPyodide();

async function runDromi(code, out = "console") {
    // Funzioni non supportate
    const unsupported = [
        "h1(",
        "h2(",
        "h3(",
        "h4(",
        "p(",
        "button(",
        "imputer(",
        "clear(",
        "update(",
        "set_window_size(",
        "set_window_title(",
        "run(",
        "dr.init("
    ];

    for (const func of unsupported) {
        if (code.includes(func)) {
            console.error("Unsupported Dromi Window function in out");
            return;
        }
    }

    try {
        const output = await pyodide.runPythonAsync(code);

        if (out === "console") {
            console.log(output);
        } else {
            const element = document.querySelector(out);

            if (!element) {
                console.error("Elemento non trovato:", out);
                return;
            }

            element.textContent = output;
        }
    } catch (err) {
        console.error(err);
    }
}

export { runDromi };
