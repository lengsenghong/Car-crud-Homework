import { BlogType } from "@/lib/types";

export default function BlogComponent(
    {
        id,
        userId,
        title,
        body
    }: BlogType
){
    return (
        <div className=" p-4 border
    rounded-lg">
            <h1>{id}</h1>
            <h1>UserId: {userId}</h1>
            <hr />
            <h2>Title: {title}</h2>
            <hr />
            <p>{body}</p>
        </div>
    )
}
