import {GitHelperInterface} from "../git-api-helpers/git-helper.interface";
import {ProjectDto} from "../reports/dto/project.dto";
import {FindFileParamsDto, FindLineParamsDto, RuleParams} from "../reports/dto/rule-params.dto";

export interface ConditionCommandInterface {
     execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: RuleParams): Promise<boolean>;
}

export class FindFileCommand implements ConditionCommandInterface {
    async execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: FindFileParamsDto): Promise<boolean> {
        try {
            let gitResponse = await gitHelper?.getFile(
                project.owner,
                project.repo,
                condition.filePath
            );
            return Promise.resolve(gitResponse.status == 200);
        }
        catch (error) {
            return  Promise.resolve(false);
        }
    }
}

export class FindLineCommand implements ConditionCommandInterface {
    async execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: FindLineParamsDto): Promise<boolean> {
        try {
            let gitResponse = await gitHelper?.readFile(
                project.owner,
                project.repo,
                condition.filePath
            );
            if (gitResponse.status != 200 || gitResponse.content == null) {
                return Promise.resolve(false);
            } else {
                gitResponse.content = gitResponse.content?.map((line: string) => line.trim());
                let searchLine: string = condition.line.trim();
                return Promise.resolve(gitResponse.content.includes(searchLine));
            }
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}