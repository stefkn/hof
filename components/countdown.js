// thanks to https://stackoverflow.com/questions/40885923/countdown-timer-in-react
import React, {useState, useEffect, useRef} from 'react'

const STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
}

const INITIAL_COUNT = 1500

export default function Countdown({disabled}) {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)
  const [percentageElapsed, setpercentageElapsed] = useState(0)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }

  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }

  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
    setpercentageElapsed(0)
  }

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
        setpercentageElapsed(((INITIAL_COUNT - secondsRemaining) / INITIAL_COUNT) * 100)
      } else {
        setStatus(STATUS.STOPPED)
        setpercentageElapsed(100)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  )

  return (
    <div className="mb-8">

      <div class="z-10 relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 shadow-md overflow-hidden">
        <div class="h-6 bg-green-600 rounded-full dark:bg-green-500 shadow-md"
        style={{width: percentageElapsed + '%'}}></div>
      </div>

      <div class="flex-initial basis-0 z-10 relative">
        <h2 class="text-7xl font-monospace text-center">
            {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}'
            {twoDigits(secondsToDisplay)}
        </h2>

        <div class="flex my-4">
          <div class="w-6 ml-auto">
            <svg class={ status === STATUS.STARTED ? "inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" : "inline mr-2 w-8 h-8 text-gray-200 dark:text-gray-600 fill-green-500" } viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
          <h2 class="text-xl font-bold ml-6 mx-auto pr-2 mb-2 font-serif flex-0">{status}</h2>
        </div>

      </div>
      <div class="w-80 mx-auto text-center z-10 relative">
        <button onClick={handleStart} type="button" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 mr-4 focus:outline-none hover:bg-green-400 rounded text-lg shadow-lg" style={{backgroundColor: status === STATUS.STARTED ? 'grey' : 'rgb(34 197 94 / var(--tw-bg-opacity))'}}>
            start
        </button>
        <button onClick={handleStop} type="button" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 mr-4 focus:outline-none hover:bg-green-400 rounded text-lg shadow-lg" style={{backgroundColor: status === STATUS.STOPPED ? 'grey' : 'rgb(34 197 94 / var(--tw-bg-opacity))'}}>
            stop
        </button>
        <button onClick={handleReset} type="button" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-400 rounded text-lg shadow-lg">
            reset
        </button>
      </div>
    </div>
  )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0')
