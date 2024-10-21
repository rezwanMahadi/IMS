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
import { Button } from "@/components/ui/button";
let flag = true;
let id;



export default function AllProducts() {
    const [Vehicles, setAllProducts] = useState([]); // Initialize as an empty array

    const handleClick = () => {
        const url = 'https://www.example.com'; // Replace with your desired URL
        window.open(url, '_blank');
    };

    useEffect(() => {
        if (flag == true) {
            id = toast.loading("Loading all vehicles", {
                toastId: "1234abc",
                position: "top-right",
            });
        }

        const fetchProduct = async () => {
            try {
                let res = await fetch("/api/fetchLocation", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const all_vehicles = await res.json();
                console.log("data without parse: ", all_vehicles)
                // const a = JSON.parse(all_products.allProducts);

                console.log("response from fetchdata:", all_vehicles);

                if (all_vehicles.success === true) {
                    // clearInterval(intervalId);
                    toast.update(id, {
                        position: "top-right",
                        autoClose: 2000,
                        render: "All vehicles updated.",
                        type: "success",
                        isLoading: false,
                        pauseOnHover: false,
                        hideProgressBar: true,
                        theme: "colored",
                    });
                    flag = false;
                    setAllProducts(all_vehicles.allVehicles); // Ensure the data is an array
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
                flag = false;
                console.error(error);
            }
        };
        const intervalId = setInterval(fetchProduct, 5000);

        return () => clearInterval(intervalId);
    }, [Vehicles]);


    return (
        <div>
            <div className="bg-sky-300 w-full rounded-md h-16 flex items-center justify-center">
                <h1 className="text-blue-900 text-[30px]">All Vehicles</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Registration Number</TableHead>
                        <TableHead>Chassis Number</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Vehicles.map(vehicle => (
                        <TableRow key={vehicle.reg_number}>
                            <TableCell>{vehicle.reg_number}</TableCell>
                            <TableCell>{vehicle.chassis_number}</TableCell>
                            <TableCell>{vehicle.lat}</TableCell>
                            <TableCell>{vehicle.long}</TableCell>
                            <TableCell>
                                <Button type="button" className="bg-blue-500 hover:bg-blue-600" onClick={() => {
                                    const url = `https://google.com/maps/place/${vehicle.lat},${vehicle.long}`;
                                    window.open(url, '_blank');
                                }}>Show on map</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ToastContainer />
        </div>
    );
}