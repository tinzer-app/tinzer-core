export type RuleParams = FindFileParamsDto | FindLineParamsDto | CheckFieldParamsDto;

export class FindFileParamsDto {
    readonly filePath: string;
    readonly branch?: string;
}

export class FindLineParamsDto {
    readonly filePath: string;
    readonly line: string;
}

export class CheckFieldParamsDto {
    readonly filePath: string;
    readonly field: string;
    readonly value: string;
}