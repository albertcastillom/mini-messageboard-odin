const { randomUUID } = require("node:crypto"); // for stable IDs

  const messages = [
  {
    id: randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


async function getMessages(req, res) {
     res.render("index", {title: "Mini Messageboard", messages });
}

async function getNewMessageForm(req, res) {
    res.render("new", {title: "New Message" });
}

async function postNewMessage(req, res){
     const user = (req.body.user || "").trim();
  const text = (req.body.text || "").trim();

  if (!user || !text) {
    return res.status(400).render("new", {
      title: "New Message",
      error: "Both fields are required.",
      user, text,
    });
  }

  messages.push({ id: randomUUID(), text, user, added: new Date() });
  res.redirect("/");
}

async function getMessageById(req, res) {
  const msg = messages.find(m => m.id === req.params.id);
  if (!msg) {
    return res.status(404).render("message", {
      title: "Message Not Found",
      message: null
    });
  }
  res.render("message", { title: "Message Details", message: msg });
}

module.exports = {
    getMessages,
    getNewMessageForm,
    postNewMessage,
    getMessageById
};