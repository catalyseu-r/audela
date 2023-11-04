import { useAppContext } from '@/app/contexts/store';
import { ActionTypes } from '@/app/types/actionTypes';
import { GiSunrise as SunIcon } from 'react-icons/gi';

const GenerateSolPicker = () => {
  const {
    state: { currentMarsRover, marsFilterState },
    dispatch,
  } = useAppContext();

  const updateCurrentSol = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parseInput = event.target.value.toString();

    dispatch({ type: ActionTypes.SET_MARS_ROVER_FILTER_STATE, payload: { key: 'sol', value: parseInput } });
  };

  return (
    <div className='flex flex-col gap-4 items-start transition-all md:basis-1/5 grow-0 shrink-0'>
      <label htmlFor='sol' className='flex items-center gap-2 font-normal leading-6 text-base text-deep-green'>
        <SunIcon className={'text-2xl'} />
        <p>Sol</p>
      </label>
      <input
        className='py-2 px-6 rounded bg-bg-black  border-r-[16px] border-transparent outline outline-1 outline-deep-green/50 focus:outline-interactive-green transition-all text-base text-text-white  !font-sans cursor-pointer w-full'
        type='number'
        inputMode='numeric'
        name='sol'
        id='sol'
        max={currentMarsRover?.max_sol}
        onBlur={updateCurrentSol}
        defaultValue={marsFilterState.sol}
      />
    </div>
  );
};

export default GenerateSolPicker;