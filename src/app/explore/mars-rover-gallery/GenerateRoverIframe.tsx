import { NASA_ROVERS_3D } from '@/app/staticData/nasaRovers3D';
import { MarsRoverProfile } from '@/app/types/marsRoverTypes';
import { findNasaSource } from '@/app/utils/lists/findNasaSource';

interface RoverIframeComponentProps {
  data: MarsRoverProfile | null;
}

const GenerateRoverIframe = ({ data }: RoverIframeComponentProps) => {
  if (!data) {
    return null;
  }

  return (
    <div
      className={`lg:w-[352px] lg:h-[352px] w-[calc(30vh+2.5rem)] h-[calc(30vh+2.5rem)] aspect-square flex items-center justify-center md:shadow-custom-image-strong-shadow rounded `}
    >
      <iframe
        src={findNasaSource(data.id, NASA_ROVERS_3D)?.source}
        className='w-full h-full object-contain rounded transition-all'
        allowFullScreen
      />
    </div>
  );
};

export default GenerateRoverIframe;
