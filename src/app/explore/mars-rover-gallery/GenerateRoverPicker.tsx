import { useAppContext } from '@/app/contexts/store';
import { RoverGalleryContentType } from './RoverGalleryContent';
import { ActionTypes } from '@/app/types/actionTypes';
import { GiTrackedRobot as RoverIcon } from 'react-icons/gi';

const GenerateRoverPicker = ({ data: { rovers } }: RoverGalleryContentType) => {
  const {
    state: { currentMarsRover },
    dispatch,
  } = useAppContext();

  const updateCurrentRover = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numValue = parseInt(event.target.value);

    const findFromStaticData = rovers.find((rover) => rover.id === numValue);

    findFromStaticData && dispatch({ type: ActionTypes.SET_CURRENT_MARS_ROVER, payload: findFromStaticData });
    dispatch({ type: ActionTypes.RESET_MARS_ROVER_FILTER_STATE });
  };

  if (!rovers) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4 items-start transition-all'>
      <label htmlFor='rover' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
        <RoverIcon className={'text-2xl'} />
        <p>Rover</p>
      </label>
      <select
        className='py-2 px-4 rounded bg-bg-black  border-r-[16px] border-transparent outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all text-base text-text-white  !font-sans cursor-pointer max-w-[17ch] '
        onChange={updateCurrentRover}
        value={currentMarsRover?.id}
      >
        {rovers.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GenerateRoverPicker;
