import { defineQuery } from "next-sanity";

export const RECIPE_QUERY = defineQuery(`
*[_type == "recipe" && defined(slug.current) && !defined($search) || title match $search || chef->name match $search] | order(_createdAt desc)
{
  _id, 
  title,
  slug,
  _createdAt,
  chef ->{
    _id, name, image, bio
  },
  views, 
  image,
  cookingTime, 
}`);

export const RECIPE_DETAILS = defineQuery(`
  *[_type == "recipe" && _id==$id][0]{
  _id, 
  title,
  _createdAt,
  slug,
  chef ->{
    _id, name, image, bio
  },
  views, 
  description,
  image,
  cookingTime,
  ingredients,
  steps 
}
  `)

export const RECIPE_VIEWS = defineQuery(`
  *[_type == "recipe" && _id == $id][0]{
    _id, views
  }
  `)  

export const CHEF_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "chef" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
  `)  

export const GET_USER__ID = defineQuery(`
  *[_type == "chef" && id==$id][0]{
  _id 
    }
  `)  