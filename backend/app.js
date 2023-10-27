import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import cookieParser from "cookie-parser"
import pageRoute from './routes/pageRoute.js'
import methodOverride from 'method-override'
import advertRoute from './routes/advertRoute.js'
import profileRoute from './routes/profileRoute.js'
import userRoute from './routes/userRoute.js'
import {checkUser} from "./middlewares/authMiddleware.js"

//dotenv (.env) dosyasındaki çevre değişkenlerine erişim sağlıyor
dotenv.config()

//mongodb veritabanı bağlantısı
conn()
const app = express()
const PORT = process.env.PORT || 3000

//ejs template engine
app.set('view engine', 'ejs')

//statik dosyalar (middleware)
app.use(express.static('public'))
//sayfa üzerindeki json verilerin okumak için
app.use(express.json())
//bodyden gelen verileri okumak için
app.use(express.urlencoded({extended:true}))
//token'ı cookie'de tutmak için
app.use(cookieParser())
//put işlemi için 
app.use(
    methodOverride('_method',{
        methods: ['POST', 'GET']
    })
    )
//----------------------------------------------------------------------------------------------
app.use('*', checkUser)
app.use('/',pageRoute)
app.use('/adverts',advertRoute)
app.use('/profile',profileRoute)
app.use('/users',userRoute)


//------------------port---------------------------------------------------------------------------- ;
//server dinleme
app.listen(PORT ,() => {
    console.log("Server çalıştı");
})

