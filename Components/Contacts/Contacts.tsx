import React from "react";
import { CONTACTS_GROUP_NAME } from "../../Constants";
import { Container } from "../UI/shared";
import { Spinner } from "../UI/Spinner";
import { useContacts } from "./hooks/useContacts";
import { ListView } from "./UI/ListView";

export const Contacts = () => {
  const { contacts, isLoading } = useContacts();

  return (
    <Container>
      <Info />
      {!isLoading ? <ListView contacts={contacts} /> : <Spinner />}
    </Container>
  );
};

const Info = () => {
  return (
    <div className="alert alert-info">
     Lorem IPSUM ... <i>{CONTACTS_GROUP_NAME}</i>
    </div>
  );
};
