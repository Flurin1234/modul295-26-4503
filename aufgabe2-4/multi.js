async function req() {
    try {
        const response = await fetch("https://httpbin.org/status/200", { method: "DELETE" })
            if (!response.ok) {
                throw new Error("geht nicht");
            }
            console.log("Erfolgreich!");
    }
    catch (reason) {
        console.error(`Fehler ${reason}`);
    }

    finally {
        console.log("Anfrage abgeschlossen");
    };
};

req();
