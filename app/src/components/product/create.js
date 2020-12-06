import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import * as productActions from "../../actions/product.action";
import { server } from "../../constants";

export default (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
  }, []);
  const showPreviewImage = (values) => {
    return (
      <img
        id="image"
        src={
          values.file_obj != null
            ? values.file_obj
            : "https://via.placeholder.com/200"
        }
        className="img-fluid"
        width={200}
      />
    );
  };
  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  }) => {
    return (
      <form role="form" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group ">{showPreviewImage(values)}</div>
          <div className="form-group ">
            <div className="input-group col-5">
              <div className="custom-file">
                {/* <label className="custom-file-label" for="exampleInputFile">
                  Choose Front Image
                </label> */}
                <input
                  type="file"
                  onChange={(e) => {
                    e.preventDefault();
                    setFieldValue("image", e.target.files[0]); // for upload
                    setFieldValue(
                      "file_obj",
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name="image"
                  className={
                    errors.image && touched.image
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  accept="image/*"
                  id="exampleInputFile"
                />
              </div>
            </div>
          </div>

          <div className="form-group input-group has-feedback">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
              className="form-control"
              placeholder="Name"
              className={
                errors.name && touched.name
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
          </div>
          <div className="form-group input-group has-feedback">
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={values.price}
              className="form-control"
              placeholder="Price"
              className={
                errors.price && touched.price
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            {errors.price && touched.price ? (
              <small id="passwordHelp" className="text-danger">
                {errors.price}
              </small>
            ) : null}
          </div>
          <div className="form-group input-group has-feedback">
            <input
              type="text"
              name="stock"
              onChange={handleChange}
              value={values.stock}
              className="form-control"
              placeholder="stock"
              className={
                errors.stock && touched.stock
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            {errors.stock && touched.stock ? (
              <small id="passwordHelp" className="text-danger">
                {errors.stock}
              </small>
            ) : null}
          </div>

          <div className="row">
            <div className="offset-md-4 col-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Create Product Data</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <div className="content">
        <div className="card card-primary">
          <div className="card-header"></div>

          <Formik
            initialValues={{
              name: "",
              address: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append("name", values.name);
              formData.append("stock", values.stock);
              formData.append("price", values.price);
              if (values.image) {
                formData.append("image", values.image);
              }
              dispatch(productActions.Create(formData, props.history));
              setSubmitting(false);
            }}
            // validationSchema={Create_Schema}
          >
            {/* {this.showForm()}            */}
            {(props) => showForm(props)}
          </Formik>
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};
