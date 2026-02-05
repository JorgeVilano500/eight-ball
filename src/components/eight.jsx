import React from 'react'
import {BallCanvas} from './canvas/Ball'
import {ball} from '../assets'


const Eight = () => {
    const texture = new THREE.TextureLoader().load(ball)


    return (
        <div>

            <BallCanvas icon={ball} />
        </div>
    )

}