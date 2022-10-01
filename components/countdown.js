// thanks to https://stackoverflow.com/questions/40885923/countdown-timer-in-react
import React, {useState, useEffect, useRef} from 'react'

const STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
}

const INITIAL_COUNT = 1500

export default function CountdownApp() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)
  const [percentageElapsed, setpercentageElapsed] = useState(0)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  const handleStart = () => {
    setStatus(STATUS.STARTED)
    document.getElementById('bg-image').style.opacity = 0.5
  }

  const handleStop = () => {
    setStatus(STATUS.STOPPED)
    document.getElementById('bg-image').style.opacity = 1
  }

  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  )
  return (
    <div className="mb-8">
      <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight font-serif -z-1">
        Pomodoro Timer
      </h2>
      <div class="flex-initial basis-0 z-1 relative">
        <h2 class="text-7xl font-serif text-center">
            {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
            {twoDigits(secondsToDisplay)}
        </h2>
        <h2 class="text-xl text-right font-bold w-80 mx-auto pr-2 mb-2 font-serif">{status}</h2>
      </div>
      <div class="w-80 mx-auto text-center z-1 relative">
        <button onClick={handleStart} type="button" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 mr-4 focus:outline-none hover:bg-green-400 rounded text-lg">
            start
        </button>
        <button onClick={handleStop} type="button" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 mr-4 focus:outline-none hover:bg-green-400 rounded text-lg">
            stop
        </button>
        <button onClick={handleReset} type="button" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-400 rounded text-lg">
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