import './App.module.css'
import {Header} from './components/Header.tsx'
import {TaskCreator} from './components/TaskCreator.tsx'
import './global.css'
import style from './App.module.css'

export function App() {
  return (
    <div>
      <Header/>
      <main className={style.container}>
        <TaskCreator />
      </main>
    </div>
  )
}
