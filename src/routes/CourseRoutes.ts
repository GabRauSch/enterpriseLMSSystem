import {Router} from 'express';
import * as CompanyController from '../controllers/CompanyController';
import * as CourseController from '../controllers/CourseController';
import * as ClassController from '../controllers/ClassController';
import * as QuestionsController from '../controllers/QuestionController';
import * as StatusController from '../controllers/StatusController';
import * as CommentsController from '../controllers/CommentsController';
import * as AuthController from '../controllers/AuthController';
import * as SubscriptionsController from '../controllers/SubscriptionController'

const router = Router()

router.post('/company', CompanyController.createCompany)
router.get('/company/:companyId', CompanyController.companyById);

router.get('/course/:courseId', CourseController.courseById)
router.post('/course', CourseController.createCourse)
router.get('/courses/companyAquisitions/:companyId', CourseController.companyAquisitions)
router.post('/courses/aquisition', CourseController.createAquisition)

router.get('/status/:classId/:userId', StatusController.getStatusByClass)
router.put('/status', StatusController.defineClassStatus) 

router.get('/class/:classId', ClassController.classById)
router.post('/class', ClassController.createClass) 
router.put('/class/title', ClassController.updateClassTitle) 
router.put('/class/module', ClassController.updateClassModule)
router.delete('/class/:classId', ClassController.deleteClass)

router.get('/comments/:classId/:userId', CommentsController.getComments)
router.post('/comment', CommentsController.createComment) 
router.put('/comment', CommentsController.updateComment)
router.delete('/comment/:commentId', CommentsController.deleteComment)
router.get('/comment/likes/:commentId', CommentsController.getLikes) 
router.post('/comment/like', CommentsController.createLike)
router.delete('/comment/like/:commentId/:userId', CommentsController.deleteLike)


// this is the new pattern. the following functions are gonna be replicated to the previous and following. Deleting this comment after this commit
router.get('/subscriptions/:userId', SubscriptionsController.getSubscriptions)
router.post('/subscription', SubscriptionsController.createSubscription)
router.delete('/subscription/:subscriptionId', SubscriptionsController.deleteSubscription)

// router.post('/auth/signup'); // User signup
// router.post('/auth/login'); // User login
// router.put('/auth/:userId/updateEmail'); // Update user profile information
// router.post('/auth/logout'); // User logout
// router.put('/auth/:userId/changePassword'); // Change user's password
// router.put('/auth/:userId/generalData') // changes user's general data like name and everything else
// router.get('/auth/:userId', AuthController.getUser) 
// router.post('/auth/resetPassword'); // Request password reset
// router.put('/auth/resetPassword/:resetToken'); // Reset password using reset token

router.get('/admin/analytics/activeUser/:companyId') // get all active users by companny
router.get('/admin/analytics/activeUser') // get all active users 
router.post('/admin/user') // create a user and places them in determined company
router.delete('/admin/user') // makes a user unactive
router.post('/admin/company/create'); // create a new company
router.get('/admin/company/:companyId'); // get company details
router.put('/admin/company/:companyId'); // update company details
router.delete('/admin/company/:companyId'); // delete a company

export default router