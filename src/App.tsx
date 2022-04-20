import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import type { CreateTypes } from 'canvas-confetti'

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '100vh',
    background: '#212529'
  },
  button: {
    padding: '1.5em 3em',
    background: '#FF7E36',
    fontSize: 'x-large',
    borderRadius: '1.5em'
  },
  score: {
    fontSize: 'small',
    textAlign:'center'
  },
  confetti: {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
}

type ConfettiInstance = CreateTypes | null

const App = () => {
  const [score, setScore] = useState(0)
  const [intervalId, setIntervalId] = useState<null | NodeJS.Timer>(null)

  // Prepare Confetti Instance
  const refAnimationInstance = useRef<ConfettiInstance>(null)
  const getInstance = useCallback((instance: ConfettiInstance) => {
    refAnimationInstance.current = instance
  }, [])

  // One Fire Shot
  const makeShot = useCallback((particleRatio: number, opts: Record<string, unknown>) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    })

    makeShot(0.2, {
      spread: 60
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    })

  }, [makeShot])

  // Fanfare
  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3))
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [])

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400))
    }
  }, [intervalId, nextTickAnimation])

  const pauseAnimation = useCallback(() => {
    if (intervalId){
      clearInterval(intervalId)
    }
    setIntervalId(null)
  }, [intervalId])

  const onClick = () => {
    setScore(score + 1)

    if ((score + 1) % 10 === 0) {
      startAnimation()
      setTimeout(pauseAnimation, 2000)
    } else {
      fire()
    }
  }

  useEffect(
    () => (() => { intervalId && clearInterval(intervalId) }),
    [intervalId]
  )

  return(
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={styles.confetti} />
      <div style={styles.wrapper}>
        <div
          style={styles.button}
          onClick={onClick}
        >
          <div>🎉 TADA 🎉</div>
          <div style={styles.score}>(Score: {score})</div>
        </div>
      </div>
    </>
  )
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  }
}

export default App
