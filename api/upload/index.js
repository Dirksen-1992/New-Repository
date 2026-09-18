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
        // GPT‑6 Astra aanroepen via jouw Azure OpenAI endpoint
        const response = await axios.post(
            "https://openai-dbt.services.ai.azure.com/openai/v1/chat/completions",
            {
                model: "gpt-6-astra",
                messages: [
                    {
                        role: "system",
                        content: "Je bent een AI die bestanden verwerkt en duidelijke output teruggeeft."
                    },
                    {
                        role: "user",
                        content: `Verwerk dit bestand en geef een duidelijke samenvatting terug. Bestandsgrootte: ${file.length} bytes.`
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.FOUNDRY_KEY
                }
            }
        );

        // Resultaat terug naar jouw website
        context.res = {
            status: 200,
            body: response.data.choices[0].message.content
        };

    } catch (error) {
        context.log("Fout bij Astra:", error);

        context.res = {
            status: 500,
            body: "Er ging iets mis bij het verwerken via GPT‑6 Astra."
        };
    }
};
