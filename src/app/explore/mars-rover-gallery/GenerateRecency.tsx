import { useAppContext } from '@/app/contexts/store';
import { ActionTypes } from '@/app/types/actionTypes';
import { PhotoRecency } from '@/app/types/appState';
import { LuClock4 as ClockIcon } from 'react-icons/lu';
const GenerateRecency = () => {
  const {
    state: {
      marsFilterState: { recency, rover },
    },
    dispatch,
  } = useAppContext();

  const updateRecency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: ActionTypes.SET_MARS_ROVER_FILTER_STATE,
      payload: { key: 'recency', value: event.target.value },
    });
  };

  if (!recency || !rover) {
    return null;
  } else
    return (
      <div className='flex flex-col gap-4 items-start transition-all'>
        <label
          htmlFor='recency'
          className='flex items-center gap-2 font-normal leading-6 lg:text-base text-sm text-deep-green'
        >
          <ClockIcon className={'lg:text-2xl text-base'} />
          <p>Recency</p>
        </label>
        <select
          onChange={updateRecency}
          value={recency}
          className='py-2 px-4 rounded bg-bg-black  border-r-[16px] border-transparent outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all lg:text-base text-sm text-text-white  !font-sans cursor-pointer w-full max-w-[17ch]'
        >
          <option value={PhotoRecency.all}>All</option>
          <option value={PhotoRecency.latest_photos}>Most recent</option>
        </select>
      </div>
    );
};

export default GenerateRecency;
