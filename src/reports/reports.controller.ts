import {Controller, Get, Post} from '@nestjs/common';
import {RequestReportDto} from "./dto/request-report.dto";
import {Body} from "@nestjs/common";
import {ResponseReportDto} from "./dto/response-report.dto";
import {ReportsService} from "./reports.service";
import {FindFileParamsDto} from "./dto/rule-params.dto";

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    async makeReport(@Body() requestReportDto: RequestReportDto): Promise<ResponseReportDto> {
        let responseReport: ResponseReportDto = await this.reportsService.makeReport(requestReportDto);
        return Promise.resolve(responseReport);
    }
}
