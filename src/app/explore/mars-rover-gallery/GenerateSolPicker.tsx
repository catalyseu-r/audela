import { useAppContext } from '@/app/contexts/store';
import { ActionTypes } from '@/app/types/actionTypes';
import { GiSunrise as SunIcon } from 'react-icons/gi';

const GenerateSolPicker = () => {
  const {
    state: {
      marsFilterState: { rover, sol },
    },
    dispatch,
  } = useAppContext();

  const updateCurrentSol = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parseInput = event.target.value.toString();

    dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key: 'sol', value: parseInput } });
  };

  if (!rover) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4 items-start transition-all '>
      <label
        htmlFor='sol'
        className='flex items-center gap-2 font-normal leading-6 lg:text-base text-sm text-deep-green'
      >
        <SunIcon className={'lg:text-2xl text-base'} />
        <span>sol</span>
      </label>
      <input
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
        }}
        className='py-2 px-4 rounded bg-bg-black  border-r-[16px] border-transparent outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all lg:text-base text-sm text-text-white  !font-sans cursor-pointer w-full appearance-none max-w-[12ch]'
        type='number'
        inputMode='numeric'
        name='sol'
        id='sol'
        max={rover.max_sol}
        onChange={updateCurrentSol}
        value={sol}
      />
    </div>
  );
};

export default GenerateSolPicker;
