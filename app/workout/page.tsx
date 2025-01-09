import React from 'react'
import Header from './header'
import styles from './page.module.css'
import BmiCalculator from './bmicalculator'

const page = () => {
  return (
    <div className={styles.body}>
      <Header />
      <BmiCalculator />
    </div>
  )
}

export default page