import React, { useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Stepper, Step } from 'react-form-stepper';
import { InboxOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone'
import { useFormik } from 'formik';
import { LiaRupeeSignSolid } from "react-icons/lia";
import * as Yup from 'yup';
import PriceInput from '../Components/PriceInput';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getprodCategories } from '../features/ProductCategory/prodCatSlice';
import { getColors } from '../features/color/colorSlice';
import { Multiselect } from 'react-widgets';
import "react-widgets/styles.css";
import { IoFolderOpenOutline } from "react-icons/io5";
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



const AddProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step,setStep] = useState(1);
    const [colour,setColour] = useState([])
    const [check,setCheck] = useState(false);
    const [images,setImages] = useState([]);
    const [tag,setTag] = useState([]);
    const [formData,setFormData] = useState({})

    useEffect(()=>{
        async function func(){
            await dispatch(getBrands());
            
            await dispatch(getprodCategories());
            
            await dispatch(getColors());

            formik.values.color=colour;
        
        }
        func();
    },[colour])

        const imageState = useSelector((state)=>state.upload.images);
        const brandState = useSelector((state)=>state.brand.brands)
        const catState = useSelector((state)=>state.prodCategory.prodCategories)
        const colorState = useSelector((state)=>state.color.colors);
        const colors = [];
        const tagData = ["Featured","Special","Popular","None"]

        colorState?.length>0 && colorState.forEach(i=>{
            colors.push({
                _id:i._id,
                color:i.color
            })
        })

        // useEffect(()=>{
        //     setImages(imageState);
        // },[imageState])

        const handleDeleteImg = (name) => {
            setImages(prevImages => {
              const imgs=  prevImages.filter(img => img.name !== name);
              return imgs
            });
          };

        

        let schema =  Yup.object({
            title: Yup.string().required('Title is Required'),
            category: Yup.string().required('Please select a Category'),
            brand: Yup.string().required('Please select a Brand'),
            price: Yup.number().required("Required").min(1, 'Price cannot be 0'),
            quantity: Yup.number().required("Required").min(1,'At least one is required'),
            description:Yup.string().required('Description is Required'),
            color:Yup.array()
            .min(1, 'pick at least one items')
            .of(
              Yup.object().shape({
                color: Yup.string().required(),
                _id: Yup.string().required(),
              })
            ),
            tags:Yup.array()
          })
        
          const formik = useFormik({
            initialValues: {
              title: "",
              category:'',
              quantity:'',
              brand:'',
              price:'',
              description:'',
              color:[],
              tags:[]
            },
            validationSchema:schema,
            onSubmit: values => {
                formik.values.tags = tag;
                setFormData(values)
                setStep(2);
            },
          });


          const  handleUpload = async()=>{
            const response = await dispatch(uploadImg(images));
            // console.log(response.payload);

            const imgs = response.payload;
            let newImgs = []

            for(let i=0;i<imgs.length;i++){
               
                newImgs.push({
                    public_id:imgs[i].public_id,
                    url:imgs[i].url
                })
            }
            
            setImages(newImgs)
            setStep(3);
        }
       
        const handleFinish = async()=>{
            formData.images = images
            await dispatch(createProducts(formData));
            formik.resetForm();
            setColour([]);
            setTag([]);
            setTimeout(()=>{
                navigate("/admin/product-list")
            },3000)
        }

        const newProduct = useSelector((state)=>state.product);
        const {isSuccess,isError,isLoading,createdProduct }= newProduct;

        useEffect(()=>{

            if(isSuccess && createdProduct){
                toast.success("Created Product Successfully")
            }
            if(isError){
                toast.error("Error Creating Product, Please Try Again after Sometime")
            }

        },[isSuccess,isError,isLoading,createdProduct])

       

  return (
    <div className='lg:p-5 md:p-3'>
      <h3 className="mb-4 text-center text-xl font-bold">Add Product</h3>
      <div className=''>
        <Stepper
            activeStep={step}
            >
                <Step onClick={()=>{setStep(1)}} label='Add Product Details' />
                <Step onClick={()=>{setStep(2)}} label='Upload Images' />
                <Step onClick={()=>{setStep(3)}} label='Finish' />
            </Stepper>
            
        
        {step===1 && (
            <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="title" 
                    label='Enter Product Name' 
                    onCh={formik.handleChange("title")}
                    // onBl={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.title}</p></div>
                ) : null}
            </div>
            <div className='mb-5 flex flex-col gap-2'>
                <select className='w-full p-3' 
                   id='category'
                    name="category" 
                    label='Enter Product Name' 
                    onChange={formik.handleChange("category")}
                    
                    value={formik.values.category}
                >
                    <option className='w-full' value="">Select Product Category</option>
                    {catState?.length>0 && catState.map((ct,i)=>{
                        return <option key={i} value={ct.title}>{ct.title}</option>
                    })}
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.category}</p></div>
                ) : null}

            </div>
            <div className='mb-5'>
            <Multiselect
                dataKey="id"
                textField="color"
                containerClassName='bg-white flex'
                data={colors}
                placeholder='Select Colors'
                onChange={(e)=>{setColour(e)}}
                />
                {formik.touched.color && formik.errors.color ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.color}</p></div>
                ) : null}
            </div>
            <div className='mb-5 flex flex-col gap-2'>
                <select className='w-full p-3'
                     id='brand'
                     name="brand" 
                     label='Select brand Name' 
                     onChange={formik.handleChange("brand")}
                     value={formik.values.brand}
                     onBlur={formik.handleBlur("brand")}
                 >
                    <option className='' value="">Select Brand</option>
                    {brandState?.length>0 ? brandState.map((b,i)=>{
                        return(
                            <option key={i} value={b.title}>{b.title}</option>

                        )
                    }):null}
                </select>

                {formik.touched.brand && formik.errors.brand ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.brand}</p></div>
                ) : null}
            </div>


            <div className='mb-5'>
            <Multiselect
                dataKey="id"
                textField="tags"
                containerClassName='bg-white flex'
                data={tagData}
                placeholder='Select Tags'
                onChange={(e)=>{setTag(e)}}
                />
                {formik.touched.tags && formik.errors.tags ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.tags}</p></div>
                ) : null}
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
                <div>
                    <PriceInput
                    id='price'
                    label="Price:"
                    placeholder="Price"
                    name="price" 
                    icon={<LiaRupeeSignSolid />}
                    onCh={formik.handleChange("price")}
                    onBl={formik.handleBlur("price")}
                    value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.price}</p></div>
                     ) : null}
                </div>
                <div>
                    <PriceInput
                    id='quantity'
                    label="Quantity:"
                    placeholder="Quantity"
                    name="quantity" 
                    icon={"Qt."}
                    onCh={formik.handleChange("quantity")}
                    value={formik.values.quantity}
                    onBl={formik.handleBlur("quantity")}
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.quantity}</p></div>
                     ) : null}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <ReactQuill 
                theme="snow" 
                style={{backgroundColor:"white"}}
                name="description"
                onChange={formik.handleChange("description")}
                // onBlur={formik.handleBlur("description")} 
                value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.description}</p></div>
                ) : null}
            </div>
            <div>
                <button type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>Add Product</button>
            </div>
        </form>
        )}

        {step===2 && (
            <div className='flex justify-center flex-col gap-6 items-center'>
                <div className='bg-white flex items-center justify-center h-64  w-full'>


                        <Dropzone onDrop={acceptedFiles => setImages(prevImages => [...prevImages, ...acceptedFiles])}>
                        {({getRootProps, getInputProps}) => (
                            <section className='w-full h-full'>
                            <div {...getRootProps()}
                            className='flex w-full h-full flex-col items-center justify-center'
                            >
                                <input {...getInputProps()} />
                                    <IoFolderOpenOutline className='text-6xl text-gray-500' />
                                <p className='text-gray-500'>Drag and drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                        </Dropzone>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='bg-gray-100 grid grid-cols-3 md:grid-cols-5 max-h-96 gap-5'>
                        {images?.length>0 ? images.map((img,i)=>(
                            <div className='relative' key={i}>
                                <button 
                                onClick={()=>{handleDeleteImg(img.name)}}
                                className="text-gray-900 absolute p-0 right-0 top-0 hover:text-gray-500 border-0 hover:border-none focus:outline-none">
                                <svg className="w-5 md:w-4 md:h-5 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.414 10l3.293-3.293a1 1 0 1 0-1.414-1.414L10 8.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10z" clipRule="evenodd"></path>
                                </svg>
                                {/* <span className="sr-only">Close</span> */}
                            </button>
                                <p>{img.name}</p>
                            </div>
                        )):null}
                    </div>

                    <div className='mt-4'>
                        <button onClick={handleUpload} type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>Upload</button>
                    </div>
                </div>
            </div>
        )}

        {step===3 && (
          <div className='flex mt-8 items-start p-4 flex-col'>
              <div className='flex justify-center gap-4 items-start'>
                <input className='mt-1  h-5 w-9' type="checkbox" value={check} onClick={()=>{setCheck(!check)}} />
                <label>I declare that i agree with the Terms and Conditions of the owner organisation and I comply with them. I also declare that all the provoded information is corrected and any problems associated will be my responsibility alone.</label>
            </div>

                <div className='p-5'>
                  <button onClick={check ? handleFinish : ()=>{console.log("dfghjk");}}  className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>Finish</button>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default AddProduct
