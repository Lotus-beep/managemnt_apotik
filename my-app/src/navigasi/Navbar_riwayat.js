import React, { useState,useEffect } from 'react';
import Riwayat from '../BERANDA/Riwayat';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { CiInboxIn,CiInboxOut } from "react-icons/ci";
import axios from 'axios';
import { RiFolderHistoryFill } from "react-icons/ri";
import { CiTempHigh } from "react-icons/ci";
function Navbar_home() {
  const [list, setList] = useState(false);
  const [data,setdata] = useState([]);
  const [serch,setserch] = useState('');
  const [alat, setalat] = useState(false);

  const toggleList = () => {
    setList(!list);
  };
  const togglealat = () => {
    setalat(!alat);
  };

  useEffect(()=>{
    barang();
  },[])
  const barang = async()=>{
    const respon = await axios.get('http://localhost:8000/data_riwayat');
    const hasil = respon.data;
    const reverse = hasil.reverse();
    setdata(respon.data);
  }

  const percarian = async(e)=>{
    e.preventDefault();
    console.log(serch);
    const respon = await axios.post('http://localhost:8000/caririwayat',{
    barang : serch
    })
    setdata(respon.data)
  }

  return (

  <div className="d-flex flex-row">
    {/* Sidebar */}
    <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark sidebar-height" style={{ width: '250px', overflow: 'auto'}}>
    <form onSubmit={percarian}>
    <div class="input-group mb-3">
    <button class="input-group-text"><IoSearchOutline/></button>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value={serch} onChange={(e)=>setserch(e.target.value)}/>
    </div>
    </form>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
          <a href="http://localhost:3000/data_alat" className="nav-link text-white" aria-current="page">
            <i className="fa fa-home"><CiTempHigh /></i><span className="ms-2">Alat kesehatan</span>
          </a>
      </li>
      <li className='nav-item dropdown'>
          <a href="#" className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" onClick={togglealat}>
            <i className="fa fa-dashboard"><BiSolidCategory /></i><span className="ms-2">Categori Alat </span>
          </a>
          {alat ? (
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a href="http://localhost:3000/Alat_pcs" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Pcs</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/Alat_ball" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Ball</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/Alat_box" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Box</span>
                </a>
              </li>
            </ul>
          ) : null}
      </li>
        <li className="nav-item">
          <a href="http://localhost:3000/" className="nav-link text-white" aria-current="page">
            <i className="fa fa-home"><IoIosHome /></i><span className="ms-2">Obat - obatan</span>
          </a>
        </li>
        <li className='nav-item dropdown'>
          <a href="#" className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" onClick={toggleList}>
            <i className="fa fa-dashboard"><BiSolidCategory /></i><span className="ms-2">Categori</span>
          </a>
          {list ? (
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a href="http://localhost:3000/type_botol" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Botol</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_pcs" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Pcs</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_tube" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Tube</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_box" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Box</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_pack" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Pack</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_supp" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Supp</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_pot" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Pot</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_strip" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Strip</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="http://localhost:3000/type_ampul" className="nav-link text-white" aria-current="page">
                  <i className="fa fa-home"></i><span className="ms-2">Ampul</span>
                </a>
              </li>
            </ul>
          ) : null}
        </li>
        <li className="nav-item" style={{ zIndex: '0' }}>
          <a href="/Riwayat" className="nav-link text-white active">
            <i className="fa fa-first-order"><RiFolderHistoryFill /></i><span className="ms-2">Riwayat</span>
          </a>
        </li>
        <li className="nav-item" style={{ zIndex: '0' }}>
          <a href="/Barang_masuk" className="nav-link text-white">
            <i className="fa fa-first-order"><CiInboxIn /></i><span className="ms-2">Barang masuk</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/Barang_keluar" className="nav-link text-white">
            <i className="fa fa-cog"><CiInboxOut /></i><span className="ms-2">Barang keluar</span>
          </a>
        </li>
      </ul>
    </div>

    {/* Categori */}
    <div className="flex-grow-1">
      <Riwayat items={data} judul={"Riwayat"} style={{width:"100%"}}/>
    </div>
  </div>


  );
}

export default Navbar_home;
