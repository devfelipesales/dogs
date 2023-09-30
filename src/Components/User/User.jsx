import React from 'react';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import { Route, Routes } from 'react-router-dom';
import Feed from '../Feed/Feed';
import UserStats from './UserStats';
import { UserContext } from '../../UserContext';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

const User = () => {
  const { data } = React.useContext(UserContext);
  return (
    <section className='container'>
      <Head title='Minha Conta' description='Minha conta do site Dogs.' />
      <UserHeader />
      <Routes>
        <Route path='/' element={<Feed user={data.id} />} />
        <Route path='postar' element={<UserPhotoPost />} />
        <Route path='estatisticas' element={<UserStats />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
