module.exports = async function (context, req) {
    context.log("Upload ontvangen");

    const file = req.body;

    if (!file) {
        context.res = {
            status: 400,
            body: "Geen bestand ontvangen."
        };
        return;
    }

    // Hier komt straks jouw GPT‑6 Astra Logic App call
    // Voor nu sturen we een simpele bevestiging terug

    context.res = {
        status: 200,
        body: "Bestand ontvangen! Verwerking wordt later toegevoegd."
    };
};
