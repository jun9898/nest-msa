import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // 비동기 패턴
  @EventPattern('video_downloaded')
  async handleVideoDownloaded(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    console.log(message);
    console.log(`Topic: ${context.getTopic()}`);
    this.analyticsService.updateVideoDownloadCnt(message.id);
  }
}
