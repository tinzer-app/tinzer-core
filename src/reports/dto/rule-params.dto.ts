export type RuleParams = FindFileParamsDto | FindLineParamsDto | CheckFieldParamsDto;

export class FindFileParamsDto {
    readonly filePath: string;
    readonly branch?: string;
}

export class FindLineParamsDto extends FindFileParamsDto{
    readonly line: string;
}

export class CheckFieldParamsDto extends FindFileParamsDto{
    readonly field: string;
    readonly value: string;
}