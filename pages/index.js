import Head from 'next/head';
import HabitList from '../components/HabitList';
import AddHabitForm from '@/components/AddHabitForm';
import { useState , useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';
import App from './_app';


export default function Home() {

  return (
    <a href = '/dashboard'>Go to dashboard</a>
  );

  
}
