
import BlogComponent from "@/components/BlogComponent";
import {Metadata} from "next";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const metadata: Metadata = {
    title: "Car Shop",
    description: "This is blog per 1",
    keywords: ["product", "discount", "modern", "test", "web development"],
    authors: [{ name: "Marta Full Stack" }],
    creator: "Matra",
    openGraph: {
        title: "Car Blog",
        description: "Car shop website that you can explore and order",
        url: "",
        siteName: "Blog",
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


// fetchData
async function fetchData(params:number){
    const res = await
        fetch(`${BASE_URL}/${params}`);
    const dataRes = res.json();
    return dataRes;
}

export default async function Page({
                                       params
                                   }:{
    params:Promise<{id:number}>
}){
    const post = await fetchData((await params).id);
    return (
        <BlogComponent
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
        />
    )
}