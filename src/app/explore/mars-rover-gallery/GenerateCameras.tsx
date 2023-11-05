import { useAppContext } from '@/app/contexts/store';
import { GiPhotoCamera as CameraIcon } from 'react-icons/gi';

const GenerateCameras = () => {
  const {
    state: { currentMarsRover },
  } = useAppContext();

  return (
    <div className='flex flex-col gap-4 items-start transition-all '>
      <label
        htmlFor='camera'
        className='flex items-center gap-2 font-normal leading-6 lg:text-base text-sm text-deep-green'
      >
        <CameraIcon className={'lg:text-2xl text-base'} />
        <p>Camera</p>
      </label>

      <select className='py-2 px-4 rounded bg-bg-black  border-r-[16px] border-transparent  outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all lg:text-base text-sm text-text-white  !font-sans cursor-pointer max-w-[17ch]'>
        {currentMarsRover?.cameras.map((item) => {
          return (
            <option className='' key={item.full_name} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GenerateCameras;
