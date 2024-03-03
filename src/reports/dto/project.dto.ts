// todo кодогенерация по контрактам
export class ProjectDto {
    readonly system: string;
    readonly owner: string;
    readonly repo: string;
    readonly branch?: string;
}
