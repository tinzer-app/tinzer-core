import {RulesEnum} from "../../rules/rules.enum";
import {RuleParams} from "./rule-params.dto"

export class RuleDto {
    readonly type: RulesEnum;
    readonly params: RuleParams;
}

