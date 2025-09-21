import {defineType} from "sanity";

export const recipe = defineType({
    name: 'recipe',
    title: 'Recipe',
    type: 'document',
    fields:[
        {
            name: 'title',
            type: 'string'
        },
        {    
            name : 'slug',
            options:{
                source:'title'
            },
            type : 'slug'
        },
        {    
            name: 'chef',
            type: 'reference',
            to: [{type:'chef'}]            
        },
        {   
            name: 'views',
            type: 'number'
        },
        {    
            name: 'description',
            type: 'string'
        },
        {    
            name: 'image',
            type: 'url'
        },
        {
            name: 'cookingTime',
            type: 'number'
        },
        {
            name: 'ingredients',
            type: 'markdown'
        },
        {    
            name: 'steps',
            type: 'markdown'   
        }
    ],
});