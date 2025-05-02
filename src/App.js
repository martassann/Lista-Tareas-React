import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cargadoDesdeStorage, setCargadoDesdeStorage] = useState(false);

  useEffect(() => {
    if (!cargadoDesdeStorage) {
      const tareasGuardadas = localStorage.getItem('tareas');
      if (tareasGuardadas) {
        setTareas(JSON.parse(tareasGuardadas));
      }
      setCargadoDesdeStorage(true); // Evita que vuelva a cargar
    }
  }, [cargadoDesdeStorage]);

  useEffect(() => {
    if (cargadoDesdeStorage) {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }
  }, [tareas, cargadoDesdeStorage]);

  const agregarTarea = () => {
    if (!nuevaTarea.trim() || !fechaInicio || !fechaVencimiento) return;

    const nueva = {
      id: Date.now(),
      texto: nuevaTarea,
      fechaInicio,
      fechaVencimiento,
    };

    setTareas((prev) => [...prev, nueva]);
    setNuevaTarea('');
    setFechaInicio('');
    setFechaVencimiento('');
  };

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
  };

  const esVencida = (fecha) => {
    return new Date(fecha) < new Date();
  };

  return (
    <div className="contenedor">
      <div className="tarjeta">
        <h1>Lista de Tareas</h1>
        <div className="formulario">
          <input
            type="text"
            placeholder="Escribe una tarea"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
          />
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
          />
          <button onClick={agregarTarea}>Agregar</button>
        </div>

        {tareas.map((tarea) => (
          <div
            key={tarea.id}
            className={`tarea ${esVencida(tarea.fechaVencimiento) ? 'vencida' : ''}`}
          >
            <div className="tarea-info">
              <strong>{tarea.texto}</strong>
              <small>📅 Inicio: {tarea.fechaInicio}</small>
              <small>⏰ Vence: {tarea.fechaVencimiento}</small>
            </div>
            <button onClick={() => eliminarTarea(tarea.id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
