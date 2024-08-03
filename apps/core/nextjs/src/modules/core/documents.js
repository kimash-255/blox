import {
  faBox,
  faInfoCircle,
  faNewspaper,
  faStoreSlash,
} from "@fortawesome/free-solid-svg-icons";

const commonFields = [
  {
    name: "ID",
    type: "text",
    id: "id",
    icon: faBox,
    bgColor: "green",
  },
  {
    name: "Module",
    type: "linkselect",
    id: "module",
    endpoint: "modules",
    icon: faBox,
    bgColor: "green",
  },
  {
    name: "Status",
    type: "select",
    id: "status",
    icon: faStoreSlash,
    options: [
      {
        label: "Active",
        value: "Active",
        style: "from-green-600 to-lime-400",
      },
      {
        label: "Disabled",
        value: "Disabled",
        style: "from-slate-600 to-slate-300",
      },
    ],
  },
  { name: "Name", type: "text", id: "name", icon: faNewspaper },
  {
    name: "Description",
    type: "textarea",
    id: "description",
    required: true,
    icon: faInfoCircle,
  },
];

// Filters for ListTable
export const documentFilters = {
  status: {
    type: "select",
    options: [
      { value: "", label: "All" },
      { value: "Active", label: "Active" },
      { value: "Disabled", label: "Disabled" },
    ],
  },
  name: {
    type: "text",
  },
  app: {
    type: "text",
  },
  module: {
    type: "text",
  },
  id: {
    type: "text",
  },
};

// Configurations for DocDetail
export const documentDetailConfig = {
  endpoint: "documents",
  customize: true,
  isList: true,
  fields: commonFields.filter((field) => field.name !== "ID"),
};

// Configurations for ListTable
export const documentListConfig = {
  name: "documents",
  customize: true,
  isList: true,
  fields: commonFields,
  data: [],
};

// Configurations for NewDoc
export const newdocumentConfig = {
  endpoint: "documents",
  name: "document",
  customize: true,
  isList: true,
  fields: commonFields.filter((field) => field.name !== "ID"),
  data: [],
};
