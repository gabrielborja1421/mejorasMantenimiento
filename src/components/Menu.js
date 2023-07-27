import React, { useState, useEffect } from 'react';
import Table from '../pages/Sniffer';
import { Link } from 'react-router-dom';
import Aceptar from '../pages/UserAdmin';
import NotFound from '../pages/NotFound';


const Menu = () => {
  const miValorBooleano = localStorage.getItem("miValorBooleano") === "true";
  console.log("local es. " + miValorBooleano)
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const showSettingsButton = miValorBooleano;

  useEffect(() => {
    const updateUserData = () => {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    };
    window.addEventListener('storage', updateUserData);


    return () => window.removeEventListener('storage', updateUserData);
  }, []);

  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(0); // cambiar a 0
  const [showTable, setShowTable] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };
  useEffect(() => {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach((item, index) => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
        handleMenuItemClick(index);
      });
    });
  }, []);
  const LongOut = () => {
    localStorage.removeItem('userData');

  }
  const [brandClass, setBrandClass] = useState('brand2 large');

  useEffect(() => {
    if (userData && userData.nombre_completo) {
      const nombre_completo = userData.nombre_completo.trim();
      if (nombre_completo.length > 20) {
        setBrandClass('brand2 small');
      } else {
        setBrandClass('brand2 large');
      }
    }
  }, [userData]);
  return (
    <div >
      {userData ? (
        <di>
          <section id="sidebar" className={sidebarHidden ? 'hide' : ''}>
            <a href="#" className="brand">
              <i className='bx bx-menu' onClick={handleSidebarToggle} ></i>
              {userData && (
                <span className={brandClass}>{userData.nombre_completo}</span>
              )}

            </a>
            <div className="user-info bg-light p-3">

            </div>


            <div className="side-menu top">
              <li>
                <a href="#" className={activeMenuItem === 0 ? 'active' : ''}>
                  <i className='bx bxs-dashboard' ></i>

                  <span className="text">Sniffer</span>
                </a>

              </li>
              {showSettingsButton && (
                <li>
                  <a href="#" className={activeMenuItem === 1 ? 'active' : ''}>
                    <i className='bx bxs-cog' ></i>
                    <span className="text">Settings</span>
                  </a>
                </li>
              )}

            </div>
            <div className="side-menu" >

              <li>
                <Link to="/" onClick={LongOut} className="logout" >
                  <i className='bx bxs-log-out-circle' ></i>
                  <span className="text">Logout</span>
                </Link>
              </li>
            </div>

          </section>



          <section id="content" >
            {activeMenuItem === 0 ? <Table /> : <Aceptar />}
          </section>
        </di>
      ) : (
        <NotFound />
      )}


    </div>

  )
}
export default Menu;
