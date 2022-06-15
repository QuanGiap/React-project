import React from 'react'
import Profile from './pages/profile/Profile'
import Skill from './pages/skill/Skill'
import Experiences from './pages/experiences/Experiences'
import Education from './pages/educations/Education'
import Portfolios from './pages/portfolios/Portfolios'
function Home() {
  return (
    <div className='container'>
					<div className='row'>
						<div className='col s12 m3'>
							<Profile />
						</div>
						<div className='col s12 m9'>
							{/* <About /> */}
							<Skill />
							<Experiences />
							<Education />
							<Portfolios />
						</div>
					</div>
				</div>
  )
}

export default Home