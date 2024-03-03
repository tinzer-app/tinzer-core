import {GithubResponse} from "./github-helper/github.response";

export interface GitHelperInterface {
    getFile(owner: string, repo:string, filePath:string, branch? : string): Promise<GithubResponse>;
    readFile(owner: string, repo:string, filePath:string, branch? : string): Promise<GithubResponse>;
}