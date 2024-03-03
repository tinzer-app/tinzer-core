import {Injectable} from '@nestjs/common';
import {RequestReportDto} from "./dto/request-report.dto";
import {ResponseReportDto} from "./dto/response-report.dto";
import {GitHubAPIHelper} from "../git-api-helpers/github-helper/GitHubAPIHelper";
import {GitHelperInterface} from "../git-api-helpers/git-helper.interface";
import {RulesEnum} from "../rules/rules.enum";
import {ProjectDto} from "./dto/project.dto";
import {RuleDto} from "./dto/rule.dto";
import {ConditionCommandInterface, FindFileCommand, FindLineCommand} from "../conditions/condition-commands";

@Injectable()
export class ReportsService {
    // todo inject githelper provider
    private static readonly githubHelper: GitHubAPIHelper = new GitHubAPIHelper();
    // todo check request body
    // todo manage rate limit for api calls
    async makeReport(requestReportDto: RequestReportDto): Promise<ResponseReportDto> {
        let responseReport: ResponseReportDto = new ResponseReportDto();
        let projects: ProjectDto[] = requestReportDto.projects;
        let conditions: RuleDto[] = requestReportDto.conditions;
        responseReport.conditions_count = conditions.length;
        responseReport.projects_count = projects.length;

        console.log(responseReport);
        let gitHelper: GitHelperInterface = null;

        for (let i: number = 0; i < projects.length; i++) {
            // todo get githelper provider
            gitHelper = this.getGitHelper(projects[i].system);

            let inspectionResult: boolean[] = [];

            for (let j: number = 0; j < conditions.length; j++) {
                let command: ConditionCommandInterface = this.getConditionCommand(conditions[j].type);
                console.log(conditions[j].type);
                console.log(command);

                if (responseReport.conditions.length < conditions.length) {
                    responseReport.conditions.push(conditions[j]);
                }
                inspectionResult.push(await command?.execute(gitHelper, projects[i], conditions[j].params));
            }
            responseReport.inspection.push({project: projects[i], result: inspectionResult})

        }
        return Promise.resolve(responseReport);
    }

    private getGitHelper(system: string): GitHelperInterface {
        switch (system) {
            case "github":
                return  ReportsService.githubHelper;
            default:
                return null;
        }
    }

    private getConditionCommand(type: RulesEnum): ConditionCommandInterface {
        // TODO command-fabric
        switch (type) {
            case RulesEnum.FindFile:
                return new FindFileCommand();
            case RulesEnum.FindLine:
                return new FindLineCommand();
            default:
                return null;
        }
    }
}
