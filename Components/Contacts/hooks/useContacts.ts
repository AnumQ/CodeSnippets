import _ from "lodash";
import { useEffect, useState } from "react";
import { CONTACTS_GROUP_NAME } from "../../../Constants";
import { useLoading } from "../../../Hooks/useLoading";
import { Contact } from "../../../Models/Contact";
import { AccountService } from "../../../Services/AccountService";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    AccountService.getContactsByGroup(CONTACTS_GROUP_NAME, (data) => {
      const dataWithoutDuplicates = _.uniqBy(data, (c) => {
        return c.contactId;
      });
      setContacts(dataWithoutDuplicates);
      setIsLoading(false);
    });
  }, []);

  return { contacts, isLoading };
};
