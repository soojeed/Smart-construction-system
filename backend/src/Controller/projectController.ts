import { Request, Response } from "express";
import {Iproject} from "../../types/Project"
import { prisma } from "../lib/prisma";


export const ProjectCreate =  async (req:Request, res:Response) =>{
    try{
       const data : Iproject = req.body;

       const createProject = await prisma.project.create({
       data:{
        projectName : data.projectName,
        location: data.location,
        totalBudget : data.totalBudget,
        startDate : data.startDate
       }
       });

    //    if(!createProject){
    //     res.status(404).json({
    //       isSucces: false,
    //       message: "Project Not Found"
    //     });
    //    }

       res.status(201).json({
        isSucess: true,
        message:"Created Project Seccessfully!",
        createProject
       })


    }catch(error){
        console.error(error);
        res.status(500).json({isSucces: false, message:"Server Error!"})
    }
}