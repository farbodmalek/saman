import {BaseEntity} from "../common/base-entity";

export interface CommitmentSurvey extends BaseEntity{
    numberOfInsurdPerson: number;
    numberOfJobsCreated: number;
    numberOfJobsObligated: number;
    planActivationType: string;
    planActivationTypeId: number;
    surveyDateFa: string;
}