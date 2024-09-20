import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRoute from './Routes/UserRoute'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/*' element={<UserRoute/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
