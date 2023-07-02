import { Formik, Field, ErrorMessage, Form } from "formik";
import { string, object } from "yup";
import { toast } from "react-toastify";
import { useState } from "react";

import Loader from "../../shared/components/Loader/Loader";

import * as API from "../../shared/services/orders-api";

import css from "./ClientInfoForm.module.css";
import "react-toastify/dist/ReactToastify.css";

const schema = object({
  name: string()
    .min(2, "Min name`s length - two characters")
    .max(16, "Max name`s length - sixteen characters")
    .required("Enter a name"),
  phone: string("Phone must be numbers").required("Enter a phone"),
  email: string("Email mut be a string")
    .email("Invalid format")
    .required("Enter a email"),
  address: string("Address mut be a string").required("Enter a address"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const ClientInfoForm = ({ order, totalPrice }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      await API.sendOrder({
        ...values,
        order,
        totalPrice,
      });
    } catch (err) {
      toast.error("Oops, something went wrong. Try reloading the page", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <label className={css.label} htmlFor='name'>
            Name
          </label>
          <Field
            name='name'
            id='name'
            className={errors.name ? `${css.input} ${css.error}` : css.input}
          />
          <ErrorMessage name='name' component='p' className={css.errMessage} />

          <label className={css.label} htmlFor='email'>
            Email
          </label>
          <Field
            name='email'
            id='email'
            type='email'
            className={errors.email ? `${css.input} ${css.error}` : css.input}
          />
          <ErrorMessage name='email' component='p' className={css.errMessage} />

          <label className={css.label} htmlFor='phone'>
            Phone
          </label>
          <Field
            name='phone'
            id='phone'
            type='phone'
            className={errors.phone ? `${css.input} ${css.error}` : css.input}
          />
          <ErrorMessage name='phone' component='p' className={css.errMessage} />

          <label className={css.label} htmlFor='address'>
            Address
          </label>
          <Field
            name='address'
            id='address'
            className={errors.address ? `${css.input} ${css.error}` : css.input}
          />
          <ErrorMessage
            name='address'
            component='p'
            className={css.errMessage}
          />

          <button type='submit' className={css.btn}>
            Checkout
            {isLoading && <Loader width='15' color='#fff' />}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ClientInfoForm;
