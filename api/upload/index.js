const axios = require("axios");

module.exports = async function (context, req) {
    context.log("Upload ontvangen door Azure Function");

    // Bestand uitlezen
    const file = req.body;
    if (!file) {
        context.res = {
            status: 400,
            body: "Geen bestand ontvangen."
        };
        return;
    }

    try {
        // GPT‑6 Astra API‑aanroep
        const response = await axios.post(
            "https://api.foundry.microsoft.com/models/gpt-6-astra/invoke",
            {
                input: "Verwerk dit bestand en geef een duidelijke output terug.",
                file: file
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.FOUNDRY_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Resultaat terug naar jouw website
        context.res = {
            status: 200,
            body: response.data
        };

    } catch (error) {
        context.log("Fout bij Astra:", error);

        context.res = {
            status: 500,
            body: "Er ging iets mis bij het verwerken via GPT‑6 Astra."
        };
    }
};
