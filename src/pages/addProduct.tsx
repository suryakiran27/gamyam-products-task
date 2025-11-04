import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { addProduct, updateProduct } from '../features/products/productSlice';

type Inputs = {
    productName: string
    category: string
    price: number
    stock: number
    description: string
}
const AddProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const from = id ? 'edit' : 'add';
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.products)

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const payload = {
            id: id ? Number(id) : products.length + 1,
            name: data?.productName,
            price: Number(data?.price),
            category: data?.category,
            stock: Number(data?.stock),
            description: data?.description,
            createdAt: new Date().toDateString(),
            isActive: true,
        }
        if (from === "add") {
            // productsData.push(payload);
            dispatch(addProduct(payload))
        } else {
            dispatch(updateProduct(payload))
        }
        navigate('/')

    }

    // fetching product and setup product details
    useEffect(() => {
        if (from === "edit") {
            const product = products.filter((product) => product.id === Number(id))[0]
            setValue('productName', product?.name)
            setValue('category', product?.category)
            setValue('price', product?.price)
            setValue('stock', product?.stock)
            setValue('description', product?.description)
        }
    }, [id])

    return (
        <div>
            <div className="p-2 m-2 flex justify-end justify-items-center">
                <button className='back-btn  bg-black flex gap-2' onClick={() => navigate('/')}> <AiOutlineArrowLeft size={20} /> back</button>
            </div>
            <div className='border-shadow add-product-container'>
                <div className='p-5'>
                    <p className='text-2xl ms-5 font-bold'>{from === "add" ? "Add Prodcut " : "Edit Product"}</p>
                    <div className='m-5 flex gap-5'>
                        <div className=''>
                            <label htmlFor="" className=''>Product Name</label>
                            <div>
                                <input {...register('productName', { required: 'field is required' })} className='input-field' />
                            </div>
                            {errors.productName && <div className='error-msg'>{errors?.productName?.message}</div>}
                        </div>
                        <div className=''>
                            <label htmlFor="">Category</label>
                            <div>
                                <input className='input-field' {...register('category', { required: 'field is required' })} />
                            </div>
                            {errors.category && <div className='error-msg'>{errors?.category?.message}</div>}
                        </div>
                    </div>
                    <div className='m-5 flex gap-5'>
                        <div className=''>
                            <label htmlFor="">Price</label>
                            <div>
                                <input {...register('price', { required: "field is required" })} className='input-field' />
                            </div>
                            {errors.price && <div className='error-msg'>{errors?.price?.message}</div>}
                        </div>
                        <div className=''>
                            <label htmlFor="">Stock</label>
                            <div>
                                <input {...register('stock', { required: "field is required" })} className='input-field' />
                            </div>
                            {errors.stock && <div className='error-msg'>{errors?.stock?.message}</div>}
                        </div>
                    </div>
                    <div className='m-3 flex gap-5'>
                        <div className=''>
                            <label htmlFor="">Description</label>
                            <div>
                                <textarea {...register('description')} className='input-field text-area-field' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button onClick={handleSubmit(onSubmit)} className='button save-btn'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;