import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"


export default async function handle(req, res){
    const {method}=req

    await mongooseConnect()
    // await isAdminRequest(req,res)
    
    
    if(method == 'GET'){
        
        const data=await Category.find({}).populate('parentCategory')
        
        res.send(data)
    }

   
}