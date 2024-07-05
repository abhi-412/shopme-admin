import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../Components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Stepper, Step } from 'react-form-stepper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getblCategories } from '../features/blogCategory/blCatSlice';
import Dropzone from 'react-dropzone';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { uploadImg } from '../features/upload/uploadSlice';
import { createBlog, getBlog, getBlogs, resetState, updateBlog } from '../features/blog/blogSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







const AddBlog = () => {
    const [step,setStep] = useState(1);
    const [formData,setFormData] = useState({})
    const [images,setImages] = useState([]);

    const dispatch = useDispatch();

    const location = useLocation();
    const id = location.pathname.split("/")[3];

    useEffect(()=>{
      async function func(){
          await dispatch(getblCategories());
      }
      func();
  },[])

  const shouldFetchBlog = useRef(true);
  useEffect(() => {
    if (shouldFetchBlog.current) {
      shouldFetchBlog.current = false;
      if (id !== undefined) {
        dispatch(getBlog(id))
        .then((response) => {
          if(response.payload){
            const blog = response.payload;
            const {title,description,category} = blog.blog
            formik.setFieldValue('title', title);
            formik.setFieldValue('category', category);
            formik.setFieldValue('description', description);
            setImages(blog?.blog?.images)
            console.log(blog);
            console.log(images);
          }
        })
        .catch((error) => {
          console.log(error);
        }).finally(()=>{shouldFetchBlog.current = true;})
      }
    }else{
      formik.resetForm();
      setImages([]);
      dispatch(resetState());
    }
  }, [id]);



  const catState = useSelector((state)=>state.blCat.blCategories);
    const [check,setCheck] = useState(false);

    const handleDeleteImg = (name) => {
      setImages(prevImages => {
        const imgs=prevImages.filter(img => img.name !== name);
        return imgs
      });
    };

    let schema =  Yup.object({
      title: Yup.string().required('Title is Required'),
      category: Yup.string().required('Please select a Category'),
      description:Yup.string().required('Description is Required'),
    })
  
    const formik = useFormik({
      initialValues: {
        title: "",
        category:'',
        description:'',
      },
      validationSchema:schema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
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
      const data = {id,values:formData}
      if(id !== undefined){
        await dispatch(updateBlog(data));
        setTimeout(()=>{
          dispatch(resetState())
          dispatch(getBlogs());
        },1000)
      }else{
        await dispatch(createBlog(formData));
        setTimeout(()=>{ 
          dispatch(resetState());
        },1000)
      }
      setTimeout(()=>{
        formik.resetForm();
      setImages([]);
      },1000)
  }

  const navigate = useNavigate();
   
  const newBlog = useSelector((state)=>state.blog)
  console.log(newBlog);
  const {isSuccess,isError,isLoading,createdBlog,updatedBlog}= newBlog;

  useEffect(()=>{

    if(isSuccess && createdBlog?.newBlog?._id){
        toast.success("Created Blog Successfully")
      navigate("/admin/blog-list")
      dispatch(getBlogs())

    }
    if(isSuccess && updatedBlog?.updatedBlog?._id){
      toast.success("Updated Blog Successfully")
      navigate("/admin/blog-list")
      dispatch(getBlogs())

  }
    if(isError){
        toast.error("Error Creating Brand, Please Try Again after some time")
        setStep(1);
    }

},[isSuccess,isError,isLoading,updatedBlog,createdBlog])


  return (
    <div className='lg:p-5 md:p-3'>
      <h3 className="mb-4 text-center text-xl font-bold">{id !== undefined ? "Update Blog" : "Add Blog"}</h3>
      <div className=''>
        <Stepper
            activeStep={step}
            >
                <Step onClick={()=>{setStep(1)}} label='Add Blog Details' />
                <Step onClick={()=>{setStep(2)}} label='Upload Images' />
                <Step onClick={()=>{setStep(3)}} label='Finish' />
            </Stepper>
            
        
        {step===1 && (
            <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
                <CustomInput 
                    type='text' 
                    name="title" 
                    label='Enter Blog Name' 
                    onCh={formik.handleChange("title")}
                    onBl={formik.handleBlur("title")}
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
                    <option className='w-full' value="">Select Blog Category</option>
                    {catState?.length>0 && catState.map((ct,i)=>{
                        return <option key={i} value={ct.title}>{ct.title}</option>
                    })}
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div><p className='text-sm text-red-400'>{formik.errors.category}</p></div>
                ) : null}

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
                <button type='submit' className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>Add Blog</button>
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
                                    onClick={()=>{handleDeleteImg(`${img.name ? img.name : img.public_id}`)}}
                                    className="text-gray-900 absolute p-0 -right-20 top-0 hover:text-gray-500 border-0 hover:border-none focus:outline-none">
                                    <svg className="w-5 md:w-4 md:h-5 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.414 10l3.293-3.293a1 1 0 1 0-1.414-1.414L10 8.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10z" clipRule="evenodd"></path>
                                    </svg>
                                    {/* <span className="sr-only">Close</span> */}
                                </button>
                                    <p>{`${img.name ? img.name : img.public_id}`}</p>
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
                  <button type='submit' onClick={handleFinish} disabled={!check} className='bg-blue-600 py-2 px-3 text-gray-200 font-semibold hover:border-green-800 hover:bg-blue-800 hover:text-white'>Finish</button>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default AddBlog
