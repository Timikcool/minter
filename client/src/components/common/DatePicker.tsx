import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './assets/datepicker.css';

const CustomDatePicker = (props) => {
    return <DatePicker {...props} />
}

export default CustomDatePicker