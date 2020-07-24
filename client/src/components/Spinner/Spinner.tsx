import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import {CProps} from '../../types'

interface SpinnerProps {}

export const Spinner = ({className = ''}: CProps<SpinnerProps>) => {
  const cls = ['inline-flex', className].join(' ')

  return (
    <>
      <span className={cls} style={style.rotate}>
        <FaSpinner className="w-full h-full" />
      </span>

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
    </>
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
