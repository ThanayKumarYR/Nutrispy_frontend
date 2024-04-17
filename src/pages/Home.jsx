import React from 'react'
import "./css/Home.css"
import Banner from '../images/banner.png'

const Home = () => {
  return (
    <main className='home'>
      <div className='banner'>
        <img src={Banner} alt='NutriSpy Banner'/>
      </div>
      <p>
        <b>NutriSpy</b> is a groundbreaking solution at the forefront of the health revolution. It's not just an app; it's your personal gateway to optimal well-being. Imagine having a virtual health assistant right in your pocket, ready to guide you towards your health goals with precision and ease. That's exactly what NutriSpy offers.
      </p>
      <p>
        At its core, <b>NutriSpy</b> is a game-changer in health management. With our Personalized Diet Recommendation System, we tailor meal plans to your specific needs and preferences, making healthy eating effortless and enjoyable. No more second-guessing or wondering if you're making the right choices - NutriSpy has you covered.
      </p>
      <p>
        But NutriSpy doesn't stop there. We're with you every step of the way, quite literally. Our Calorie Calculation feature ensures you're always aware of what you're consuming, while our Step Calculator motivates you to move more throughout the day. And when it's time to take your fitness to the next level, our Personalized Fitness Training delivers customized workouts designed to maximize your potential. With NutriSpy, achieving your health goals has never been more attainable. Experience the future of health management today, with NutriSpy.
      </p>
    </main >
  )
}

export default Home
