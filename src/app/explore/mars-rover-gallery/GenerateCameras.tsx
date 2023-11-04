import { useAppContext } from '@/app/contexts/store';
import { GiPhotoCamera as CameraIcon } from 'react-icons/gi';

const GenerateCameras = () => {
  const {
    state: { currentMarsRover },
  } = useAppContext();

  return (
    <div className='flex flex-col gap-4 items-start transition-all md:basis-1/5 grow-0 shrink-0'>
      <label htmlFor='camera' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
        <CameraIcon className={'text-2xl'} />
        <p>Camera</p>
      </label>

      <select className='py-2 px-6 rounded bg-bg-black  border-r-[16px] border-transparent  outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all text-base text-text-white  !font-sans cursor-pointer w-full'>
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
