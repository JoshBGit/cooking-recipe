import RecipeForm from '@/components/RecipeForm';
import React from 'react';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();
  if(!session) redirect('/');
  return (
    <>
        <div className="p-6 flex-between bg-heading">
          <div className="md:text-2xl font-heading text-xl lg:text-2xl m-3">
            <h1>Your Recipe</h1>
          </div>
        </div>
        <RecipeForm />
    </>
  );
}

export default page;
