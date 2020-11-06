import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment';
import {genid} from '../utils/genid';
import { getSession } from 'next-auth/client'
import Datetime from 'react-datetime'
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
 export default function FormPage({session}){
     return (
    <Formik
    initialValues={{
        name: session.user.name,
        image:"",
        productname: "",
        price:"",
        per:"",
        dateFrom:"",
        dateTo:""
      }}
    validationSchema={Yup.object().shape({
      price: Yup.number().moreThan(0, "Age must be greater than 0"),
      productname: Yup.string().trim().required("Name can not be empty")
    })}
    onSubmit={(values) => {
        console.log(values)
        const res =fetch('http://47.94.194.104:3001/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: genid(session.user.name),
          productname: values.productname,
          price: values.price,
          per:values.per,
          name: values.name,
          image:values.image,
          dateFrom:values.dateFrom,
          dateTo:values.dateTo
        })
      })
      }}
    render={props =>
        <form onSubmit={props.handleSubmit}>
            <h1>成功创建商品</h1>
          <div className="content">
          <div>
              <label>productname： </label><input type="text" id="productname" name="productname" value={props.values.productname}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.productname && props.errors.productname && <div>{props.errors.productname}</div>}
            </div>
            <div>
              <label>price： </label><input type="text" id="price" name="price" value={props.values.price}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.price && props.errors.price && <div>{props.errors.price}</div>}
            </div>
            <div>
              <label>单位： </label><input type="text" id="per" name="per" value={props.values.per}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.per && props.errors.per && <div>{props.errors.per}</div>}
            </div>
            <div>
              <label>imageurl： </label><input type="text" id="image" name="image" value={props.values.image}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.image && props.errors.image && <div>{props.errors.image}</div>}
            <img src={props.values.image}></img>
            </div>
            <p>商品起始时间</p>
            <Datetime
    id="dateFrom"
    name="dateFrom"
    placeholder="Enter date"
    value={props.dateFrom}
    onChange={(dateFromValue) => {props.setFieldValue('dateFrom', formatDate(dateFromValue))}}
    onBlur={props.onBlur}
    isInvalid={!!props.errors.dateFrom}
/>
<p>商品结束时间</p>
            <Datetime
    id="dateTo"
    name="dateTo"
    placeholder="Enter date"
    value={props.dateFrom}
    onChange={(dateToValue) => {props.setFieldValue('dateTo', formatDate(dateToValue))}}
    onBlur={props.onBlur}
    isInvalid={!!props.errors.dateTo}
/>
            <div className="submit-area">
              <button type="submit">提交</button>
            </div>
          </div>
        </form>
      }

//......
 />
     )
 }

 export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: {
        session
      }
    }
  }
  