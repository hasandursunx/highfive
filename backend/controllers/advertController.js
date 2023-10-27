
import Advert from "../models/advertModel.js"


//Tek ilan
const getAAdvertPage = async (req,res) => {

    const advert = await Advert.findById({_id: req.params.id}).populate("user")

    const inFavorite = res.locals.user.favorites.some((favorite)=>{
        return favorite.equals(advert._id)
    })

    try {
        res.status(200).render('advert',{
            advert,
            inFavorite
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

//Tüm ilanlar
const getAllAdvertsPage = async (req,res) => {
    try {
        const token = req.cookies.jwt
        if(token){
            const adverts = await Advert.find({user: {$ne: res.locals.user._id}}).populate("user").sort({_id: -1})
            res.status(200).render('adverts',{
                adverts
            })
        }else{
            const adverts = await Advert.find({}).populate("user").sort({_id: -1})
            res.status(200).render('adverts',{
                adverts
            })
        }
        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


//Hasan Dursun Gereksinimler---------------------------------------------

//Arama 
const advertSearch = async (req,res) => {
    try {

        let {searchAdvert} = req.body

        const searchAdvertRegExp = new RegExp(searchAdvert, "ig") 

        

        const adverts = await Advert.find({ title: { $regex: searchAdvertRegExp } } ).populate("user")

        res.render('adverts',{
            adverts
        })

        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
            err: "hata"
        })
    }
}

//Filtreleme
const advertFilter = async (req,res) => {
    try {


        const {categoryFilter,roleFilter,price_typeFilter,minPriceFilter,maxPriceFilter} =  await req.body


        

        const token = req.cookies.jwt
        if(token) {
            const adverts = await Advert.find({ $and:
                [
                    {category:categoryFilter},
                    {role:roleFilter},
                    {price_type:price_typeFilter},
                    {price_unit : { $gt :  minPriceFilter, $lt : maxPriceFilter}} ,
                    {ObjectId : {$ne :res.locals.user._id } } 
                ]
            }).populate("user")
            res.render('adverts',{
                adverts
            })
        }else{
            const adverts = await Advert.find({ $and:
                [
                    {category:categoryFilter},
                    {role:roleFilter},
                    {price_type:price_typeFilter},
                    {price_unit : { $gt :  minPriceFilter, $lt : maxPriceFilter}}
                ]
            }).populate("user")
            res.render('adverts',{
                adverts
            })
        }

        

        /* res.json({
            adverts
        }) */
        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

export {
    getAllAdvertsPage,
    getAAdvertPage,
    advertSearch,
    advertFilter
}