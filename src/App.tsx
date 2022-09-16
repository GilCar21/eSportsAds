import './styles/main.css'
import logo from './assets/logoimage.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import axios from 'axios'

import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdModal } from './components/CreateAdModal'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads:number;
  }
}

function App() {
 
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3001/games')
      .then(res => setGames(res.data))
  },[])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span>  está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16 '>
        {games.map(game => {
          return(
            <GameBanner 
              adsCount={game._count.ads} 
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              key={game.id}
            /> 
          )
        })}
       
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
