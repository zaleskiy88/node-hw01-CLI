const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
//===================================================================================//

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}
//===================================================================================//
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );

  if (!contact) {
    return null;
  }
  return contact;
}
//===================================================================================//
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const updatedContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return contacts[idx];
}
//===================================================================================//
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const formatedNamesArr = contacts.map((contact) => {
    return contact.name.toLowerCase();
  });

  if (formatedNamesArr.includes(name.toLowerCase())) {
    return null;
  }

  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
