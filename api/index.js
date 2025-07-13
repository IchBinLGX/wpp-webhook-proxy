export default function handler(req, res) {
  const VERIFY_TOKEN = "token1954"; // seu token

  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send();
    }
  } else if (req.method === "POST") {
    fetch("https://hook.us2.make.com/3uxhngvjt6aeeximqoxxapee9nqvhcku", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send());
  } else {
    res.status(405).send();
  }
}
