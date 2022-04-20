import React, { CSSProperties, useState } from 'react'

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
  }
}

const App = () => {
  const [score, setScore] = useState(0)
  const onClick = () => setScore(score + 1)

  return(
    <div style={styles.wrapper}>
      <div
        style={styles.button}
        onClick={onClick}
      >
        <div>🎉 TADA 🎉</div>
        <div style={styles.score}>(Score: {score})</div>
      </div>
    </div>
  )
}

export default App
