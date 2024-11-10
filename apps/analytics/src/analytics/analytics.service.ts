import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytics } from './entity/analytics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics) private analyticsRepository: Repository<Analytics>) {}

  async updateVideoDownloadCnt(videoId: string) {
    const analytics = await this.analyticsRepository.findOneBy({ videoId });
    console.log(analytics);
    if (!analytics) {
      await this.analyticsRepository.save(this.analyticsRepository.create({ videoId, downloadCnt: 1 }));
      return;
    }
    await this.analyticsRepository.update(analytics.id, { downloadCnt: analytics.downloadCnt + 1 });
  }
}
