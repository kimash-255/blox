import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import LinkSelect from "./LinkSelect"; // Import LinkSelect component

const DocForm = forwardRef(({ config, initialData, onSubmit }, ref) => {
  const [formData, setFormData] = useState(initialData || {});
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current.requestSubmit();
    },
  }));

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="p-2 space-y-6">
      <div className="bg-white border border-4 my-8 p-8 rounded-lg shadow relative">
        <div className="grid grid-cols-6 gap-6">
          {config.fields.map((field, index) => (
            <div key={index} className="col-span-6 sm:col-span-3">
              <label
                htmlFor={field.data}
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                {field.title}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.data}
                  name={field.data}
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-4"
                  placeholder={field.title}
                  required={field.required}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={formData[field.data] || ""}
                ></textarea>
              ) : field.type === "select" ? (
                <select
                  id={field.data}
                  name={field.data}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  required={field.required}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={formData[field.data] || ""}
                >
                  <option key={-1} value="">
                    Select {field.title}
                  </option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "linkselect" ? (
                <LinkSelect
                  name={field.data}
                  handleChange={handleInputChange}
                  endpoint={field.endpoint} // Ensure 'endpoint' is part of field config
                  placeholder={`Select ${field.title}`}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.data}
                  name={field.data}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder={field.title}
                  required={field.required}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={formData[field.data] || ""}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
});

export default DocForm;
