import {ColumnActions} from "./column-actions";

export interface ColumnSetting {
  id?: number;
  field?: string;
  header?: string;
  format?: "dropDown" | "scroll" | "action";
  type?: "text" | "numeric" | "long-text" | "boolean" | 'HTMLElement' | 'chart';
  isCurrency?: boolean;
  icon?: string;
  extraField?: string;
  classBox?: string;
  statusColor?: string;
  columnActions?: ColumnActions[];
  parentTitle?: string;
  extraStyle?: string;
  iconTitle?: string;
  sortable?: boolean;
  rowspan?: number;
  colspan?: number;
  hasSummation?: boolean;
  headerIcon?: string;
  animation?: string;
  colTooltip?: string;
  visibility?: boolean;
}
