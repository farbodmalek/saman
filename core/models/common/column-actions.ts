export interface ColumnActions {
    icon?: string;
    title: string;
    id: number;
    style?: string;
    permission?: Array<string>;
    piIcon?: string;
    visibility?: boolean;
    class?: string;
    onClick(row);
}