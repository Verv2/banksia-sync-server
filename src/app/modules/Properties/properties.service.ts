import { Property } from "../ArthurApi/arthurApi.model";

const getPropertiesById = async (id: string) => {
  const result = await Property.findById(id);

  if (!result) {
    throw new Error("Property not found");
  }

  return result;
};

export const PropertiesService = {
  getPropertiesById,
};
