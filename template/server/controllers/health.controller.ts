import { JsonController, Get, HttpCode, OnUndefined } from 'routing-controllers';
import { HealthInfo } from '../models/healthInfo';

@JsonController('health')
export class HealthController {
    @Get()
    public health(): HealthInfo {
        return {
            status: 200
        };
    }
}
