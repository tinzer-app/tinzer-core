import {ProjectDto} from "./project.dto";
import {RuleDto} from "./rule.dto";
import {RulesEnum} from "../../rules/rules.enum";

export class ResponseReportDto {
    conditions_count: number;
    projects_count: number;
    conditions: RuleDto[];
    inspection: {
        project: ProjectDto;
        result: boolean[];
    }[];

    constructor() {
        this.conditions = [];
        this.inspection = [];
        for (const inspectionElement of this.inspection) {
            inspectionElement.result = [];
        }
    }
}