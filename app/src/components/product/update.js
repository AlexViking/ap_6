import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../actions/product.action";
import { server } from "../../constants";
import Select from 'react-select'
export default (props) => {
    const dispatch = useDispatch();
    const [multiselect, setMultiselect] = useState([])
    const productReducer = useSelector(
        ({ productReducer }) => productReducer
    );
    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }
        const { id } = props.match.params;
        dispatch(productActions.getSingleProduct(id))
        // dispatch(productActions.clearState());

    }, []);
    useEffect(() => {
        if (productReducer.result) {
            let initial_image = { file_obj: '', image: productReducer.result.image }
            showPreviewImage(initial_image)

        }
    }, [productReducer])
    const showPreviewImage = (values) => {
        return (
            <img
                id="image"
                src={
                    values.file_obj != null
                        ? values.file_obj
                        : process.env.REACT_APP_PRODUCT_IMAGE_PATH + '/' + values.image
                }
                className="img-fluid"
                width={200}
            />
        );
    };
    const renderSelectwithSelected = () => {
        {
            console.log(productReducer.result)
            if (productReducer.result) {
                return (
                    <div className="form-group ">
                        <Select
                            name="pos_machines"
                            defaultValue={productReducer.result
                                ? productReducer.result.pos_machines.map(val => {
                                    return {
                                        'value': val._id,
                                        'label': val.alias
                                    }
                                }) : null}
                            onChange={setMultiselect}

                            isMulti
                            closeMenuOnSelect={false}
                            options={productReducer.options
                                ? productReducer.options : null}
                        />
                    </div>

                )
            } else {
                return null; // or loading graphic
            }
        }
    }
    const showForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
    }) => {
        return (
            <form role="form" onSubmit={handleSubmit}>
                <div className="card-body">
                    <input
                        type="hidden"
                        name="_id"
                        onChange={handleChange}
                        value={values._id}
                    />
                    <div className="form-group input-group has-feedback">
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            className="form-control"
                            placeholder="Product Name"
                            className={
                                errors.name && touched.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                        />
                        {/* <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-building"></span>
                            </div>
                        </div> */}
                        {errors.name && touched.name ? (
                            <small id="passwordHelp" className="text-danger">
                                {errors.name}
                            </small>
                        ) : null}
                    </div>
                    <div className="form-group input-group has-feedback">
                        <textarea
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
                        ></textarea>
                        {/* <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-building"></span>
                            </div>
                        </div> */}
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
                        {/* <div className="input-group-append col-3">
                            <div className="input-group-text">
                                <span className="fas fa-phone"></span>
                            </div>
                        </div> */}
                        {errors.stock && touched.stock ? (
                            <small id="passwordHelp" className="text-danger">
                                {errors.stock}
                            </small>
                        ) : null}
                    </div>
                    {renderSelectwithSelected()}
                    <div className="form-group ">
                        {showPreviewImage(values)}
                    </div>

                    <div className="form-group ">

                        <div className="input-group col-5">
                            <div className="custom-file">
                                <input type="file"
                                    onChange={e => {
                                        e.preventDefault();
                                        setFieldValue("image", e.target.files[0]); // for upload
                                        setFieldValue(
                                            "file_obj",
                                            URL.createObjectURL(e.target.files[0])
                                        ); // for preview image
                                    }} name="image"
                                    className={
                                        errors.image && touched.image
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    accept="image/*" id="exampleInputFile" />
                                <label className="custom-file-label" for="exampleInputFile">Choose Image</label>
                            </div>

                        </div>
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

                            <h1 className="m-0 text-dark">Update Product Data</h1>
                        </div>
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
            <div className="content">
                <div className="card card-primary">
                    <div className="card-header">

                    </div>


                    <Formik
                        enableReinitialize={true}
                        initialValues={
                            productReducer.result
                                ? productReducer.result
                                : { name: "", address: "" }
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            let formData = new FormData();
                            formData.append("id", productReducer.result._id);
                            formData.append("name", values.name);
                            formData.append("stock", values.stock);
                            formData.append("price", values.price);
                            let result = multiselect.map(arr => arr.value)
                            formData.append("pos_machines", result)
                            if (values.image) {
                                formData.append("image", values.image);
                            }
                            dispatch(productActions.Update(formData, props.history));
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
