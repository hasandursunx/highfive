const getIndexPage = (req,res) =>{
    res.render('index')
}

const getRegisterPage = (req,res) =>{
    res.render('register')
}

const getLoginPage = (req,res) =>{
    res.render('login')
}

//çıkış yapma 
const getLogoutPage = (req,res) =>{
    res.cookie("jwt",'',{
        maxAge: 1
    })
    res.redirect("/")
}


export {
    getIndexPage,
    getRegisterPage,
    getLoginPage,
    getLogoutPage
}
