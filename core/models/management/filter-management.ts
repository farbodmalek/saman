import {BaseFilters} from "../common/base-filters";

export interface FilterManagement extends BaseFilters {
    isMenu: boolean;
    branches: any[];
}