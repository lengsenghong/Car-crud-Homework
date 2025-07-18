
import FetchCar from '@/lib/api'
import React from 'react'
import DisplayProductComponent from "@/components/Display";
import {Car} from "../../lib/types";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Car Shop",
    description: "This is car show all product",
    keywords: ["car", "discount", "modern", "luxeri", "web development"],
    authors: [{ name: "Marta Full Stack" }],
    creator: "Matra",
    openGraph: {
        title: "Car Show page",
        description: "Car Shop website that you can explore and order",
        url: "",
        siteName: "Car Shop",
        images: [
            {
                url: "https://imgs.search.brave.com/SVYEabTzcQSVZWQl9wiH3bdeXk-0I0RnY3H21gex6sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGlw/YXJ0LWxpYnJhcnku/Y29tL25ld19nYWxs/ZXJ5LzEyMS0xMjE3/NjA4X3Nwb3J0cy1j/YXItY2xpcGFydC1j/YXItY2xpcGFydC13/aXRob3V0LWJhY2tn/cm91bmQucG5n",
                width: 1200,
                height: 630,
                alt: "Car Rental Open Graph Image",
            },
        ],
    },
};
const ProductPage = async () => {
    const  data:Car[] = await FetchCar(0.5)
    console.log(data)
    return (
        <div>
            {/* <SWRComponent/> */}
            <DisplayProductComponent tagline={'Latest Updates'} heading={'New Comming'} description={'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.'} buttonText={'View all cars'} buttonUrl={''} posts={data}/>
        </div>
    )
}

export default ProductPage
