import {
  faBox,
  faInfoCircle,
  faNewspaper,
  faStoreSlash,
} from "@fortawesome/free-solid-svg-icons";

const commonFields = [
  {
    title: "ID",
    type: "text",
    data: "id",
    icon: faBox,
    bgColor: "green",
  },
  {
    title: "App",
    type: "linkselect",
    data: "app",
    endpoint: "apps",
    icon: faBox,
    bgColor: "green",
  },
  {
    title: "Status",
    type: "select",
    data: "status",
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
  { title: "Name", type: "text", data: "name", icon: faNewspaper },
  {
    title: "Description",
    type: "textarea",
    data: "description",
    required: true,
    icon: faInfoCircle,
  },
];

// Filters for ListTable
export const moduleFilters = {
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
  id: {
    type: "text",
  },
};

// Configurations for DocDetail
export const moduleDetailConfig = {
  endpoint: "modules",
  fields: commonFields.filter((field) => field.title !== "ID"),
};

// Configurations for ListTable
export const moduleListConfig = {
  title: "modules",
  fields: commonFields,
  data: [],
};

// Configurations for NewDoc
export const newModuleConfig = {
  endpoint: "modules",
  title: "module",
  fields: commonFields.filter((field) => field.title !== "ID"),
  data: [],
};
