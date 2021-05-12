
//rotate the velocity if not 1D collision
const rotate = (velocity, angle) => {

    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

//collision after effect
const resolveCollision = (particle, otherParticle) => {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles if they are not moving in same direction
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        //angle of collision
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        //mass of the particle
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Rotate the initial velocity just before collision
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Final Velocity after 1d collision 
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating to the original position
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // returning the velocities to the individual particle
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}