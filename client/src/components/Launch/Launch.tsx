import React from 'react'

export const Launch = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1 className="text-6xl" style={style.rotate}>
        🌙
      </h1>

      <style>{`
      @keyframes Spinner {
        0 {
          transform: rotate(0);
        }
        25% {
          transform: rotate(80deg);
        }
        50% {
          transform: rotate(160deg);
        }
        75% {
          transform: rotate(240deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      `}</style>
    </div>
  )
}

const style = {
  rotate: {
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationName: 'Spinner'
  }
}
