"use client";
import { useActionState, useState } from 'react';
import React from 'react';
import { Input} from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { fromSchema } from '@/lib/validation';
import {z} from 'zod';
import { createRecipe } from '@/lib/actions';
import { useRouter } from "next/navigation";
import { FormAlert } from './FormAlert';

const RecipeForm = () => {
  const [errors, setErrors] = useState([]);
  const [ingredients, setIngredients] = useState();
  const [steps, setSteps] = useState();  
  const router = useRouter();
  const [error, setError] = useState(false)
  var zodError = [];
  const handleFormSubmit = async (prevState, formData) => {
    try{
      const cookingTimeNum = parseInt(formData.get("cookingTime"))
      console.log("cooking time: "+cookingTimeNum);
      const formValues = {
        recipe: formData.get("title"),
        description: formData.get("description"),
        image_link: formData.get("link"),
        cookingTime: cookingTimeNum,
        ingredients,
        steps,
      };

      await fromSchema.parseAsync(formValues);

      const result = await createRecipe(prevState, formData, cookingTimeNum, ingredients, steps);

      if (result.status == "SUCCESS"){
        router.push(`/recipes/${result._id}`);
      }
      return result;
    } catch (error) {
        if(error instanceof z.ZodError){
            setError(true)
            console.log(error)
            zodError = JSON.parse(error)
            console.log(zodError)
            setErrors(zodError)
            return {...prevState, error: "Validation failed", status: "ERROR"}
        }
        return {
            ...prevState,
            error: "An unexpected error has occured",
            status: "Error",
        };
    }
  };
  
  const [state, formAction, isPending] = useActionState(handleFormSubmit,{
      error:"",
      status:"Initial",
     });

 
  return (
    <form action={formAction}>
       {error && <FormAlert errors={errors}/>}
        <div className='m-10 p-5'>
            <label htmlFor="title" className='m-2 font-heading text-xl'>New Recipe</label>
            <Input id="title" name="title" required placeholder="Recipe" className="border-2 border-black rounded-3xl p-5 m-2"/>
            {errors.title && <p className="text-3xl">{errors.title}</p>}
        </div>

        <div className='m-10 p-5'>
            <label htmlFor="description" className='m-2 font-heading text-xl'>Description</label>
            <Textarea id="description" name="description" required placeholder="Description" className="border-2 border-black rounded-3xl p-5 m-2"/>
            {errors.description && <p>{errors.description}</p>}
        </div>

        <div className='m-10 p-5'>
            <label htmlFor="link" className='m-2 font-heading text-xl'>Image Url</label>
            <Input id="link" name="link" required placeholder="Image Url" className="border-2 border-black rounded-3xl p-5 m-2"/>
            {errors.link && <p>{errors.link}</p>}
        </div>

        <div className='m-10 p-5'>
            <label htmlFor="cookingTime" className='m-2 font-heading text-xl'>Cooking Time</label>
            <Input id="cookingTime" name="cookingTime" required placeholder="Cooking time in minutes" className="border-2 border-black rounded-3xl p-5 m-2"/>
            {errors.cookingTime && <p>{errors.cookingTime}</p>}
        </div>


        <div className='m-10 p-5' data-color-mode="light">
            <label htmlFor="ingredients" className='m-2 font-heading text-xl'>Ingredients</label>
            <MDEditor 
            value={ingredients} 
            onChange={(value) => setIngredients(value)} 
            className="border-2 border-black mt-2" 
            id="ingredients"   
            textareaProps={{
                placeholder:"Ingredients."
            }}
            previewOptions={{
                disallowedElements:["style"],
            }}
            />
            {errors.ingredients && <p>{errors.ingredients}</p>}
        </div>

        <div className='m-10 p-5' data-color-mode="light">
            <label htmlFor="steps" className='m-2 font-heading text-xl'>Steps</label>
            <MDEditor 
            value={steps} 
            onChange={(value) => setSteps(value)} 
            className="border-2 border-black mt-2" 
            id="steps"   
            textareaProps={{
                placeholder:"Steps for cooking."
            }}
            previewOptions={{
                disallowedElements:["style"],
            }}
            />
            {errors.steps && <p>{errors.steps}</p>}
        </div>

        <div className='flex flex-row-reverse'>
            <Button type="submit" className="m-10 p-2 " disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit your recipe'}
                <Send className="size-5 m-2"></Send>
            </Button>
        </div>    
    </form>
  );
}

export default RecipeForm;