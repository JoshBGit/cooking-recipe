import {defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const chef = defineType({
    name: 'chef',
    title: 'Chef',
    type: 'document',
    icon: UserIcon,
    fields:[
        {
            name : 'id',
            type: 'number',
        },    
         {
           name : 'name',
           type: 'string'
        },
        {
            name: 'username',
            type: 'string'
        },
        {    
            name:'email',
            type: 'string'
        },
        {    
            name: 'image',
            type: 'url'
        },
        {    
            name: 'bio',
            type: 'string'
        }
    ],
    preview:{
        select:{
            title: "name",
        },
    },
});