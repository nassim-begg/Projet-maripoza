import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(/^0[5-7]\d{8}$/, "Phone number is not valid")
    .required("Required"),
  deliveryAddress: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
});

const FormComponent = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        deliveryAddress: "",
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-4">
          <h2 className="modal-title">Personal Information</h2>
          <Field
            name="firstName"
            placeholder="First Name"
            className="p-2 rounded border border-gray-300"
          />
          <ErrorMessage name="firstName" component="div" />
          <Field
            name="lastName"
            placeholder="Last Name"
            className="p-2 rounded border border-gray-300"
          />
          <ErrorMessage name="lastName" component="div" />
          <Field
            name="phoneNumber"
            placeholder="Phone Number"
            className="p-2 rounded border border-gray-300"
          />
          <ErrorMessage name="phoneNumber" component="div" />
          <Field
            name="deliveryAddress"
            placeholder="Delivery Address"
            className="p-2 rounded border border-gray-300"
          />
          <ErrorMessage name="deliveryAddress" component="div" />
          <Field
            name="email"
            type="email"
            placeholder="Email (Optional)"
            className="p-2 rounded border border-gray-300"
          />
          <ErrorMessage name="email" component="div" />
          <div className="flex justify-between">
            <button
              type="submit"
              className="p-2 rounded bg-orange-600 text-white hover:bg-orange-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
