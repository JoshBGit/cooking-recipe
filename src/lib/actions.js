"use server"

import slugify from "slugify";
import { auth } from "../../auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { GET_USER__ID } from "@/sanity/lib/queries";

export const createRecipe = async (
    state
    ,form
    ,cookingTimeNum
    ,ingredients
    ,steps
) => {
  const session = await auth();

  if(!session) 
    return parseServerActionResponse({
    error:'Not signed in', 
    status:'Error'
})
console.log("session : " + session);

const {title, description, link, cookingTime} = Object.fromEntries(
    Array.from(form).filter(([key])=>key !== 'steps' || 'ingredients' || 'cookingTimeNum'),
);

const slug = slugify(title,{lower: true, strict: true});
const sessionIdStr = (session?.id).toString();
const id = session?.id;
var userId = "";
var userIdStr = "";
var jsonObject ="";
async function getUser() {
     userId = await client.fetch(GET_USER__ID, {id});
     userIdStr = JSON.stringify(userId);
     jsonObject = JSON.parse(userIdStr)
     console.log("session id: " + jsonObject._id);
}


try {
   await getUser(); 
   const recipe = {
    title,
    slug:{
        _type: slug,
        current:slug
    },
    chef:{
      _type: "reference",
      _ref:  jsonObject._id
    },
    description,
    image: link,
    cookingTime:cookingTimeNum,
    ingredients,
    steps,
   };
   const result = await writeClient.create({_type: "recipe", ...recipe});
   return ({
    ...result,
    error: "",
    status: "SUCCESS"
   })
} catch(error){
    console.log(error);
    return parseServerActionResponse({
        error: JSON.stringify(error),
        status: "ERROR",
    });
}

}