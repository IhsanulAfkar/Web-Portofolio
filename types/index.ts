export type Project = {
    id: number,
    img: string,
    tag: string,
    title: string,
    desc: {
        id: string,
        en: string
    },
    url: string
}
export type TProvinceInsightTrend = {
    project_id: number,
    trend_date: string,
    mention: number,
    reach: number,
    engagement: number
}
export type TDashboardCountryMarker = {
    platform: string,
    project_id: number,
    user_id: number,
    post_id: string,
    post_author_username: string,
    post_text: string,
    post_created_at: string,
    country_id: number,
    country_name: string,
    post_reach: number,
    post_engagement: number,
    total_influence: number,
    sentiment: string,
    location_detect: string | null,
    latitude_country: number,
    longitude_country: number,
    post_url: string,
    statistics: {
        like_count: number,
        comment_count: number,
        share_count: number,
        view_count: number,
        quote_count: number,
        repost_count: number,
        collect_count: number,
        forward_count: number,
        download_count: number,
        whatsapp_share_count: number,
        top_reactions_count: number
    }
}
export type TInsightDateType = 'weekly' | 'monthly' | 'daily'
export type Mastery = {
    icon: string,
    text: string,
    color: string
}
export type WorkExperience = {
    start_month: string,
    end_month: string,
    title: string,
    subtitle?: string,
    description: {
        id: string,
        en: string
    },
    tag?: string
}
export type Repo = {
    id: number,
    name: string,
    url: string,
    description: string,
    tech: string,
}
export type TProvinceInsight = {
    summary: TProvinceInsightProject[],
    top_posts: TProvinceInsightTopPost[],
    trend: TProvinceInsightTrend[],
    total_negative: number
    total_neutral: number
    total_positive: number
    total_unique_post_country: number
    total_unique_post_province: number
}
export type TProvinceInsightProject = {
    project_id: number,
    project_name: string,
    total_post: number,
    total_reach: number,
    total_engagement: number,
    total_positive: number,
    total_negative: number,
    total_neutral: number,
    today_positive: number,
    today_negative: number,
    today_neutral: number,
    yesterday_positive: number,
    yesterday_negative: number,
    yesterday_neutral: number
}
export type TProvinceInsightTopPost = {
    platform: string,
    project_id: number,
    project_name: string,
    user_id: number,
    post_id: string,
    post_author_username: string,
    post_text: string,
    post_created_at: string,
    post_reach: number,
    post_engagement: number,
    total_influence: number,
    sentiment: string,
    post_url: string
}