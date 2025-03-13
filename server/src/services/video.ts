// filepath: /video-portal/video-portal/server/src/services/video.ts

import { Video } from '../types';
import { VideoRepositoryInterface } from '../repositories/videoRepositoryInterface';

export class VideoService {
    constructor(private repository: VideoRepositoryInterface) {}

    async listVideos(filters: any, pagination: any): Promise<Video[]> {
        return this.repository.findWithFilters(filters, pagination);
    }

    async getVideo(id: number): Promise<Video> {
        const video = await this.repository.findById(id);
        if (!video) {
            throw new Error(`Video with ID ${id} not found`);
        }
        return video;
    }

    async updateVideo(id: number, data: Partial<Video>): Promise<Video> {
        const video = await this.repository.findById(id);
        if (!video) {
            throw new Error(`Video with ID ${id} not found`);
        }
        return this.repository.update(video, data);
    }

    async incrementLikes(id: number): Promise<Video> {
        const video = await this.repository.findById(id);
        if (!video) {
            throw new Error(`Video with ID ${id} not found`);
        }
        return this.repository.incrementField(video, 'likes');
    }
}