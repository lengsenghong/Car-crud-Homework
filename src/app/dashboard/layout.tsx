import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";
import Error from "./error";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Car Shop",
    description: "This is blog page",
    keywords: ["product", "discount", "modern", "test", "web development"],
    authors: [{name: "Marta Full Stack"}],
    creator: "Matra",
    openGraph: {
        title: "Car Dashboard",
        description: "Car shop dashboard page",
        url: "",
        siteName: "Car Dashboard",
        images: [
            {
                url: "https://imgs.search.brave.com/SVYEabTzcQSVZWQl9wiH3bdeXk-0I0RnY3H21gex6sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGlw/YXJ0LWxpYnJhcnku/Y29tL25ld19nYWxs/ZXJ5LzEyMS0xMjE3/NjA4X3Nwb3J0cy1j/YXItY2xpcGFydC1j/YXItY2xpcGFydC13/aXRob3V0LWJhY2tn/cm91bmQucG5n",
                width: 1200,
                height: 630,
                alt: "Car Rental Open Graph Image",
            },
        ],
    },
}

export default function DashbaordLayout({
                                            children,
                                            // team,
                                            // user,
                                            create,
                                            delete_car,
                                            update,
                                        }: {
    children: React.ReactNode
    // team: React.ReactNode
    // user:React.ReactNode
    // login:React.ReactNode
    create: React.ReactNode
    delete_car: React.ReactNode
    update: React.ReactNode
}) {

    // const isLoggin = false;
    // if(!isLoggin){
    //     return login
    // }

    return (

        <div>
            {/* <Link href={'/dashboard'}> Dashboard </Link>
            <Link href={'/dashboard/settings'}>Setting Page</Link> */}
            <ErrorBoundary errorComponent={Error}>
                {children}
                {/* {team}
              {user}*/}
                {/* {create}  */}

                {create}
                {update}
                {delete_car}
            </ErrorBoundary>
        </div>
    )
}