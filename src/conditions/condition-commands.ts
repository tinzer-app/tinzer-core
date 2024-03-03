import {GitHelperInterface} from "../git-api-helpers/git-helper.interface";
import {ProjectDto} from "../reports/dto/project.dto";
import {FindFileParamsDto, FindLineParamsDto, RuleParams} from "../reports/dto/rule-params.dto";

export interface ConditionCommandInterface {
     execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: RuleParams): Promise<boolean>;
}

export class FindFileCommand implements ConditionCommandInterface {
    async execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: FindFileParamsDto): Promise<boolean> {
        let gitResponse = await gitHelper?.getFile(
            project.owner,
            project.repo,
            condition.filePath
        );
        console.log(gitResponse.status);
        console.log(gitResponse.content);
        return Promise.resolve(gitResponse.status == 200);
    }
}

export class FindLineCommand implements ConditionCommandInterface {
    async execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: FindLineParamsDto): Promise<boolean> {
        let gitResponse = await gitHelper?.readFile(
            project.owner,
            project.repo,
            condition.filePath
        );
        if (gitResponse.status != 200 || gitResponse.content == null) {
            return Promise.resolve(false);
        } else {
            return Promise.resolve( gitResponse.content.includes(condition.line));
        }
    }
}