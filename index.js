const contactsOperations = require("./contacts");
const { Command } = require("commander");
//===================================================================================//
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;
    //===================================================================================//
    case "get":
      const contact = await contactsOperations.getContactById(id);

      if (!contact) {
        console.error(`\x1B[31m Contact with id: "${id}" not found`);
        break;
      }

      console.log(contact);
      break;
    //===================================================================================//
    case "remove":
      const removedContact = await contactsOperations.removeContact(id);

      if (!removedContact) {
        console.log(`\x1B[31m Contact with id: "${id}" not found`);
        break;
      }

      console.log(removedContact);
      break;
    //===================================================================================//
    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );

      if (!newContact) {
        console.log(`\x1B[31m ${name} alreay in the list`);
        break;
      }

      console.log(newContact);
      break;
    //===================================================================================//
    default:
      console.warn(`\x1B[31m "${action}" Unknown action type!`);
      break;
  }
};

invokeAction(argv);
