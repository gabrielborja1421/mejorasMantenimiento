import avatar from '../styles/img/laptop.png';
import PictureLogin from '../styles/img/PictureLogin.png';
import wave from '../styles/img/wave.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUpMaster = () => {
  const navigator = useNavigate();

  const PIN = "123";

  useEffect(() => {
    const showPinPrompt = () => {
      Swal.fire({
        title: 'Ingresa el Pin',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value === PIN) {
            console.log('Pin correcto');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Pin incorrecto, inténtalo de nuevo'
            }).then(() => {
              showPinPrompt();
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigator("/");

        }
      });
    }

    showPinPrompt();
  }, []);

  const [response, setResponse] = useState('');

  const { handleSubmit, register, formState: { errors } } = useForm();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
    } else if (window.location.pathname !== '/Home') {
      navigator("/Home");
    }
  }, []);

  // Estado para controlar si la contraseña se muestra o no
  const [showPassword, setShowPassword] = useState(false);

  // Función para cambiar el estado y mostrar u ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/userMaster', data);
      console.log(response.data);
      setResponse(response.data.mensaje);
    } catch (error) {
      console.error(error.response.data);
      setResponse(error.response.data.mensaje);
    }
  };

  return (
    <div>
      <img className='wave' src={wave} alt="Wave"></img>
      <div className='container'>
        <div className='img'>
          <img src={PictureLogin} alt="Login"></img>
        </div>

        <div className='login-content'>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <img src={avatar} alt="Avatar"></img>
            <h2 className="title">SignUp Master</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                id="nombre_completo"
                placeholder="nombre completo"
                {...register("nombre_completo", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "El nombre completo debe tener al menos 6 letras",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]+$/,
                    message: "El nombre completo no debe tener números",
                  },
                })}
              />
              {errors.nombre_completo && (
                <span className="text-danger">{errors.nombre_completo.message}</span>
              )}
              <label htmlFor="text" className="form-label">
                nombre completo
              </label>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                id="correo"
                placeholder="Correo"
                {...register("correo", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido",
                  },
                })}
              />
              {errors.correo && (
                <span className="text-danger">{errors.correo.message}</span>
              )}
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
            </div>
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado showPassword
                className="form-input"
                id="contraseña"
                placeholder="Contraseña"
                {...register("contraseña", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 4,
                    message: "La contraseña debe tener mínimo 4 caracteres",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{4,}/,
                    message:
                      "La contraseña debe tener mínimo una letra mayúscula y un símbolo @$!%*?&",
                  },
                })}
              />
              {errors.contraseña && (
                <span className="text-danger">{errors.contraseña.message}</span>
              )}
              <label htmlFor="contraseña" className="form-label">
                Contraseña
              </label>
              <span
                onClick={toggleShowPassword}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? '🙈' : '👁️'} {/* Icono para mostrar o ocultar la contraseña */}
              </span>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-input"
                id="telefono"
                placeholder="telefono"
                {...register("telefono", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "El número de teléfono debe tener 10 dígitos y no aceptar letras"
                  }
                })}
              />
              {errors.telefono && (
                <span className="text-danger">{errors.telefono.message}</span>
              )}
              <label htmlFor="telefono" className="form-label">
                telefono
              </label>
            </div>
            <Link to="/">iniciar sesión</Link>

            <button type="submit" className="form-submit" onClick={handleSubmit(handleSignUp)}>
              SignUp
            </button>
            {response && (
              <div className="response-message">{response}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpMaster;
