import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useInvoice } from "../../../Hooks/useInvoice";
import { Project } from "../../../Models/Project";
import _ from "lodash";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useProjects } from "../../../Hooks/useProjects";
import { DEBUG } from "../../../Constants";

export const ProjectsDropDown = ({
  defaultSelected,
  onSelectProject,
  setContactOnProjectChange = false,
}: {
  defaultSelected: Project[];
  onSelectProject?: (project: Project | null) => void;
  setContactOnProjectChange?: boolean;
}) => {
  const { projects } = useProjects();
  const { invoice, setProjectId } = useInvoice();

  return (
    <>
      <Form.Group>
        <Form.Label>
          <b>Velg Prosjekt</b>
        </Form.Label>
        <Typeahead
          id="projects-list"
          options={projects}
          defaultSelected={defaultSelected}
          labelKey={(option) =>
            DEBUG ? `${option.name} [${option.projectId}]` : `${option.name}`
          }
          placeholder="Velg/Søk i prosjekter"
          onChange={(selectedProjects: Project[]) => {
            if (onSelectProject) {
              onSelectProject(
                selectedProjects.length > 0 ? selectedProjects[0] : null
              );
            } else {
              if (invoice) {
                setProjectId(selectedProjects, setContactOnProjectChange);
              }
            }
          }}
        />
      </Form.Group>
    </>
  );
};
