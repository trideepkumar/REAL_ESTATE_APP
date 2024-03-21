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
