import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../actions/product.action";
export default (props) => {}

const dispatch = useDispatch();
useEffect(() => {
    dispatch(productActions.Index());
  }, []);

  