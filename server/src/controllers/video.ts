// filepath: /video-portal/video-portal/server/src/controllers/video.ts
import { Request, Response } from 'express';
import { VideoService } from '../services/video';
import { Video } from '../types';
import { LengthAwarePaginator } from 'some-pagination-library'; // Replace with actual pagination library

const videoService = new VideoService();

export const listVideos = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters = req.query.filters || {};
        const pagination = {
            page: parseInt(req.query.page as string) || 1,
            limit: parseInt(req.query.limit as string) || 10,
        };
        const videos: LengthAwarePaginator = await videoService.listVideos(filters, pagination);
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const videoId = parseInt(req.params.id);
        const video: Video = await videoService.getVideo(videoId);
        res.status(200).json(video);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const videoId = parseInt(req.params.id);
        const updatedVideo: Video = await videoService.updateVideo(videoId, req.body);
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const incrementLikes = async (req: Request, res: Response): Promise<void> => {
    try {
        const videoId = parseInt(req.params.id);
        const updatedVideo: Video = await videoService.incrementLikes(videoId);
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};