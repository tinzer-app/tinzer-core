import {GitHelperInterface} from "../git-helper.interface";
import {Octokit} from "@octokit/core";
import {GitHelperClass} from "../git-helper.class";
import {Data, GithubResponse} from "./github.response";
import { Buffer } from 'node:buffer';
import * as process from "process";

// todo injectable
export class GitHubAPIHelper extends GitHelperClass
    implements GitHelperInterface {
    protected authToken: string = process.env.GITHUB_TOKEN as string;
    private readonly octokit: Octokit = new Octokit({auth: this.authToken});

    constructor() {
        super();
    }

    async getFile(owner: string, repo: string, filePath: string, branch?: string): Promise<GithubResponse> {
        let response: GithubResponse = {status: 0};
        try {
            const result = await this.octokit.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                    owner: owner,
                    repo: repo,
                    path: filePath
                }
            );
            response.status = result.status;
            // console.log(response.status);
            if (result.status == 200) {
                response.data = (result.data as Data);
            }
            // console.log("GitHubAPIHelper.getFile: response.data\n" + response.data);
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve(response);
    }
    async readFile(owner: string, repo: string, filePath: string, branch?: string): Promise<GithubResponse> {
        let response: GithubResponse = {status: 0};
        try {
            const result = await this.octokit.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                    owner: owner,
                    repo: repo,
                    path: filePath
                }
            );
            response.status = result.status;
            if (result.status == 200) {
                response.data = (result.data as Data);
            } else {
                return Promise.resolve(response);
            }
            // console.log("GitHubAPIHelper.readFile: response.data?.content\n" + response.data?.content);
            response.content = Buffer.from(response.data.content).toString().split('\n');
            // console.log("GitHubAPIHelper.readFile: response.content\n" + response.content);
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve(response);
    }
}