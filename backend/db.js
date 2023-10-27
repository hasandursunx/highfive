import mongoose from "mongoose"

const conn = () =>{
    mongoose.connect(process.env.DB_URL,{
        dbName: "highfive_backend",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Başarıyla veritabanına bağlandı.");
    }).catch((err)=>{
        console.log("Veri tabanı bağlantı hatası :",err);
    })
}

export default conn;
