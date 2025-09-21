import { fromatDate } from "@/lib/utils";
import { Binoculars } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecipeCard = ({ post }) => {
  const {
    _id,
    _createdAt,
    views,
    image,
    title,
    cookingTime,
  } = post;
  return (
    <li className="border-black border-2 rounded-2xl p-2 m-2">
      <div className="flex flex-row justify-between font-secondary-heading">
        <p>{fromatDate(_createdAt)}</p>
        <div className="flex flex-row">
          <Binoculars className="size-6 text-primary mx-2" />
          <span>{views}</span>
        </div>
      </div>
      <div className="flex flex-col p-2 m-2">
        <div className="flex flex-row justify-items-center m-2">
          <img className="w-[150px] h-[100px]" src={image}></img>
        </div>
        <div className="flex flex-col mt-2 justify-items-center w-full h-[50px]">
          <Link href={`/recipes/${_id}`}>
            <p className="font-heading">{title}</p>
          </Link>
        </div>
        <div className="flex flex-row justfiy-items-center mt-10 relative">
            <p className="font-secondary-heading">Cooking Time: <span className="mx-2">{cookingTime}</span>mins</p>
        </div>
      </div>
    </li>
  );
};

export default RecipeCard;
