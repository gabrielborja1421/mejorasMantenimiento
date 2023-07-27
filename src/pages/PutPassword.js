import avatar from '../styles/img/laptop.png'
import PictureLogin from '../styles/img/PictureLogin.png'
import wave from '../styles/img/wave.png'
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2'

const PutPassword = () => {
    const navigator = useNavigate()

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
    const handleSignUp = async (data) => {
        try {
          const response = await fetch(`http://localhost:5000/usuarios/${data.correo}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nueva_contraseña: data.nueva_contraseña }),
            
        }
        );
          if (response.ok) {
            setResponse('Contraseña actualizada correctamente');
          } else {
            setResponse('Error al actualizar contraseña');
          }
        } catch (error) {
          console.log(error);
          setResponse('Error asl actualizar contraseña');
        }
      };
      
      
    return (
        <div>
            <img className='wave' src={wave}></img>
            <div className='container'>
                <div className='img'>
                    <img src={PictureLogin}></img>
                </div>

                <div className='login-content'>
                    <form >
                        <img src={avatar}></img>
                        <h2 className="title">SignUp</h2>
                       
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
                                type="password"
                                className="form-input"
                                id="nueva_contraseña"
                                placeholder="Nueva Contraseña"
                                {...register("nueva_contraseña", {
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
                            {errors.nueva_contraseña && (
                                <span className="text-danger">{errors.nueva_contraseña.message}</span>
                            )}
                            <label htmlFor="contraseña" className="form-label">
                            Nueva Contraseña
                            </label>
                        </div>

                        <Link to="/">iniciar sesión</Link>
                        <Link to="/PutPasMaster">recover password Master</Link>


                        <button type="submit" className="form-submit" onClick={handleSubmit(handleSignUp)}>
                        recovery password
                        </button>
                        {response && (
                            <div className="response-message">{response}</div>
                        )}

                    </form>
                </div>

            </div>
        </div>

    )
}
export default PutPassword;