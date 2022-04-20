import React, { CSSProperties, useCallback, useRef, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'

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
    fontSize: 'x-large'
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

type Instance = any

const App = () => {
  const [score, setScore] = useState(0)

  const refAnimationInstance = useRef<null | Instance>(null)
  const getInstance = useCallback((instance: Instance) => {
    refAnimationInstance.current = instance
  }, [])

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

    setScore(score + 1)
  }, [makeShot])
  const onClick = () => {
    setScore(score + 1)
    fire()
  }

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

export default App
