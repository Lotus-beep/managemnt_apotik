import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import PropTypes from 'prop-types';

const Riwayat = ({ items, judul }) => {
  const [data, setData] = useState([]);
  const [date,setdate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const input = () => {
    setData(items);
  };

  useEffect(() => {
    input();
  }, [items]);

  const handlserchdate = async(e) =>{
    e.preventDefault();
    try {
      const Date = date.split('-');
      const coloumdate = (Date[2] + '/' + Date[1] + '/' + Date[0]);
      console.log(coloumdate);
      // setData((prevData)=> prevData.filter((items)=> items.waktu === coloumdate))

    } catch (error) {
      
    }
  }

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete_riwayat/${id}`);
      if (response.status === 200) {
        setData((prevData) => prevData.filter((_, i) => _.id_riwayat !== index));
      } else {
        console.error('Failed to delete item:', response.status);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      console.log(record)
    }
  };

  return (
    <div className='tabel'>
      <h1 className='judul'>{judul}</h1>
      <div className="container-fluid">
    <div className="d-flex justify-content-between align-items-center">
        <form className="d-flex" onSubmit={handlserchdate}>
            <input className="form-control me-2" type="date" placeholder="Search" aria-label="Search" 
            value={date} onChange={ (e)=> setdate(e.target.value) }/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <NavLink to="/form" className="btn btn-primary">TAMBAHKAN BARANG</NavLink>
    </div>
</div>

      
      <table className="table">
        <thead className="thead">
          <tr className='table-secondary'>
            <th scope="col" className='text-center'>NO</th>
            <th scope="col" className='text-center'>BARANG</th>
            <th scope="col" className='text-center'>Keterangan</th>
            <th scope="col" className='text-center'>STOCK</th>
            <th scope="col" className='text-center'>Tanggal</th>
            <th scope="col" className='text-center'>Waktu</th>
            <th scope="col" className='text-center'>TOOLS</th>
          </tr>
        </thead>
        <tbody style={{ display: 'block', maxHeight: '300px', overflowY: 'auto', width: '100%',overflowX: 'auto'}}>
          {record.map((item, index) => (
            <tr key={index} style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
              <th scope="row" className='text-center'>{firstIndex + index + 1}</th>
              <td className='text-center'>{item.barang.nama_barang}</td>
              <td className='text-center'>{item.keterangan}</td>
              <td className='text-center'>{item.jumlah}</td>
              <td className='text-center'>{item.tanggal}</td>
              <td className='text-center'>{item.waktu}</td>
              <td className='text-center'>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button className='btn btn-danger' onClick={() => handleDelete(item.id_riwayat, item.id_riwayat)}><MdDelete /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>prev</a>
          </li>
          {numbers.map((item) => (
            <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={item}>
              <a href='#' className='page-link' onClick={() => changePage(item)}>{item}</a>
            </li>
          ))}
          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>next</a>
          </li>
        </ul>
      </nav>
      </table>
    </div>
  );
}

Riwayat.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id_riwayat: PropTypes.number.isRequired,
    barang: PropTypes.shape({
      nama_barang: PropTypes.string.isRequired
    }).isRequired,
    keterangan: PropTypes.string,
    jumlah: PropTypes.number,
    tanggal: PropTypes.string,
    waktu: PropTypes.string,
  })).isRequired,
  judul: PropTypes.string.isRequired,
};

export default Riwayat;
