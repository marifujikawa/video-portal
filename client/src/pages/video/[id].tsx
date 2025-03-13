import { GetServerSideProps } from 'next'
import { Video } from '../../types'
import { fetchVideo } from '../../services/video'
import VideoDetail from '../../components/video/VideoDetail/VideoDetail';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string
    const response = await fetchVideo(id)
    const video = response.data

    if (!video) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        video
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch video'
      }
    }
  }
}

const VideoPage = (props: { video?: { data: Video; } | undefined}) => {
  return <VideoDetail pageProps={props} />;
};

export default VideoPage;
