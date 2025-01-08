import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { v4 } from 'uuid';
import Header from "@/app/(components)/Header"

type ReviewFormData = {
    productId: string;
    rating: number;
    review: string;
}

type CreateReviewModelProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: string | null;
    onCreate: ( formData: ReviewFormData) => void;
}

const CreateReviewModel = ({
    isOpen,
    onClose,
    productId ,
    onCreate,
}: CreateReviewModelProps) => {
    const [formData, setFormData] = useState({
        reviewId: v4(),
        productId: productId || "",
        rating: 0,
        review: ""
    });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            productId: productId || "",
        }));
    }, [productId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rating' ? parseFloat(value) : value,
        });
    };
    

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }

    if(!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700"
    const inputCssStyles = 'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md'
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-2'>
        <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <Header name='Create Review' /> 
            <form onSubmit={handleSubmit} className='mt-5'>

                <label htmlFor="review" className={labelCssStyles}>
                    Review
                </label>
                <textarea 
                    name="review"
                    placeholder="Review"
                    onChange={handleChange}
                    value={formData.review}
                    className={inputCssStyles}
                    required
                />

                <label htmlFor="rating" className={labelCssStyles}>
                    Rating
                </label>
                <input type="number" name="rating" placeholder='Rating'
                    onChange={handleChange}
                    value={formData.rating}
                    className={inputCssStyles}
                    required
                />

                <button 
                    type='submit' 
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                >
                    Create Review
                </button>
                
                <button 
                    type='button' 
                    className='ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500'
                    onClick={onClose}
                >
                    Cancel
                </button>

            </form>
        </div>
    </div>
  ) 
}

export default CreateReviewModel