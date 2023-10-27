import User from "../models/userModel.js"
import Advert from "../models/advertModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Kullanıcı Ekle
const createUser = async (req,res)=>{

    try {
        //veritabanına yazma işlemi zaman alır
        const user = await User.create(req.body)
        res.redirect('/login')
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

// Kullanıcı Giriş
const loginUser = async (req,res)=>{

    try {
        const { username, password } =  req.body

        console.log('req.body', req.body)

        const user = await User.findOne({username})

        console.log(user)

        let same = false;

        if(user){
            same = await bcrypt.compare(password, user.password);
            console.log('same', same);
        } else{
            return res.status(401).json( {
                succeeded: false,
                error:'Kullanıcı bulunamadı'
            })
        }
        if(same){

            const token = createToken(user._id)
            res.cookie("jwt",token, {
                httpOnly: true,
                maxAge: 1000*60*60*24
            })

            res.redirect('/profile')
        } else{
            res.status(401).json({
                succeeded: false,
                error:'Şifre eşleşmedi'
            });
        }
       
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

//token işlemi
const createToken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "1d"
    })
}

//Kullanıcı Profilleri
const getAUserPage = async (req,res) => {

    const user = await User.findById({_id: req.params.id})
    const adverts = await Advert.find({user: user._id})
    
    try {
        res.status(200).render('user',{
            user,
            adverts
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}

export {getAUserPage, loginUser, createUser}