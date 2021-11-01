import { Express , Request , Response , NextFunction } from 'express';
import { FormValidation } from '../helper/middleware/FormValidation';
import { QueryConfigImpl } from '../helper/middleware/QueryConfigImpl';
import { UserProfile } from '../helper/middleware/UserProfile';

import { HomeRouter } from './HomeRouter';
import { InternalRouter } from './InternalRouter';
import { AdminRouter } from './AdminRouter';
import { CountryRouter } from './CountryRouter';
import { DepartmentRouter } from './DepartmentRouter';
import { FacultyRouter } from './FacultyRouter';
import { LevelRouter } from './LevelRouter';
import { RoleRouter } from './RoleRouter';
import { UserSession } from '../entity/UserSession';
import { StatusRouter } from './StatusRouter';
import { ThesisStatusRouter } from './ThesisStatusRouter';
import { UserStatusRouter } from './UserStatusRouter';
import { PublisherRouter } from './PublisherRouter';
import { PaymentMethodRouter } from './PaymentMethodRouter';
import { DeliveryMethodRouter } from './DeliveryMethodRouter';
import { ThesisGradeRouter } from './ThesisGradeRouter';
import { ThesisReviewRouter } from './ThesisReviewRouter';
import { ThesisReplyRouter } from './ThesisReplyRouter';
import { UserProfilePhotoRouter } from './UserProfilePhotoRouter';
import { UserSignatureRouter } from './UserSignatureRouter';
import { ThesisRouter } from './ThesisRouter';
import { UserThesisRouter } from './user/UserThesisRouter';
import { GeneralThesisRouter } from './user/GeneralThesisRouter';
import { UserRouter } from './UserRouter';
import { ProfileRouter } from './ProfileRouter';
import { OrderRouter } from './OrderRouter';
import { EmailMessageTemplateRouter } from './EmailMessageTemplateRouter';
import { EmailMessageTypeRouter } from './EmailMessageTypeRouter';
import { AttachmentRouter } from './AttachmentRouter';
import { RemitaRouter } from './RemitaRouter';
import { EntryAuthor } from '../helper/entry/EntryAuthor';

export function AppRouter(app : Express) {

		app.use('*' , QueryConfigImpl.createQueryConfigImpl);
		app.use('*' , FormValidation.createDataValidationObject);
		app.use('*' , UserProfile.testProfile);
		app.use('/', GeneralThesisRouter);
		app.use('/', HomeRouter);
		// app.use('*' , UserProfile.isAuthenticated);
		app.use('/profile/' , ProfileRouter);
		app.use('/remita/' , RemitaRouter);
		app.use('/thesis/user/' , UserThesisRouter);
		app.use('/internal/' , UserProfile.isAuthenticated , InternalRouter);
		app.use('/internal/admin', AdminRouter);

		app.use('/internal/department', DepartmentRouter);

		app.use('/internal/country/' , CountryRouter);
		app.use('/internal/faculty/' , FacultyRouter);
		app.use('/internal/level/' , LevelRouter);
		
		app.use('/internal/role/' , RoleRouter);
		app.use('/internal/thesis-grade/' , ThesisGradeRouter);

		app.use('/internal/status/' , StatusRouter);
		app.use('/internal/user-status/' , UserStatusRouter);
		app.use('/internal/thesis-status/' , ThesisStatusRouter);
		
		app.use('/internal/publisher/' , PublisherRouter);
		app.use('/internal/payment-method/' , PaymentMethodRouter);
		app.use('/internal/delivery-method/' , DeliveryMethodRouter);
		app.use('/internal/order/' , OrderRouter);
		app.use('/internal/email-message-template/' , EmailMessageTemplateRouter);
		app.use('/internal/email-message-type/' , EmailMessageTypeRouter);

		app.use('/internal/thesis' , ThesisRouter);
		app.use('/internal/user' , UserRouter);


		app.use('/internal/thesis-review/' , ThesisReviewRouter);
		app.use('/internal/thesis-reply/' , ThesisReplyRouter);
		
		app.use('/internal/user-profile-photo/' , UserProfilePhotoRouter);
		app.use('/internal/user-signature/' , UserSignatureRouter);

		app.use('/api/upload/' , AttachmentRouter);
}