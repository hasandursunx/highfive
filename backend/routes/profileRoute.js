import express from "express"
import * as profileController from "../controllers/profileController.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"


const router = express.Router()

//profile sayfası
router.route('/').get(authMiddleware.authenticateToken,profileController.getProfilePage)

//profile düzenleme sayfası 
router.route('/updateProfile').get(authMiddleware.authenticateToken,profileController.getUpdateProfilePage)

//profile düzenleme
router.route('/updateProfile').post(authMiddleware.authenticateToken,profileController.updateProfile)





//şifre düzenleme sayfası
router.route('/updatePassword').get(profileController.getUpdatePasswordPage)

//şifre düzenleme 
router.route('/updatePassword').put(profileController.updatePassword)





//ilanlarım sayfası
router.route('/myadverts').get(profileController.getAllMyAdvertsPage)

//ilan ekle sayfası 
router.route('/myadverts/createAdvert').get(profileController.getCreateAdvertPage)

//ilan ekle 
router.route('/myadverts/createAdvert').post(profileController.createAdvert)

//ilansil
router.route('/myadverts/:id').delete(profileController.deleteAdvert)

//ilan güncelle sayfası
router.route('/myadverts/:id').get(profileController.getUpdateAdvertPage)

//ilan güncelle
router.route('/myadverts/:id').put(profileController.updateAdvert)



//favorilerim sayfası 
router.route('/favorites').get(profileController.getFavoritesPage)
//favori ekle
router.route('/:id/favorite').put(profileController.favorite)
//favori sil
router.route('/:id/unfavorite').put(profileController.unfavorite)



//siparişler sayfası 
router.route('/orders').get(profileController.getOrdersPage)

//sipariş ekle sayfası
router.route('/orders/:id/:ownerId').get(profileController.getCreateOrderPage)

//sipariş ekle
router.route('/orders/:id/:ownerId').post(profileController.createOrder)

//sipariş detay sayfası
router.route('/order/detail/:id').get(profileController.getOrderDetailPage)




//tekliflerim sayfası
router.route('/offers').get(profileController.getOffersPage)

//teklif ekle sayfası
router.route('/offers/:id/:ownerId').get(profileController.getCreateOfferPage)

//teklif ekle
router.route('/offers/:id/:ownerId').post(profileController.createOffer)






export default router    
