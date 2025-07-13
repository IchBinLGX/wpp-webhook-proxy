export default function handler(req, res) {
  const VERIFY_TOKEN = "token1954"; // seu token

  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else if (req.method === "POST") {
    // Repassar evento ao Make
    fetch("https://hook.us2.make.com/3uxhngvjt6aeeximqoxxapee9nqvhcku", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
  } else {
    res.sendStatus(405);
  }
}
