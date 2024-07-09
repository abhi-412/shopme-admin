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
import { createProducts } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [colour, setColour] = useState([]);
    const [check, setCheck] = useState(false);
    const [tag, setTag] = useState([]);
    const [formData, setFormData] = useState({});
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        async function func() {
            await dispatch(getBrands());
            await dispatch(getprodCategories());
            await dispatch(getColors());
        }
        func();
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.prodCategory.prodCategories);
    const colorState = useSelector((state) => state.color.colors);
    const colors = colorState?.map((c) => ({ _id: c._id, color: c.color })) || [];
    const tagData = ["Featured", "Special", "Popular", "None"];


    const handleColor = (e)=>{
         setColour(e);
         formik.values.color = e;
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleUpload = () => {
        if (images.length === 0) return;
        setUploading(true);
        setUploadSuccess(false);
        setUploadError(null);

        const uploadPromises = images.map((image) => {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'mtwfulmt');

            return fetch('https://api.cloudinary.com/v1_1/dpfzp5539/image/upload', {
                method: 'POST',
                body: formData,
            }).then((response) => response.json());
        });

        Promise.all(uploadPromises)
            .then((results) => {
                const successfulUploads = results.filter((result) => result.secure_url);
                setUploadedImages((prevUploadedImages) => [
                    ...prevUploadedImages,
                    ...successfulUploads.map((result) => ({
                        url: result.secure_url,
                        public_id: result.public_id,
                        asset_id: result.asset_id,
                    })),
                ]);
                setUploadSuccess(true);
                setImages([]);
            })
            .catch((error) => {
                console.error('Upload error:', error);
                setUploadError('Error uploading images. Please try again.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const handleDeleteImg = (publicId) => {
        setUploadedImages((prevUploadedImages) =>
            prevUploadedImages.filter((img) => img.public_id !== publicId)
        );
    };

    const schema = Yup.object({
        title: Yup.string().required('Title is Required'),
        category: Yup.string().required('Please select a Category'),
        brand: Yup.string().required('Please select a Brand'),
        price: Yup.number().required("Required").min(1, 'Price cannot be 0'),
        quantity: Yup.number().required("Required").min(1, 'At least one is required'),
        description: Yup.string().required('Description is Required'),
        color: Yup.array().min(1, 'Pick at least one item').of(
            Yup.object().shape({
                color: Yup.string().required(),
                _id: Yup.string().required(),
            })
        ),
        tags: Yup.array()
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            category: '',
            quantity: '',
            brand: '',
            price: '',
            description: '',
            tags: [],
            color:[],
        },
        validationSchema: schema,
        onSubmit: values => {
            values.tags = tag;
            setFormData(values);
            setStep(2);
        },
    });

    const handleFinish = async () => {
        formData.images = uploadedImages;
        const productData =formData;
        await dispatch(createProducts(productData));
        formik.resetForm();
        setColour([]);
        setTag([]);
        setTimeout(() => {
            navigate("/admin/product-list");
        }, 3000);
    };

    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Created Product Successfully");
        }
        if (isError) {
            toast.error("Error Creating Product, Please Try Again after Sometime");
        }
    }, [isSuccess, isError, isLoading, createdProduct]);


const deleteImg = (img)=>{
    const newImages = images.filter((image)=>{
        return image.name !=img.name;
    })

    setImages(newImages)
    console.log(newImages)
}       

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
                onChange={(e)=>{handleColor(e)}}
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
            {step === 2 && (
                    <div className='flex flex-col  gap-5 justify-center items-center'>
                        <div className='flex flex-col gap-5 w-full justify-start items-center'>
                            <label className='text-center text-2xl font-semibold'>
                                Upload Product Images
                            </label>
                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="min-h-64 w-full cursor-pointer bg-white  rounded-md flex flex-col items-center justify-center gap-5  py-2 text-center"
                            >
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <p className='text-lg'>Drag and drop images here or click to select</p>
                            </div>
                            <div className='flex flext-col w-full'>
                                {images?.length > 0 && (
                              
                                <div className='flex flex-col gap-3'>
                                <div className='flex gap-5 flex-wrap'>
                                {images.map((img,i)=>{
                                    return <p key={i}>{img.name} <span className='cursor-pointer' onClick={()=>{deleteImg(img)}}>X</span></p>
                                })}
                                </div>
                                    <button
                                        onClick={handleUpload}
                                        className='mt-2 rounded-md bg-blue-500 w-fit py-2 px-4 text-white'
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Uploading...' : 'Upload Images'}
                                    </button>
                                    </div>
                                )}
                            </div>
                            {uploadError && <p className="text-red-500">{uploadError}</p>}
                            {uploadedImages.length > 0 && (
                                <div className='flex flex-wrap w-full gap-2'>
                                    {uploadedImages.map((img) => (
                                        <div className='relative w-28' key={img.public_id}>
                                            <button
                                                onClick={() => handleDeleteImg(img.public_id)}
                                                className='absolute right-1 top-0 z-10 rounded-full bg-red-600 px-2 py-1 text-white hover:bg-red-800'
                                            >
                                                x
                                            </button>
                                            <img src={img.url} alt="" className='h-24 w-full object-cover' />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='flex gap-5'>

                        <button
                            className='cursor-pointer rounded-md px-4 py-2 bg-red-500 text-white'
                            type="button"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                        <button
                            className='cursor-pointer rounded-md px-4 py-2 bg-green-500 text-white'
                            type="button"
                            onClick={() => setStep(3)}
                        >
                            Next
                        </button>
                        </div>
                    </div>
                )}
   

   {step === 3 && (
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-center text-xl font-bold'>Review & Finish</h4>
                        <p>Product Name: {formData.title}</p>
                        <p>Category: {formData.category}</p>
                        <p>Brand: {formData.brand}</p>
                        <p>Price: {formData.price}</p>
                        <p>Quantity: {formData.quantity}</p>
                        <p>Description: {formData.description}</p>
                        <p>Colors: {colour.map(c => c.color).join(', ')}</p>
                        <p>Tags: {tag.join(', ')}</p>
                        {uploadedImages.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                                {uploadedImages.map((img) => (
                                    <img key={img.public_id} src={img.url} alt="" className='h-24 w-24 object-cover' />
                                ))}
                            </div>
                        )}
                        <button
                            className='bg-primary/70 cursor-pointer rounded-md p-3 text-black'
                            type="button"
                            onClick={handleFinish}
                        >
                            Finish
                        </button>
                    </div>
                )}
      </div>
    </div>
  )
}

export default AddProduct
