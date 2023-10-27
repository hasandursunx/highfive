import Advert from "../models/advertModel.js"
import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import Offer from "../models/offerModel.js"
import bcrypt from 'bcrypt'


// SAYFALAR (GETPAGE) ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//Profil 
const getProfilePage = (req,res) =>{
    res.render('profile')
}
//Profil Düzenle
const getUpdateProfilePage = async (req,res) =>{
    const user = await User.findById(res.locals.user._id)
    res.render('updateProfile',{
        user
    })
}
//Şifre düzenle 
const getUpdatePasswordPage = (req,res) =>{
    res.render('updatePassword')
}



// İlan Ekle
const getCreateAdvertPage= (req,res) =>{
    res.render('createAdvert')
}
// İlan Güncelleme
const getUpdateAdvertPage = async (req,res) =>{
    const advert = await Advert.findById({_id: req.params.id})
    //res.render('favorites')
    res.render('updateAdvert',{
        advert,
    })
}
//İlanlarım
const getAllMyAdvertsPage = async (req,res) => {

    const adverts = await Advert.find({user: res.locals.user._id})
    res.render('myadverts',{
        adverts
    })

}


//Teklif Ekle 
const getCreateOfferPage = async (req,res) =>{
    const advert = await Advert.findById({_id:req.params.id})
    const ownerId = advert.user._id
    res.render('createOffer',{
        advert,
        ownerId
    })

}
//Tekliflerim
const getOffersPage = async (req,res) =>{
    const offers = await Offer.find({user: res.locals.user._id}).populate(['advert','owner']).sort( { _id: -1 })
    res.render('offers',{
        offers
    })
}

//Sipariş ekle 
const getCreateOrderPage = async (req,res) =>{
    const advert = await Advert.findById({_id:req.params.id})
    const ownerId = advert.user._id
    res.render('createOrder',{
        advert,
        ownerId
        
    })
}


// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//Leyli Hudayberdiyeva Gereksinimleri ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//Profil Güncelle (Gereksinim)
const updateProfile = async (req,res) => {
    try {  
            const user = await User.findById(res.locals.user._id)

            const updateProfile = await User.findByIdAndUpdate(
                {_id: user._id},
                req.body,
                {new:true}
                )
            res.redirect("/profile")

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
//Şifre Güncelle (Gereksinim)
const updatePassword = async (req,res) => {
    try {  

        
        //kullanıcının şifresi
        const { password , newPasswordFirst,newPasswordSecond } =   req.body
        const user = await User.findById({_id: res.locals.user._id})

        //kullanıcının eski şifresi (FORM)
        
        console.log(password,user.password);

        let same ;
        same = await bcrypt.compare(password, user.password);

        if(same){

            if(newPasswordFirst == newPasswordSecond){

                
                
                const salt = await bcrypt.genSalt(10)
                const password = await bcrypt.hash(newPasswordFirst,salt)


                const userPassword = await User.findByIdAndUpdate(
                    {_id: user._id},
                    {password: password},
                    {new:true}
                    )
                res.status(400).redirect('/login')
                
            }
            else{
                res.json({
                    Mesaj : "Şifreler uyuşmuyor"
                })
            }
            
        }else{
            res.json({
                Mesaj : "Eski şifre yanlış"
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
} 
//Favori Ekle (Gereksinim)
const favorite = async (req,res) =>{
    try {
        
            let user = await User.findByIdAndUpdate(
                {
                    _id: res.locals.user._id
                },
                {
                    $push: {favorites: req.params.id }
                },
                {new:true}
            )

            res.status(200).redirect(`/adverts/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
//Favoriler (Gereksinim)
const getFavoritesPage  = async (req,res) =>{
    const user = await User.findById({_id: res.locals.user._id}).populate("favorites")

    console.log(user)
    //res.render('favorites')
    res.render('favorites',{
        user,
    })
}
//Favori Sil (Değil)
const unfavorite = async (req,res) =>{
    try {
            let user = await User.findByIdAndUpdate(
                {
                    _id: res.locals.user._id
                },
                {
                    $pull: {favorites: req.params.id}
                },
                {new:true}
            )
            res.status(200).redirect(`/adverts/${req.params.id}`)


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        
    }
}




//Hasan Dursun Gereksinimleri ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//İlan oluştur
const createAdvert = async (req,res)=>{

    try {
        //veritabanına yazma işlemi zaman alır
        const advert = await Advert.create({
            role: req.body.role,
            category: req.body.category,
            title: req.body.title,
            detail_short: req.body.detail_short,
            detail_long: req.body.detail_long,
            price_type: req.body.price_type,
            price_unit: req.body.price_unit,
            user: res.locals.user
        })
        res.redirect('/profile/myadverts')

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
//İlan Sil
const deleteAdvert = async (req,res) => {
    try {  
        const advert = await Advert.findById(req.params.id)

        await Advert.findOneAndRemove({_id:req.params.id})

        res.status(200).redirect('/profile/myadverts')

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
//İlan Güncelle (Değil)
const updateAdvert = async (req,res) => {
    try {  
        const advert = await Advert.findById(req.params.id)
        
            advert.role = req.body.role,
            advert.category = req.body.category,
            advert.title = req.body.title,
            advert.detail_short = req.body.detail_short,
            advert.detail_long = req.body.detail_long,
            advert.price_type = req.body.price_type,
            advert.price_unit = req.body.price_unit

            advert.save()

            res.status(200).redirect(`/profile/myadverts/`)
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
// Sipariş Ekle 
const createOrder = async (req,res)=>{

    try {
        //veritabanına yazma işlemi zaman alır
        const advertOwner = await Advert.findById({_id: req.params.id})
        const userOwner = await User.findById({_id: req.params.ownerId})

        console.log(userOwner);
        
        const order = await Order.create({
            title: req.body.title,
            description: req.body.description,
            price_unit_count: req.body.price_unit_count,
            user: res.locals.user,
            advert: advertOwner,
            owner : userOwner
        })
        res.redirect('/profile/orders')

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
//Siparişlerim
const getOrdersPage = async (req,res) =>{
    const orders = await Order.find({user: res.locals.user._id}).populate(['advert','owner']).sort( { _id: -1 })
    res.render('orders',{
        orders
    })
}
//Sipariş Detay 
const getOrderDetailPage = async (req,res) =>{
    const order = await Order.findById({_id: req.params.id}).populate(['advert','owner']).sort( { _id: -1 })
    res.render('orderDetail',{
        order
    })
}

//Teklif Ekle
const createOffer = async (req,res)=>{

    try {
        //veritabanına yazma işlemi zaman alır
        const advertOwner = await Advert.findById({_id: req.params.id})
        const offerOwner = await User.findById({_id: req.params.ownerId})

        console.log("cccccc:",req.body.title);
        

        const offer = await Offer.create({
            title: req.body.title,
            description: req.body.description,
            price_type: req.body.price_type,
            price_unit: req.body.price_unit,
            price_unit_count: req.body.price_unit_count,
            user: res.locals.user,
            advert: advertOwner,
            owner : offerOwner
        })
        res.redirect('/profile/offers')

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}




export {
    
    deleteAdvert,
    updateProfile,
    updatePassword,
    getFavoritesPage,
    favorite,
    unfavorite,
    updateAdvert,
    
    createAdvert,
    createOrder,
    createOffer,


    getUpdatePasswordPage,
    getUpdateAdvertPage,
    getCreateOrderPage,
    getOrderDetailPage,
    getCreateOfferPage,
    getAllMyAdvertsPage,
    getProfilePage,
    getCreateAdvertPage,
    getOffersPage,
    getOrdersPage,
    getUpdateProfilePage,


}