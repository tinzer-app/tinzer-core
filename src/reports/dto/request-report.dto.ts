import {RuleDto} from "./rule.dto";
import {ProjectDto} from "./project.dto";

export class RequestReportDto {
    readonly projects: ProjectDto[];
    readonly conditions: RuleDto[];
}