
fetch("https://httpbin.org/status/403", { method: "DELETE" })
    .then((response) => {
        if (!response.ok) {
            throw new Error("geht nicht");
        }
        console.log("Erfolgreich!");
    })
    .catch((reason) => { console.error(`Fehler ${reason}`); })
    .finally(() => {
        console.log("Anfrage abgeschlossen");
    });