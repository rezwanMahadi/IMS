'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
// import { useToast } from "@/components/hooks/use-toast"
// import { Toaster } from "@/components/ui/toaster";
let tagFetchStatus = true;
export default function addProduct() {
    const [rfidValue, setRfidValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    // let intervalId;

    function notifyError(message) {
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
        })
    };
    function notifySuccess(message) {
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
        })
    };

    // const myTimeout = setTimeout(myGreeting, 5000);
    // clearTimeout(myTimeout);


    const handleChange = (e) => {
        if (e.target.name == 'nameValue') {
            setNameValue(e.target.value)
        }
        else if (e.target.name == 'categoryValue') {
            setCategoryValue(e.target.value)
        }
        else if (e.target.name == 'quantityValue') {
            setQuantityValue(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rfidValue != '' && nameValue != '' && quantityValue != '' && categoryValue != '') {
            const id = toast.loading("Please wait...", {
                position: "top-center",
            })
            const data = {
                tag: rfidValue,
                productName: nameValue,
                quantity: quantityValue,
                category: categoryValue
            };
            console.log(data);
            let res = await fetch("http://localhost:3000/api/addProductData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let response = await res.json();
            if (response.success == true) {
                // notifySuccess("Product Added Successfully.");
                toast.update(id, {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000,
                    render: "Product Saved Successfully.",
                    type: "success",
                    isLoading: false,
                    theme: "colored",
                }
                );
            } else {
                notifyError("Error : Try again.")
            }
            console.log(response);
            setRfidValue('');
            setNameValue('');
            setCategoryValue('');
            setQuantityValue('');
        }
        else {
            toast.warn("All fields are required!", {
                position: "top-center",
                autoClose: 1300,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
            })
        }
    }
    useEffect(() => {
        if (rfidValue == '') {
            const id = toast.loading("Waiting for RFID Tag", {
                toastId: "1234567890",
                position: "top-center",
            })
            const fetchreceivedTag = async () => {

                let res = await fetch("http://localhost:3000/api/fetchtag", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const receivedTag = await res.json();
                console.log("response from fetchdata:", receivedTag);

                if (receivedTag.success == true) {
                    tagFetchStatus = false;
                    clearInterval(intervalId);
                    toast.update(id, {
                        position: "top-center",
                        autoClose: 2000,
                        render: "RFID Tag Received.",
                        type: "success",
                        isLoading: false,
                        pauseOnHover: false,
                        hideProgressBar: true,
                        theme: "colored",
                    }
                    );
                    setRfidValue(receivedTag.tag);
                } else {
                    // notifyError("Error: Tag Not Found");
                    console.error(receivedTag);
                }
            }
            const intervalId = setInterval(fetchreceivedTag, 10000);
        }
    }, [rfidValue]);


    // const intervalId = setInterval(fetchreceivedTag, 5000);

    // Set up polling to fetch data every 10 seconds


    return (
        <div className="h-full flex items-center ">
            {/* <Toaster/> */}
            <Card className="w-[350px] bg-indigo-50">
                <CardHeader>
                    <CardTitle>Add Product Information</CardTitle>
                    <CardDescription>Product information</CardDescription>
                    <div className="flex items-center bg-violet-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        <ShieldCheckIcon className="w-6 mr-3" />
                        <p>RFID Tag will be updated automatically.</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">RFID Tag</Label>
                                <Input type="text" value={rfidValue} name="rfidValue" readOnly placeholder="Tag will appear here automatic" className={`${rfidValue === '' ? 'bg-pink-200' : 'bg-green-200'}`} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nameValue">Product Name</Label>
                                <Input name="nameValue" id="nameValue" onChange={handleChange} value={nameValue} type="text" placeholder="Type product name" className="bg-white" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="categoryValue">Category</Label>
                                <Input name="categoryValue" id="categoryValue" onChange={handleChange} value={categoryValue} type="text" placeholder="Type product category" className="bg-white" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="quantityValue">Quantity</Label>
                                <Input name="quantityValue" id="quantityValue" onChange={handleChange} value={quantityValue} type="number" placeholder="Type quantity" className="bg-white" />
                            </div>
                            <div className="flex justify-center">
                                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );
}