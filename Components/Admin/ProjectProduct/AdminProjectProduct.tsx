import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useProjects } from "../../../Hooks/useProjects";
import { Contact } from "../../../Models/Contact";
import { Product } from "../../../Models/Product";
import { Project } from "../../../Models/Project";
import { LoggerRepo } from "../../../Repositories/LoggerRepo";
import { ProductService } from "../../../Services/ProductService";
import { ProjectService } from "../../../Services/ProjectService";
import { sortProductByName } from "../../Products/utils";
import { FlexRow } from "../../UI/shared";

export const AdminProjectProduct = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>();
  const [pickUpItems, setPickUpItems] = useState<Contact[] | Product[]>([]);
  const [dropped, setDropped] = useState<Product[] | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { fetchProjects } = useProjects();

  useEffect(() => {
    fetchPickUpSectionData();
  }, []);

  useEffect(() => {
    setInitialData();
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject && dropped) {
      if (selectedProject.products !== dropped) {
        ProjectService.updateProject(
          selectedProject.projectId.toString(),
          { products: dropped },
          () => {
            fetchProjects();
          }
        );
      }
    }
  }, [dropped]);

  async function fetchPickUpSectionData() {
    const productData = await ProductService.getProducts();
    if (!productData) {
      return LoggerRepo.error(`Products: ${productData}`);
    }
    const sorted = sortProductByName(productData);
    setAllProducts(sorted);
    setPickUpItems(sorted);
  }

  const setInitialData = () => {
    if (selectedProject === null) {
      setDropped([]);
      setPickUpItems(allProducts);
    }
    if (selectedProject && selectedProject.products) {
      setDropped(selectedProject.products);
      let afterRemoved = pickUpItems as Product[];
      selectedProject.products.forEach((product) => {
        afterRemoved = _.reject(afterRemoved, product);
      });
      const sorted = sortProductByName(afterRemoved);
      setPickUpItems(sorted);
    }
  };

  return (
    <div>
      <ProjectsSelector
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <DndProvider backend={HTML5Backend}>
        <FlexRow>
          <DragAndDropWrapper
            project={selectedProject}
            itemType={ItemTypes.PRODUCT}
            pickUpItems={pickUpItems}
            setPickUpItems={setPickUpItems}
            dropOffItems={dropped}
            setDroppedItems={setDropped}
          />
        </FlexRow>
      </DndProvider>
    </div>
  );
};
