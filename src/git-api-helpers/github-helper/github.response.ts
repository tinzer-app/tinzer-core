export interface GithubResponse {
    status: number;
    data?: Data;
    content?: string[];
}

export interface Data {
    type:         string;
    encoding:     string;
    size:         number;
    name:         string;
    path:         string;
    content:      string;
    sha:          string;
}