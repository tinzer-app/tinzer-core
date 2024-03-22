import {GitHelperInterface} from "../git-helper.interface";
import {Octokit} from "@octokit/core";
import {GitHelperClass} from "../git-helper.class";
import {Data, GithubResponse} from "./github.response";
import { Buffer } from 'node:buffer';
import 'dotenv/config';
import * as process from "process";
import {HttpException} from "@nestjs/common";

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
            let octokitResponse = await this.octokit.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                    owner: owner,
                    repo: repo,
                    path: filePath
                }
            );
            // todo delete
            console.log("get file status: " + octokitResponse.status);

            response.status = octokitResponse.status;

            if (octokitResponse.status == 200) {
                response.data = JSON.parse(JSON.stringify(octokitResponse.data)) as Data;
            }
        } catch (error) {
            if (error instanceof HttpException) {
                response.status = error.getStatus();
            }
            response.status = error.status;
            // todo delete
            console.log("get file error:");
            console.log(error);
        }
        return Promise.resolve(response);
    }
    async readFile(owner: string, repo: string, filePath: string, branch?: string): Promise<GithubResponse> {
        let response: GithubResponse = {status: 0};
        try {
            const octokitResponse = await this.octokit.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                    owner: owner,
                    repo: repo,
                    path: filePath
                }
            );

            response.status = octokitResponse.status;
            if (octokitResponse.status == 200) {
                response.data = JSON.parse(JSON.stringify(octokitResponse.data)) as Data;
            }
            response.content = Buffer.from(response.data.content, 'base64').toString('utf8').split('\n');
        } catch (error) {
            // todo delete
            console.log("read file error:");
            console.log(error);
            if (error instanceof HttpException) {
                response.status = error.getStatus();
            }
            response.status = error.status;
        }
        return Promise.resolve(response);
    }
}