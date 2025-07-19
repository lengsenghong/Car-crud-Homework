import { BlogType } from "@/lib/types";

export default function BlogComponent({ id, userId, title, body }: BlogType) {
  return (
    <article className="p-4 border rounded-lg shadow-sm space-y-3 bg-white">
      <header>
        <h2 className="text-lg font-semibold text-gray-800">Post #{id}</h2>
        <p className="text-sm text-gray-500">User ID: {userId}</p>
      </header>

      <section>
        <h3 className="text-md font-medium text-blue-700">Title: {title}</h3>
        <hr />
        <p className="text-gray-700 mt-2">{body}</p>
      </section>
    </article>
  );
}
