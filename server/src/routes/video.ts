// filepath: /video-portal/video-portal/server/src/routes/video.ts
import { Router } from 'express';
import VideoController from '../controllers/video';

const router = Router();

router.get('/', VideoController.listVideos);
router.get('/:id', VideoController.getVideo);
router.post('/', VideoController.createVideo);
router.put('/:id', VideoController.updateVideo);
router.delete('/:id', VideoController.deleteVideo);

export default router;