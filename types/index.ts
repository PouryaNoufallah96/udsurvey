export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  OUTLINE = "outline",
  LINK = "link",
  ICON = "icon",
  TEXTICON = "texticon",
}

export interface IApiResponse<T> {
  result?: T;
  errors?: IApiErrorResponse[];
}

export interface IApiErrorResponse {
  code: number;
  message: string;
}

export interface ICustomError {
  statusCode: number;
  message: string;
}

export interface IActive {
  isActive: boolean
}

export interface IUser {
  fullName: string;
  isAdmin: boolean;
}

export interface IUserForm {
  id?: number;
  fullName: string;
  username: string;
  password: string;
  isAdmin: boolean;
  customerId?: number;
}

export interface ICustomerForm {
  id?: number;
  title: string;
  customerCategoryId: number;
}

export interface ISurveyForm {
  id?: number;
  title: string;
  surveyCategoryId: number;
  deadLine: string;
  isActive: boolean;
  surveyItems: number[]
  surveyQuestions: number[]
}

export interface ISurveyUserForm {
  id: number;
  title: string;
  surveyCategory: string;
  deadLine: string;
  surveyItems: ISurveyItemUserForm[]
  surveyQuestions: ISurveQuestionUserForm[]
}
export interface ISurveyItemUserForm {
  id: number;
  title: string;
}
export interface ISurveQuestionUserForm {
  id: number;
  title: string;
}

export interface ISurveyCategoryForm {
  id?: number;
  title: string;
}

export interface ISurveyItemDefinitionForm extends IActive {
  id?: number;
  title: string;
  surveyCategoryId: number;
}

export interface ISurveyQuestionDefinitionForm extends IActive {
  id?: number;
  title: string;
  surveyCategoryId: number;
}


export interface ICustomList {
  id: number;
}

export interface IEnumberation {
  id: number;
  name: string;
}

export const CustomerCategories: IEnumberation[] = [
  {
    id: 1,
    name: "Web"
  },
  {
    id: 2,
    name: "Windows"
  }
]