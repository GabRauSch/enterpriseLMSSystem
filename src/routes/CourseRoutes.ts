import {Router} from 'express';
import * as CompanyController from '../controllers/CompanyController';
import * as CourseController from '../controllers/CourseController';
import * as ClassController from '../controllers/ClassController';
import * as QuestionsController from '../controllers/QuestionController';
import * as StatusController from '../controllers/StatusController'

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

router.get('/comments/:classId/:userId') // gets all comments that should appear for a user in determined class
router.post('/comment') // creates a new comment
router.put('/comment/:commentId') // updates a comment {data: string}
router.delete('/comment/:commentId') // deletes a comment based in its ID
router.get('/comment/likes') // get the number of likes in a comment
router.put('/comment/like') // change status of a like in determined comment

router.get('/user/:userId') // retrieves a user information (findByPk)
router.put('/user/:userId/updateEmail'); // Update user profile information
router.put('/user/:userId/changePassword'); // Change user's password
router.put('/user/:userId/generalData') // changes user's general data like name and everything else

router.get('/subscriptions/:userId') // get subscriptions by user
router.post('/subscription') // subscribes a user in a determined course {courseId, userId}

// router.post('/auth/signup'); // User signup
// router.post('/auth/login'); // User login
// router.post('/auth/logout'); // User logout
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