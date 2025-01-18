"use client";

import { useCreateProductMutation, useGetProductsQuery, useCreateReviewMutation } from "@/state/api";
import { PlusCircleIcon, SearchIcon, DockIcon } from "lucide-react";
import { useState } from "react"
import Header from "@/app/(components)/Header"
import Rating from "@/app/(components)/Rating"
import CreateProductModel from "./CreateProductModel";
import CreateReviewModel from "./CreateReviewModel";

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

type ReviewFormData = {
    productId: string;
    rating: number;
    review: string;
}

const Products = () => {
    const [searchItem, setSearchItem] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const { data: products, isLoading, isError } = useGetProductsQuery(searchItem);

    const [createProduct] = useCreateProductMutation(); 
    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    }

    const [createReview] = useCreateReviewMutation(); 
    const handleCreateReview = async (reviewData: ReviewFormData) => {
        await createReview(reviewData);
    };

    if(isLoading){
        return <div className="py-4">Loaing...</div>
    }

    if(isError || !products){
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products
            </div>
        );
    }

  return (
    <div className="mx-auto pb-5 w-full">
        <div className="mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded">
                <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
                <input 
                    className="w-full py-2 px-4 rounded bg-white" 
                    placeholder="Search products..." 
                    value={searchItem} 
                    onChange={(e)=> setSearchItem(e.target.value)} 
                />
            </div>
        </div>

        <div className="flex justify-between items-center mb-6">
            <Header name="Products" />
            <button 
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                onClick={() => setIsModalCreateOpen(true)}
            >
                <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
                Create Product
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
            {
                isLoading ? (<div className="py-4">Loaing...</div>) : (
                    products?.map((product) => (
                        <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                            <div className="flex flex-col items-center">
                                img
                                <h3 className="text-lg text-gray-900 font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                                <div className="text-sm text-gray-600 mt-1">
                                    Stock: {product.stockQuantity}
                                </div>
                                {
                                    product.rating && (
                                        <div className="flex items-center mt-2">
                                            <Rating rating={product.rating} />
                                        </div>
                                    )
                                }
                                <button 
                                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded mt-3"
                                    onClick={() => {
                                        setSelectedProductId(product.productId);
                                        setIsModalReviewOpen(true);
                                    }}
                                >
                                    <DockIcon className="w-5 h-5 mr-2 !text-gray-200" />
                                    Review
                                </button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>

        <CreateProductModel 
            isOpen={isModalCreateOpen} 
            onClose={()=> setIsModalCreateOpen(false)} 
            onCreate={handleCreateProduct} 
        />

        <CreateReviewModel
            isOpen={isModalReviewOpen} 
            onClose={()=> setIsModalReviewOpen(false)} 
            productId={selectedProductId}
            onCreate={handleCreateReview} 
        />
        
    </div>
  )
}

export default Products
