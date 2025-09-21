import { client } from '@/sanity/lib/client';
import { RECIPE_VIEWS } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import React from 'react';
import {after} from 'next/server';

const View = async ({id}) => {
  const {views: totalViews} = await client
    .withConfig({useCdn: false})
    .fetch(RECIPE_VIEWS, {id});

   after( 
    async () => 
    await writeClient
   .patch(id)
   .set({ views: totalViews + 1})
   .commit());

  return (
    <>
        Views: {totalViews}
    </>
  );
}

export default View;