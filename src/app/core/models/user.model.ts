import { ILoginResponse } from "./login.response.model";

export interface IUser extends ILoginResponse {
  id?: number;
  name?: string;
  email: string;
  userRole?: number;
  profilePhoto?: string;
  practiceId?: number;
  profileCreateFinishedSteps?: string[];
  profileCreateSkippedSteps?: string[];
  practiceOnboardingCompleted?: boolean;
}
