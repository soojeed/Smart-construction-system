import { Request, Response } from "express";
import {Iproject, Iupdate} from "../types/Project"
import { prisma } from "../lib/prisma";
import { stat } from "node:fs";
import { AuthRequest } from "../types/AuthRequest";


export const ProjectCreate =  async (req:AuthRequest, res:Response) =>{
    try{
       const data : Iproject = req.body;

       const createProject = await prisma.project.create({
       data:{
        projectName : data.projectName,
        location: data.location,
        totalBudget : data.totalBudget,
        startDate : data.startDate,
        managerId : req.userId
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


export const updateProject = async (req:Request, res:Response) => {
    try{
       const {id}= req.params;

       if(!id ||isNaN(Number(id)) ){
        res.status(400).json({
            isSucces: false,
            message: "Invalid Id Number!"
        });
        return
       }

       const {status} = req.body;
       if(!status || status == " ON_HOLD"){
        res.status(400).json({
            isSucces: false,
            message : "Please Choose filled Valid Status"
        });
        return
       }

    //    const projectid = await prisma.project.findUnique({
    //     where :{
    //         id : Number(id)
    //     },
    //     include :{
    //     projecti : true

    //     }
    //    })



    }catch(error){
        res.status(500).json({
            isSuccess: false,
            message : " Internal Server error!"
        })
    }
}