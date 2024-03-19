import Listing from "../models/Listing.js"

export const createList = async (req, res) => {
    try {
        console.log(req.body)
        const listing = await Listing.create(req.body)
         return res.status(200).json(listing)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }

}