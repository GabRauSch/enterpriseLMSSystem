import {Router} from 'express';
import * as CompanyController from '../controllers/CompanyController'
import * as CourseController from '../controllers/CourseController'
import * as ClassController from '../controllers/ClassController'
import * as QuestionsController from '../controllers/QuestionController'

const router = Router()

router.get('/company/:id', CompanyController.companyById);
router.post('/company/createCompany')

router.get('/course/:courseId')
router.get('/courses/:companyId')
router.get('/course/:companyAquisitionId')
router.get('/courses/:userId')
router.get('/course/:courseId/:userId')

router.get('/class/:classId/:userId')

router.get('/questions/:classId/:userId')

router.get('/user/:userId')

export default router