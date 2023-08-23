import {Router} from 'express';
import * as CompanyController from '../controllers/CompanyController';
import * as CourseController from '../controllers/CourseController';
import * as ClassController from '../controllers/ClassController';
import * as QuestionsController from '../controllers/QuestionController';
import * as StatusController from '../controllers/StatusController';
import * as CommentsController from '../controllers/CommentsController';
import * as AuthController from '../controllers/AuthController';
import * as SubscriptionsController from '../controllers/SubscriptionController';
import { exclusiveAdminRoute, privateRoute } from '../config/passport';

const router = Router()

router.get('/company/:companyId', privateRoute, CompanyController.companyById);

router.get('/course/:courseId', CourseController.courseById)
router.post('/course', CourseController.createCourse)
router.get('/courses/companyAquisitions/:companyId', privateRoute, CourseController.companyAquisitions)
router.post('/courses/aquisition', privateRoute, CourseController.createAquisition)
router.get('/status/:classId/:userId', privateRoute, StatusController.getStatusByClass)
router.post('/status', privateRoute, StatusController.createClassStatus) 
router.delete('/status', privateRoute, StatusController.deleteClassStatus)
router.get('/class/:classId', privateRoute, ClassController.classById)
router.post('/class', privateRoute, ClassController.createClass) 
router.put('/class/title', privateRoute, ClassController.updateClassTitle) 
router.put('/class/module', privateRoute, ClassController.updateClassModule)
router.delete('/class/:classId', privateRoute, ClassController.deleteClass)
router.get('/comments/:classId/:userId', privateRoute, CommentsController.getComments)
router.post('/comment', privateRoute, CommentsController.createComment) 
router.put('/comment', privateRoute, CommentsController.updateComment)
router.delete('/comment/:commentId', privateRoute, CommentsController.deleteComment)
router.get('/comment/likes/:commentId', privateRoute, CommentsController.getLikes) 
router.post('/comment/like', privateRoute, CommentsController.createLike)
router.delete('/comment/like/:commentId/:userId', privateRoute, CommentsController.deleteLike)
router.get('/subscriptions/:userId', privateRoute, SubscriptionsController.getSubscriptions)
router.post('/subscription', privateRoute, SubscriptionsController.createSubscription)
router.delete('/subscription/:subscriptionId', privateRoute, SubscriptionsController.deleteSubscription)

router.post('/auth/signup', AuthController.signup);
router.post('/auth/signup/confirm', AuthController.confirmSignup) 
router.post('/auth/login', AuthController.login); 
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
router.post('/admin/company/create', CompanyController.createCompany);
router.get('/admin/company/:companyId'); // get company details
router.put('/admin/company/:companyId'); // update company details
router.delete('/admin/company/:companyId'); // delete a company

export default router