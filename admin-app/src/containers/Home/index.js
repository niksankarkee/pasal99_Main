import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Layout from '../../components/Layout';

/**
 * @author  Niksan karkee
 * @function Header
 */
function Home() {
  return (
    <Layout>
      <Jumbotron
        style={{ margin: '5rem', background: '#fff' }}
        className='text-center'
      >
        <h1>Welcome to Admin Dashboard</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, unde! Voluptatem velit doloremque sapiente reiciendis sit totam praesentium culpa, quas cumque quam aliquam reprehenderit incidunt in quia vero? Perferendis, beatae.</p>
      </Jumbotron>
    </Layout>
  );
}

export default Home;
