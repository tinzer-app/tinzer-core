import {RulesEnum} from "./rules.enum";
import {RuleParams} from "../reports/dto/rule-params.dto";

export interface RulesInterface {
    //type: RulesEnum
}

export interface FindFile extends RulesInterface {
    findFile(params: RuleParams) : Promise<boolean>
}

export interface FindLine extends RulesInterface {
    findLine(params: RuleParams) : Promise<boolean>
}

export interface CheckField extends RulesInterface {
    checkField(params: RuleParams) : Promise<boolean>
}