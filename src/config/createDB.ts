import Class  from "../models/Class";
import Comment  from "../models/Comment";
import Company from "../models/Company";
import CompanyAquisition  from "../models/CompanyAquisition";
import Course from "../models/Course";
import Level  from "../models/Level";
import Like from "../models/Like";
import Module  from "../models/Module";
import Segment  from "../models/Segment";
import Status from "../models/Status";
import Subscription  from "../models/Subscription";
import User  from "../models/User";

export const syncAllDatabase = ()=>{
    // Class.sync();
    // Comment.sync();
    // Company.sync();
    // Course.sync();
    // Level.sync();
    // Like.sync();
    // Module.sync();
    // Segment.sync();
    // Subscription.sync();
    User.sync();
    // CompanyAquisition.sync();
    Status.sync()
}
