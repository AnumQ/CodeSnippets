import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { log } from "../../../consoleHelper";
import { useInvoice } from "../../../Hooks/useInvoice";
import { Contact } from "../../../Models/Contact";
import { useContacts } from "../../Contacts/hooks/useContacts";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";

/**
 * List contacts from group PortalGruppe from Accounting
 */
export const ContactsDropDownOffice = () => {
  const { invoice } = useInvoiceContext();
  const { contacts } = useContacts();
  const { setContact } = useInvoice();
  const [defaultContact, setDefaultContact] = useState<Contact[]>([]);

  useEffect(() => {
    if (invoice.customerId) {
      setDefaultContact(
        contacts.filter(
          (contact: Contact) => contact.contactId === invoice.customerId
        )
      );
    } else {
      setDefaultContact([]);
    }
  }, [invoice]);

  return (
    <>
      <Form>
        <Form.Group controlId="ListContact">
          <Form.Label>
            <b>Velg Kontakt</b>
          </Form.Label>
          <Typeahead
            id="contacts-list"
            options={contacts}
            selected={defaultContact}
            labelKey={(option: Contact) => `${option.name}`}
            placeholder="Velg/Søk i kontakter"
            onChange={(selectedContacts: Contact[]) => {
              const selectedContact =
                selectedContacts.length > 0 ? selectedContacts[0] : null;
              setContact(selectedContact);
            }}
          />
        </Form.Group>
      </Form>
    </>
  );
};
