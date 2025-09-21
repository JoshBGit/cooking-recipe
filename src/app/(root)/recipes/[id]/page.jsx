import { client } from '@/sanity/lib/client';
import { RECIPE_DETAILS } from '@/sanity/lib/queries';
import React, { Suspense } from 'react';
import MarkdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/Views';

export const experimental_ppr = true;

const page = async ({params}) => {
  const id = (await params).id;
  const post = await client.fetch(RECIPE_DETAILS, { id});
  if(!post) return notFound()
  
  const md = MarkdownIt();
  const parsedContent = md.render(post?.steps || ' ');  
  return (
    <>
        <div className="p-6 flex-between bg-heading">
          <div className="md:text-2xl font-heading text-xl lg:text-2xl m-3">
            <h1>{post.title}</h1>
          </div>
        </div>
        <div className="mx-6 flex md:flex-row justify-start flex-col">
           <img className="w-[400px] p-2 h-[300px] md:border-e-2 md:border-b-2 md:border-black" src={post.image} alt={post.title}/>
           <div className="p-2 text-xl w-2/5 flex flex-col md:border-e-2 md:border-b-2 border-black">
            <p >{post.description}</p>
            <div className="flex flex-col p-2">
                <p className="font-secondary-heading">-by {post?.chef?.name}</p>
            </div>
            <div>
                <p className="mt-5 font-secondary-heading">Cooking Time: {post.cookingTime} mins</p>
            </div>
           </div>
           <div className="flex flex-col p-2 w-3/5 md:border-b-2 md:border-black">
               <p className='font-secondary-heading m-2 text-2xl'>Ingredients:</p>
               <p className='m-2 text-lg'> {post.ingredients}</p>
           </div>
        </div>
        <div className="m-10 p-2 items-start">
            <p className='3xl font-secondary-heading text-xl'>STEPS :</p>
            {parsedContent ? (
            <article dangerouslySetInnerHTML={{__html: parsedContent}} />
            ) : (
             <p>No Steps</p>
            )}   
        </div>
        <div className='fixed bottom-0 flex flex-row-reverse mb-2 px-7 w-full'>
            <Suspense fallback={<Skeleton/>}>
                <View id={id} />
            </Suspense>
        </div>    
    </>
  );
}

export default page;
