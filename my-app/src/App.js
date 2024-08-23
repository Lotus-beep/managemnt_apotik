import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar_home from './navigasi/Navbar_home.js';
import Category_botol from './navigasi/category_botol.js';
import Category_pcs from './navigasi/category_pcs.js';
import Category_Tube from './navigasi/category_Tube.js';
import Category_box from './navigasi/category_box.js';
import Navbar_form from './navigasi/Navbar_form.js';
import Navbar_riwayat from './navigasi/Navbar_riwayat.js';
import Navbar_barangmsk from './navigasi/Navbar_barangmsk.js';
import Navbar_barangkeluar from './navigasi/Navbar_barangkeluar.js';
import Navbar_alat from './navigasi/Navbar_alat.js';
import Category_Pack from './navigasi/category_pack.js';
import Category_pot from './navigasi/category_pot.js';
import Category_supp from './navigasi/category_supp.js';
import Category_strip from './navigasi/category_strip.js';
import Category_ampul from './navigasi/category_ampul.js';
import Alatpcs from './navigasi/Alatpcs.js';
import Alatball from './navigasi/Alatball.js';
import Alatbox from './navigasi/Alatbox.js';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={
             <Navbar_home/>
         }/>
         <Route path='/type_botol' element={
             <Category_botol/>
         }/>
         <Route path='/type_pcs' element={
             <Category_pcs/>
         }/>
         <Route path='/type_tube' element={
             <Category_Tube/>
         }/>
         <Route path='/type_box' element={
             <Category_box/>
         }/>
         <Route path='/form' element={
             <Navbar_form/>
         }/>
         <Route path='/Riwayat' element={
             <Navbar_riwayat/>
         }/>
         <Route path='/Barang_masuk' element={
             <Navbar_barangmsk/>
         }/>
        <Route path='/Barang_keluar' element={
             <Navbar_barangkeluar/>
         }/>
        <Route path='/data_alat' element={
             <Navbar_alat/>
         }/>
         <Route path='/type_pack' element={
             <Category_Pack/>
         }/>
         <Route path='/type_pot' element={
             <Category_pot/>
         }/>
         <Route path='/type_supp' element={
             <Category_supp/>
         }/>
         <Route path='/type_strip' element={
             <Category_strip/>
         }/>
          <Route path='/type_ampul' element={
             <Category_ampul/>
         }/>
         <Route path='/Alat_ball' element={
             <Alatball/>
         }/>
         <Route path='/Alat_pcs' element={
             <Alatpcs/>
         }/>
         <Route path='/Alat_box' element={
             <Alatbox/>
         }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
