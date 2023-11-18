export interface DailyReviewCount {
    date: string,
    positive_count: number,
    negative_count: number,
    maximum_reach: number
}

export interface MainDataInterface {
    company_name: string,
    daily_review_counts: DailyReviewCount[]
}