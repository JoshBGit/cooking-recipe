import SearchForm from "@/components/SearchForm";
import RecipeCard from "@/components/RecipeCard";
import { RECIPE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "../../../auth";

export default async function Home({searchParams}) {
  const query =(await searchParams).query;
  const params = { search: query || null}

  const session = await auth();
  const { data: posts } = await sanityFetch({ query: RECIPE_QUERY , params});

  return (
    <>
      <main>
        <div className="p-6 flex-between bg-heading">
          <div className="md:text-2xl font-heading text-xl lg:text-2xl m-3">
            <h1>Welcome To Cooking Recipe Blog</h1>
          </div>
          <div className="md:text-xl text-lg lg:text-xl m-3 font-secondary-heading">
            <h1>Try existing recipes or post your own</h1>
          </div>
          <div>
            <SearchForm query={query} />
          </div>
        </div>
        <section>
          <p className="text-2xl p-6">
            {query ? `Search results for ${query}` : "All Recipes"}
          </p>
          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post) => <RecipeCard key={post?._id} post={post} />)
            ) : (
              <p className="px-5">No recipes found</p>
            )}
          </ul>
        </section>
      </main>
      <SanityLive />
    </>
  );
}
