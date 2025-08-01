import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Stock from './Stock';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiTwotoneFileAdd } from "react-icons/ai";
import FormUpdate from './Form_update';

const Beranda = ({ items,judul }) => {
  const [statusdelete,setstatusdelete] = useState(false);
  const [statusupdate,setstatusupdate] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  
  const [id,setid] = useState(0);
  const Showstock = (params)=>{
    setstatusdelete(!statusdelete)
    setid(params)
  }

  const Showsupdate = (params)=>{
    setstatusupdate(!statusupdate)
    setid(params)
  }

  const input = () => {
    setData(items);
  };

  useEffect(() => {
    input();
  }, [items]);

  function stock(){
    setstatusdelete(!statusdelete)
  }
  function update(){
    setstatusupdate(!statusupdate)
  }
  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete_data/${id}`);
      if (response.status === 200) {
        setData((prevData) => prevData.filter((_, i) => _.id_barang !== index));
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
       { statusdelete ? ( <Stock style={{ zIndex: '0' }} id={id} method={stock}/> ) : null}
       { statusupdate ? ( <FormUpdate style={{ zIndex: '0' }} id={id} method={update}/> ) : null}
      <h1>{judul}</h1>
      <div className='tombol'>
        <NavLink className='tambahkan btn btn-primary' to='/form'>TAMBAHKAN BARANG</NavLink>
      </div>
      
      <table className="table">
        <thead className="thead">
          <tr className='table-secondary'>
            <th scope="col" className='text-center'>NO</th>
            <th scope="col" className='text-center'>BARANG</th>
            <th scope="col" className='text-center'>HARGA</th>
            <th scope="col" className='text-center'>TYPE</th>
            <th scope="col" className='text-center'>STOCK</th>
            <th scope="col" className='text-center'>TOOLS</th>
          </tr>
        </thead>
        <tbody style={{ display: 'block', maxHeight: '300px', overflowY: 'auto', width: '100%' ,overflowX: 'auto'}}>
          {record.map((item, index) => (
            <tr key={index} style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
              <th scope="row" className='text-center'>{firstIndex + index + 1}</th>
              <td className='text-center'>{item.nama_barang}</td>
              <td className='text-center'>{item.harga_barang}</td>
              <td className='text-center'>{item.TIPE_barang}</td>
              <td className='text-center'>{item.STOCK_BARANG}</td>
              <td className='text-center'>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button className='btn btn-success' onClick={()=> Showstock(item.id_barang)}><AiTwotoneFileAdd /></button>
                <button className='btn btn-warning' onClick={()=> Showsupdate(item.id_barang)}><GrDocumentUpdate /></button>
                <button className='btn btn-danger' onClick={() => handleDelete(item.id_barang,item.id_barang)}><MdDelete /></button>
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
        <div  style={{ display: 'flex', width: '150px' ,overflowX: 'auto'}}>
          {numbers.map((item) => (
            <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={item}>
              <a href='#' className='page-link' onClick={() => changePage(item)}>{item}</a>
            </li>
          ))}
        </div >
          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>next</a>
          </li>
        </ul>
      </nav>
      </table>
    </div>
  );
}

Beranda.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    nama: PropTypes.string.isRequired,
    harga: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired
  })).isRequired,
};

export default Beranda;
