export interface MonthlyDataInterface {
    yearAndMonth: string;
    count: number;
    avg_time: number;
    min_time: number;
    max_time: number;
    min_time_question: string;
    max_time_question: string;
}

export interface YearMonthPropsInterface {
    data: string[];
}