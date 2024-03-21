import Listing from "../models/Listing.js"

export const createList = async (req, res) => {
    try {
        const listing = await Listing.create(req.body)
         return res.status(200).json(listing)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }

}

export const deleteList = async (req, res) => {
    console.log("deleting list")
    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json('List Deleted Successfully!');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateList = async(req,res) =>{
    const list = await Listing.findById(req.params.id)
    if(!list){
        return res.status(404).json('List not found !')
    }
    if(req.user.id !== list.userRef){
        return res.status(401).json('You can update your Listing only!')
    }
    try{
         const updateList = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
         )
         res.status(200).json(updateList)
    }catch(err){
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getListing = async(req,res) =>{
    try{
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return res.status(404).json('List not found!')
        }
        res.status(200).json(listing)
    }catch(err){
        console.log(err)
    }
}
