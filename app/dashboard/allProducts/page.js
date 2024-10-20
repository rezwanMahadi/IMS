"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AllProducts() {
    const [Products, setAllProducts] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const id = toast.loading("Loading all products", {
            toastId: "1234abc",
            position: "top-right",
        });

        const fetchProduct = async () => {
            try {
                let res = await fetch("/api/allProducts");
                const all_products = await res.json();
                const a = JSON.parse(all_products.allProducts);

                console.log("response from fetchdata:", a);

                if (all_products.success === true) {
                    // clearInterval(intervalId);
                    toast.update(id, {
                        position: "top-right",
                        autoClose: 2000,
                        render: "All products updated.",
                        type: "success",
                        isLoading: false,
                        pauseOnHover: false,
                        hideProgressBar: true,
                        theme: "colored",
                    });
                    setAllProducts(all_products.allProducts); // Ensure the data is an array
                } else {
                    throw new Error("Product fetch failed!");
                }
            } catch (error) {
                toast.update(id, {
                    position: "top-right",
                    autoClose: 2000,
                    render: error.message,
                    type: "error",
                    isLoading: false,
                    pauseOnHover: false,
                    hideProgressBar: true,
                    theme: "colored",
                });
                console.error(error);
            }
        };
        const intervalId = setInterval(fetchProduct, 5000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div>
            <div className="bg-sky-300 w-full rounded-md h-16 flex items-center justify-center">
                <h1 className="text-blue-900 text-[30px]">All Products</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>RFID Tag</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Products.map(product => (
                        <TableRow key={product.tag}>
                            <TableCell>{product.tag}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ToastContainer />
        </div>
    );
}