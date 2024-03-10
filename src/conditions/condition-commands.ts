import {GitHelperInterface} from "../git-api-helpers/git-helper.interface";
import {ProjectDto} from "../reports/dto/project.dto";
import {CheckFieldParamsDto, FindFileParamsDto, FindLineParamsDto, RuleParams} from "../reports/dto/rule-params.dto";

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

export class CheckFieldCommand implements ConditionCommandInterface {
    async execute(gitHelper: GitHelperInterface, project: ProjectDto, condition: CheckFieldParamsDto): Promise<boolean> {
        try {
            let gitResponse = await gitHelper?.readFile(
                project.owner,
                project.repo,
                condition.filePath
            );

            if (gitResponse.status != 200 || gitResponse.content == null) {
                return Promise.resolve(false);
            } else {
                // todo check extension with path
                if (condition.filePath.split('.').at(-1) == "json") {
                    let jsonString: string = gitResponse.content.join('\n');
                    let jsonObject = JSON.parse(jsonString);

                    if (jsonObject.hasOwnProperty(condition.field)) {
                        console.log(jsonObject[condition.field]);
                        return Promise.resolve(jsonObject[condition.field] == condition.value);
                    }
                } else if (condition.filePath.split('.').at(-1) == "yaml") {

                }
            }
        } catch (error) {
            console.log("CheckFieldCommand error:" + error);

            return Promise.resolve(false);
        }

        return Promise.resolve(false);
    }

}